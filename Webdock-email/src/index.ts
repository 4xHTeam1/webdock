import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";
import axios from "axios";
import fs from "fs";
import path from "path";
import ejs from "ejs";
import { BodyValidation } from "../shared/services/BodyValidation";
import {
  getDaysComments,
  getDaysFeatureRequests,
  getEmailByUserId,
} from "./querys/querys";
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

const app = new Elysia()
  .use(
    cron({
      name: "SendEmail",
      pattern: "0 0 * * *", //Hver dag kl 00:00
      async run() {
        await sendDailySummaryEmail();
      },
    })
  )
  .use(cors())
  .onError(({ error }) => {
    return new Response(error.toString(), {
      status: 401,
    });
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
  .post("/debug/sendDailySummaryEmail", async () => {
    const t = await sendDailySummaryEmail();
    return t;
  })
  .get("/debug/getDaysFeatureRequests", async () => {
    const t = await getDaysFeatureRequests();
    return t;
  })
  .get("/debug/getDaysComments", async () => {
    const t = await getDaysComments();
    return t;
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

const sendDailySummaryEmail = async () => {
  let templatePath = path.join(import.meta.dir, "/Email/dailySummary.ejs");
  let daysFeatureRequests = await getDaysFeatureRequests();
  let daysComments = await getDaysComments();

  // Read the template file
  let template = fs.readFileSync(templatePath, "utf-8");
  const htmlBody = ejs.render(template, {
    subject: "Daily Summary",
    features: daysFeatureRequests,
    comments: daysComments,
  });
  await instance.post("email", {
    From: "uclfeedback@webdock.io",
    To: "mikehovedskov@gmail.com, admin@webdock.io",
    Subject: "Daily Summary",
    HtmlBody: htmlBody,
    TrackOpens: true,
    TrackLinks: "None",
    MessageStream: "outbound",
  });

  return { message: `Email sent at: ${new Date().toUTCString()}` };
};
