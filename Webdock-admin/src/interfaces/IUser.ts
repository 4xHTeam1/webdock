import { Role } from "@prisma/client";
export interface IGetUser {
  id: string;
}

export interface IUpdateUserRole {
  id: string;
  role: Role;
}
