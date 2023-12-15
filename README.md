<img src="https://i.imgur.com/xctSMz9_d.webp?maxwidth=1584&fidelity=grand"></img>

<h1 align="center"> Webdock - Features </h1>
<p align="justify">
Dette projekt er skrevet i forbindelse med UCL's P.Ba i Webudvikling 1. semesters project. I sammarbejde med Webdock.io ApS. Projekted lød på at erstatte deres nuværende Feature Request system, leveret af Canny, i en standalone løsning, da Canny er for dyrt og komplekst til deres behov.
</p>

<h2 align="center">Teknologier brugt til projektet</h2>
<p align="center">
<a href="https://vuejs.org" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Vue-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white"/>
</a>
<a href="https://vitejs.dev" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"/>
</a>
<a href="https://getbootstrap.com" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white"/>
</a>
<a href="https://axios-http.com/docs/intro" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>
</a>
<a href="https://bun.sh" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Bun-000000?style=for-the-badge&logo=Bun&logoColor=white"/>
</a>
<a href="https://www.elysiajs.com" style="text-decoration: none"> 
<img src="https://custom-icon-badges.demolab.com/badge/-Elysia-1f2937?style=for-the-badge&logo=elysia" />
</a>
<a href="https://www.prisma.io" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Prisma-2D3748?style=for-the-badge&logo=Prisma"/>
</a>
<a href="https://www.docker.com" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"/>
</a>
<a href="https://www.typescriptlang.org" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>
</a>
<a href="https://www.microsoft.com/en-us/sql-server/sql-server-downloads" style="text-decoration: none"> 
    <img src="https://custom-icon-badges.demolab.com/badge/-mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</a>
</p>
<h2 align="center">
    Installation og brug
</h2>
<h3>
    Forudsætninger
</h3>
<p>
Følgende forudsætninger er sat for at kunne starte vores projekt:

Som standalone app:
* <a href="https://docs.docker.com/engine/install/binaries/">Docker Engine </a> og <a href="https://docs.docker.com/compose/install/standalone/"> Docker Compose </a> som standalone binaries
* Eller <a href="https://docs.docker.com/desktop/">Docker Desktop</a> som inkludere både Docker Engine og Docker Compose

Som kode projekt:
* <a href="https://learn.microsoft.com/en-us/windows/wsl/install"> Windows Subsystem for Linux (WSL)</a> Dette er et krav, da vi bruger en relativt ny all-in-one Javascript Runtime, kaldet <a href="https://www.bun.sh"> Bun </a> som kun kører på linux på nuværende tidspunkt.
* <a href="https://docs.docker.com/engine/install/binaries/">Docker Engine </a> og <a href="https://docs.docker.com/compose/install/standalone/"> Docker Compose </a> som standalone binaries
* Eller <a href="https://docs.docker.com/desktop/">Docker Desktop</a> som inkludere både Docker Engine og Docker Compose
</p>

<p align="justify">
    For at gøre installationen af appen så simpel som muligt, gør vi brug af docker og docker compose. Vi har kompileret alle vores services som images som ligger på docker hub, og kan derfor hentes ned når vi spinner alle vores services op on the fly. For at starte vores services, køres:
</p>

```sh
docker compose -f ./webdock-docker/docker-compose.yml -p webdock up
```

<p align="justify">
    Hvis man ikke ønsker at kører vores app som et standalone program, kan man køre de individuelle services for sig selv. Alle services er sat op per default at bruge port 3000, så det er ikke muligt at kører flere services på en gang uden at ændre dette i koden.
    <br><br>
    <br>
    For at kører de individuelle services har vi scripts til hver enkel:
    <br><br>
    <b>
        (Dog har vi en forudsætning om at en mysql database stadig kører på port 3306, og at man kører vores prisma script for at lave databasen, samt migrate alle tabeller og seede den med dummy data.)
    </b>
        bun run prisma:dev
        //Hvis ikke det virker med bun (der er stadig nogle fejl i forhold til at køre 3. parts scripts gennem bun)
        npm run prisma:dev
</p>

Admin service:
```sh
bun run admin:dev
```
Auth service:
```sh
bun run auth:dev
```
Features service:
```sh
bun run features:dev
```
Email service:
```sh
bun run email:dev
```
Search service:
```sh
bun run search:dev
```
Sockets service:
```sh
bun run sockets:dev
```
Frontend service:
```sh
bun run frontend:dev
```

<h2 align="center">
    ENV variabler
</h2>
<p align="justify">
I projektet gør vi brug af nogle ENV variabler. Disse er nødvendige at være tilstede da vores services bruger dem. For at bruge dem, laves en .env fil i webdock rod mappen med følgende indhold:
</p>

```sh
DATABASE_URL="mysql://root:password@localhost:3306/features?connect_timeout=600"
SECRET=e389bb7b-dc58-4b0b-8f54-dac159d5a609
POSTMARK_TOKEN=c3d41965-18a4-479f-a591-4369b7f5952c
```


