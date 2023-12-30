//bruges til at hente en kategori baseret på dens 'id'.
export interface IGetStatus {
  id: number;
}

//hvordan en ny kategori oprettes ved at specificere 'name'.
export interface ICreateStatus {
  name: string;
}

//definerer attributterne, der kan opdateres for en kategori ved at angive 'id' og 'name'
export interface IUpdateStatus {
  id: number;
  name: string;
}

//beskriver, hvordan en kategori slettes ved at angive dens 'id'.
export interface IDeleteStatus {
  id: number;
}
