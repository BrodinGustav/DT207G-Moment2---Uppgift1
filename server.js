//Serverinställningar
const express = require("express")          //Ramverk för byggandet av webbapplikationer/API med Node.js
const cors = require("cors");               //Möjliggör för andra domäner att begära data från webbsidan/dataservern
const connection = require('./install');    // Importera databasanslutningsobjektet från env-filen
const app = express();                      //Instans som fungerar som dataserver. Möjliggör för routs och middleware
const port = process.env.PORT || 3000;      //Tilldelar port

//middleware
app.use(cors());                            //Tillåter korsdomänsförfrågningar
app.use(express.json());                    //Omvanldar inkommande JSON-data till JS-objekt





//Startar applikationen
app.listen(port, () => {
    console.log("Server started on port " + port);
});