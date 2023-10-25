export const BodyValidation = (body: any, prop: string | string[]) => {
  if (
    body === undefined ||
    body === null ||
    body === "" ||
    typeof body !== "object"
  ) {
    throw new Error("Invalid body");
  }

  if (typeof prop === "string") {
    if (!body.hasOwnProperty(prop)) {
      throw new Error(`Invalid body, missing property ${prop}`);
    }
  } else {
    for (const p of prop) {
      if (!body.hasOwnProperty(p)) {
        throw new Error(`Invalid body, missing property ${p}`);
      }
    }
  }

  return true;
};
