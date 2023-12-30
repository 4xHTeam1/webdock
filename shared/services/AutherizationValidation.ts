//Importen af disse komponenter giver koden adgang til Prisma's databasefunktionalitet og 
//tillader brugen af specifikke grænseflader, der er relateret til administratorfunktioner.
import { PrismaClient, Role } from "@prisma/client";
import { IAdmin } from "./interfaces/IAdministrator";

// Opretter forbindelse til og interagere med din database gennem Prisma's metoder og funktionalitet.
const prisma = new PrismaClient();

//tjekker om en bruger er en administrator ved at validere brugerens ID. Hvis ID'et er udefineret eller 'null', kastes en fejl med beskeden 'Unauthorized'.
export const IsAdministrator = async ({ requesterId }: IAdmin) => {
  if (requesterId === undefined || requesterId === null) {
    throw new Error("Unauthorized");
  }

  //Her bruges Prisma til at finde en unik bruger i databasen baseret på deres ID. Herefter kontrolleres det, om brugerens rolle er administrator.
  const user = await prisma.user.findUnique({
    where: {
      id: Number(requesterId),
    },
    select: {
      role: true,
    },
  });
  //Når kode har kontroleret at brugere er admin eller ikke, og hvis brugeren ikke er admin, får man en fejl der hedder Unauthorized
  if (user?.role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
};
