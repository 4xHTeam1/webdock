export const SearchValidation = (search: string | null | undefined) => {
  if (search === undefined || search === null || search === "") {
    return false;
  }
  return true;
};
