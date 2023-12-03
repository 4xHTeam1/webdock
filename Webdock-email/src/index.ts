import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";
import axios from "axios";
import fs from "fs";
import path from "path";
import ejs from "ejs";
import { BodyValidation } from "../shared/services/BodyValidation";
import { getEmailByUserId } from "./querys/querys";
import cors from "@elysiajs/cors";

const instance = axios.create({
  baseURL: "https://api.postmarkapp.com/",
  timeout: 1000,
  decompress: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Postmark-Server-Token": `${process.env.POSTMARK_TOKEN}`,
  },
});

let daysFeatureRequests = [] as string[];

const getFeatureRequests = () => {
  let template = path.join(import.meta.dir, "/Email/emailtemplate.html");

  return fs.readFileSync(template, "utf8");
};

const app = new Elysia()
  .use(
    cron({
      name: "SendEmail",
      pattern: "0 0 * * *", //Hver dag kl 00:00
      run() {
        console.log("Send Email");
        instance.post("email", {
          From: "uclfeedback@webdock.io",
          To: "mikehovedskov@gmail.com", //Ændre til deres mail
          Subject: "Test",
          HtmlBody: '<b>Hello</b> <img src="cid:image.jpg"/>',
          TextBody: "Hello",
          TrackOpens: true,
          TrackLinks: "None",
          MessageStream: "outbound",
        });
      },
    })
  )
  .use(cors())
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 401,
    });
  })
  .get("/debug/sendMail", async () => {
    const results = await instance.post("email", {
      From: "uclfeedback@webdock.io",
      To: "mikehovedskov@gmail.com", //Ændre til deres mail
      Subject: "Test",
      HtmlBody: getFeatureRequests(),
      TextBody: "Hello",
      TrackOpens: true,
      TrackLinks: "None",
      MessageStream: "outbound",
    });

    console.log("Send Email");
    console.log(results.data);

    return results.data;
  })
  .post("/sendUpvoteEmail", async ({ body }) => {
    BodyValidation(body, ["ownerId", "subject", "user", "feature", "link"]);

    const { ownerId, subject, user, feature, link } = body as {
      ownerId: number;
      subject: string;
      user: object;
      feature: object;
      link: string; //TODO: Change to real url when made
    };

    const email = await getEmailByUserId(Number(ownerId));

    let templatePath = path.join(
      import.meta.dir,
      "/Email/upvoteNotification.ejs"
    );

    // Read the template file
    let template = fs.readFileSync(templatePath, "utf-8");
    const htmlBody = ejs.render(template, { subject, user, feature, link });

    const results = await instance.post("email", {
      From: "uclfeedback@webdock.io",
      To: email,
      Subject: subject,
      HtmlBody: htmlBody,
      TrackOpens: true,
      TrackLinks: "None",
      MessageStream: "outbound",
    });

    console.log("Send Email");
    console.log(results.data);

    return { message: "Email sent" };
  })
  .get("/status", () => {
    return {
      status: "ok",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
