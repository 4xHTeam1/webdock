//Denne funktion 'TokenValidation' udfører validering af en token ved at bruge en JWT-klient
export const TokenValidation = async (
  jwtClient: any,
  token: string | undefined
) => {
  if (
    token === undefined ||
    token === null ||
    token === "" ||
    //Her venter den til den har tjekket om den opfylder kravende om den er undefined, null eller en tom streng 
    (await jwtClient.verify(token)) === false
  ) {
    //Hvis token ikke opfylder disse krav, kastes en fejl med besked 'Invalid token'.
    throw new Error("Invalid token");
  }
  //Hvis alt er som det skal være returneres resultatet af valideringen fra JWT-klienten.
  return await jwtClient.verify(token);
};
