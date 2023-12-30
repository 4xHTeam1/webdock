//funktionen TokenValidation foretager validering af et JWT-token
export const TokenValidation = async (
  jwtClient: any,
  token: string | undefined
) => {
  if (
    token === undefined || //ikke udefineret 
    token === null || //ikke er null
    token === "" || //ikke en tom streng 
    //eller ikke kan verificeres af jwtClient
    (await jwtClient.verify(token)) === false
  ) {
    //hvis token ikke er gyldig kastets en error besked "invalid token"
    throw new Error("Invalid token");
  }
  //Ved gyldigt token, returneres resultatet af verificeringen fra jwtClient
  return await jwtClient.verify(token);
};
