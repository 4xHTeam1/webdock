//Denne funktionen 'SearchValidation' validerer en søgeforespørgsel ved at undersøge on den er defineret 
export const SearchValidation = (search: string | null | undefined) => {
  if (search === undefined || //ikke defineret 
    search === null || //ikke null
    search === "") // ikke en top streng 
    {
      //Hvis forspørgslen er udefineret kastets en fejl med en besked "Invalid search query"
    throw new Error("Invalid search query");
  }
  //Men hvis alt køre retuneres en true
  return true;
};
