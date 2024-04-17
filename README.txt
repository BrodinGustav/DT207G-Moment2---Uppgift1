***Arbetslivserfarenheter API***
Detta API hanterar arbetslivserfarenheter och tillåter användare att utföra CRUD-operationer (Create, Read, Update, Delete).

***Installation, databas***
APIet använder en MySQL-databas. 
Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. 
Kör installations-skriptet install.js. Installations-skriptet skapar databastabeller enligt nedanstående:

Tabell-namn	Fält
Tabell1	id (varchar(255), fält1 (varchar(255), fält2 (varchar(255)


***URI's för att använda CRUD:***

***Hämta alla arbetslivserfarenheter***
GET /cv
Denna URI används för att hämta alla arbetslivserfarenheter som finns i databasen.

***Lägg till en ny arbetslivserfarenhet***
POST /cv
Denna URI används för att lägga till en ny arbetslivserfarenhet i databasen. Användaren måste skicka med följande parametrar i request body: companyname, jobtitle, location.

***Uppdatera en befintlig arbetslivserfarenhet***
PUT /cv/:id
Denna URI används för att uppdatera en befintlig arbetslivserfarenhet i databasen. Användaren måste ange ID:t för den arbetslivserfarenhet som ska uppdateras i URL:en och skicka med de uppdaterade uppgifterna i request body: companyname, jobtitle, location.

***Ta bort en befintlig arbetslivserfarenhet***
DELETE /cv/:id
Denna URI används för att ta bort en befintlig arbetslivserfarenhet från databasen. Användaren måste ange ID:t för den arbetslivserfarenhet som ska tas bort i URL:en.

Användning
För att använda API:et, skicka HTTP-förfrågningar till de angivna URI:erna med lämpliga HTTP-metoder (GET, POST, PUT, DELETE) och följande datastrukturer:

För GET och DELETE behövs ingen request body.
För POST och PUT, skicka med data i JSON-format i request body enligt ovanstående specifikationer.

Ett kurs-objekt returneras/skickas som JSON med följande struktur:

   {
    "id": 1,
    "companyname": "Zborr",
    "jobtitle": "Håltagare",
    "location": "Östersund"
  }
