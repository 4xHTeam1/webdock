//denne function validere om de angivne parametre er anvendt korret 
export const SearchValidation = (search: string | null | undefined) => {
  if (search === undefined || search === null || search === "") {
    //hvis validereingen ikke er korret sendes en error besked invalid search guery
    throw new Error("Invalid search query");
  }
  //retuneres en true hvis den køre
  return true;
};
