export const TokenValidation = async (
  jwtClient: any,
  token: string | undefined
) => {
  if (
    token === undefined ||
    token === null ||
    token === "" ||
    (await jwtClient.verify(token)) === false
  ) {
    throw new Error("Invalid token");
  }
  return await jwtClient.verify(token);
};
