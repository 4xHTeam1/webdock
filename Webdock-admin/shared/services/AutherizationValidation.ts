// her importerers 'PrismaClient' og 'Role' fra Prisma's klientbibliotek til databasestyring.
import { PrismaClient, Role } from "@prisma/client";
import { IAdmin } from "./interfaces/IAdministrator";

//vi fortager en databaseforespørgsle, som skal udføre handlinger og administrere data i applikationen.
const prisma = new PrismaClient();

//IsAdministrator kontrollerer, om anmoderen har administratorrettigheder.
export const IsAdministrator = async ({ requesterId }: IAdmin) => {
  console.log(typeof requesterId);
  //Hvis 'requesterId' er udefineret eller 'null', kastes en 'Unauthorized'-fejl for at angive, at handlingen kræver administratorrettigheder.
  if (requesterId === undefined || requesterId === null) {
    throw new Error("Unauthorized");
  }
  //koden finder og kontrollerer en brugers rolle i systemet
  const user = await prisma.user.findUnique({
    where: {
      //henter brugeroplysninger fra databasen baseret på 'requesterId' og kontrollerer derefter, om brugerens rolle er administrator Role.ADMIN
      id: Number(requesterId),
    },
    select: {
      role: true,
    },
  });
  //Hvis brugerens rolle ikke er administrator, kastes en 'Unauthorized'-fejl, "du skal være admin"
  if (user?.role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
  //
};
