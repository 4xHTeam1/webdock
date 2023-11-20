export const upvoteValidator = async (info: any) => {
  if (
    info.featureId === undefined ||
    info.userId === undefined ||
    info.featureId === null ||
    info.userId === null
  ) {
    throw new Error("Invalid featureId or userId");
  }

  return;
};
