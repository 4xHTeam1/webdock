export const ParamValidation = (param: any) => {
  if (
    param === undefined ||
    param === null ||
    param === "" ||
    Number.isNaN(param) ||
    param === 0 ||
    param === false
  ) {
    throw new Error("Invalid param");
  }
};
