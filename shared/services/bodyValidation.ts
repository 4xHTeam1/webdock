// Her anvendes funktionen 'BodyValidation' til at validere kropsdataen, der modtages.
export const BodyValidation = (body: any, prop: string | string[]) => {
  console.log(body);
  if (
    //Den tjekker om dataen er defineret, ikke 'null', ikke tom og af typen 'object'.
    body === undefined ||
    body === null ||
    body === "" ||
    typeof body !== "object"
  ) {
    // Hvis dataen ikke opfylder disse krav, kastes en fejl med en besked om den ugyldige data.
    throw new Error("Invalid body, body is of type: " + typeof body);
  }
//validerer tilstedeværelsen af de specificerede egenskaber i den modtagne data.
  if (typeof prop === "string") {
    if (!body.hasOwnProperty(prop)) {
      throw new Error(`Invalid body, missing property ${prop}`);
    }
    //hvis anmodningen ikke har de relevante data, kastes en fejl med besked om den manglende data
  } else {
    for (const p of prop) {
      if (!body.hasOwnProperty(p)) {
        throw new Error(`Invalid body, missing property ${p}`);
      }
    }
  }
//Hvis alle data eksisterer, returneres 'true'.
  return true;
};
