import { Role } from "@prisma/client";
export interface IGetUser {
  id: number;
}

export interface IUpdateUserRole {
  id: number;
  role: Role;
}
