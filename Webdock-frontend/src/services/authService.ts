import { http } from "../http-common";

export const Authenticate = async (token: string) => {
  let user = await http
    .post("/auth/verify", {
      token: token,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return user;
};
