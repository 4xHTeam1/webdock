//funktionen udfører validering af et objekt i request-body'en, den validere om den er 
export const BodyValidation = (body: any, prop: string | string[]) => {
  console.log(body);
  if (
    body === undefined || //ikke defineret
    body === null || //ikke null
    body === "" || //ikke en tom streng 
    typeof body !== "object" //ikke er en objekt 
  ) {
    //hvis valideringen ikke er opflydt kastes en error besked "ikke gyldig"
    throw new Error("Invalid body, body is of type: " + typeof body);
  }
//validere om anmodningen indeholde de angivne data, den kontrolere om prop er en streng 
  if (typeof prop === "string") {
    if (!body.hasOwnProperty(prop)) {
      //hvis ikke kastets en error besked mangler angiven data 
      throw new Error(`Invalid body, missing property ${prop}`);
    }
  } else {
    ////hvis ikke kastets en error besked mangler angiven data 
    for (const p of prop) {
      if (!body.hasOwnProperty(p)) {
        throw new Error(`Invalid body, missing property ${p}`);
      }
    }
  }
//men hvis den køre retuneres en true
  return true;
};
