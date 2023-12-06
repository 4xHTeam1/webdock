import { http } from "../http-common";

export const sendUpvoteEmail = async ({
  ownerId,
  subject,
  user,
  feature,
  link,
}: any) => {
  try {
    await http.post("/email/sendUpvoteEmail", {
      ownerId,
      subject,
      user,
      feature,
      link,
    });
  } catch (error) {
    console.error(error);
  }
};
