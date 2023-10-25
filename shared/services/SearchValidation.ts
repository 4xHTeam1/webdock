export const SearchValidation = (search: string | null | undefined) => {
  if (search === undefined || search === null || search === "") {
    throw new Error("Invalid search query");
  }
  return true;
};
