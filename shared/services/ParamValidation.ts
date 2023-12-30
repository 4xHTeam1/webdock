//Denne funktion validere en parameter ved at undersøge om den er defineret.
export const ParamValidation = (param: any) => {
  if (
    param === undefined || //ikke defineret
    param === null || //ikke null
    param === "" || // ikke en tom streng 
    Number.isNaN(param) || // ikke NaN
    param === 0 || // ikke 0
    param === false //ikke falsk
  ) {
    //Hvis parameteren har en af disse værdier, kastes en fejl med en besked om den ugyldige parameter.
    throw new Error("Invalid param");
  }
};
