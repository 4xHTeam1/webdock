//henter 'Role'-typen fra Prisma-clienten
import { Role } from "@prisma/client";

//specificerer en forespørgsel om at hente en bruger baseret på brugerens 'id'.
export interface IGetUser {
  id: number;
}

//Definere de attributter som kan opdateres på en given bruger
export interface IUpdateUserRole {
  id: number;
  role: Role;
}
