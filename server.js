//Serverinställningar
const express = require("express")          //Ramverk för byggandet av webbapplikationer/API med Node.js
const cors = require("cors");               //Möjliggör för andra domäner att begära data från webbsidan/dataservern
const connection = require('./install');    // Importera databasanslutningsobjektet från env-filen
const app = express();                      //Instans som fungerar som dataserver. Möjliggör för routs och middleware
const port = process.env.PORT || 3000;      //Tilldelar port

//middleware
app.use(cors());                            //Tillåter korsdomänsförfrågningar
app.use(express.json());                    //Omvanldar inkommande JSON-data till JS-objekt

//Routes

//Hämta info från table CV
app.get("/cv", (req, res) => {

    connection.query(`SELECT * FROM cv;`, (error, results) => {
        if(error) {
            res.status(500).json({error: "Något gick fel: " + error});
            return;
        }
        //Kontroll kod för resultat. Om ingen table vid namn CV finns skickas statuskod 200 eftersom begäran är godkänd, men databas finns ej.
        if(results.length === 0) {
            res.status(200).json({message: "No cv found"});
        }else{
            res.json(results);
        }
        })
    });
    
    //Skapa info till CV
    app.post("/cv", (req, res) => {                 //Hämtar värdena från JSON-objektet som skickas med när ny data till databasen skickas via webbplatsen.
        let companyname = req.body.companyname;
        let jobtitle = req.body.jobtitle;
        let location = req.body.location;
         
    //error-hantering
    let errors = {
        message: "",
        detail: "",
        https_response: {}
    };
    
    if(!companyname || !jobtitle || !location) {
        errors.message = "Companyname, jobtitle and location är inte inkluderade";
        errors.detail = "Du måste inkludera companyname, jobtitle och location in JSON";
    
    //response code
    errors.https_response.message = "Bad request";
    errors.https_response.code = 400;           //Felkod syftar till fel syntax
    
    res.status(400).json(errors);
    
    return;
    }

    //Lägg till info till databasen

    connection.query(`INSERT INTO cv(companyname, jobtitle, location)VALUES(?, ?, ?);`, [companyname, jobtitle, location], (error, results) => {
        if (error) {
            res.status(500).json({error: "Något gick fel" + error});
            return;
        }

        let work = {                        //Skapar nytt objekt som skickas till databasen
            companyname: companyname,
            jobtitle: jobtitle,
            location: location
        };

        res.status(201).json({message: "cv tilllagd", work});

        }
    );
});


// Uppdatera en arbetslivserfarenhet
app.put('/cv/:id', (req, res) => {
    const id = req.params.id;
    const { companyname, jobtitle, location } = req.body;                               //Extraherar datan från användarens förfrågan och tilldelar de variabler. 
    const sql = 'UPDATE cv SET companyname=?, jobtitle=?, location=? WHERE id=?';       //Ersätter de befintliga värdena med de nya
    connection.query(sql, [companyname, jobtitle, location, id], (error, result) => {   //Skickar med de nya värdena samt ID i funktionen
      if (error) {
        res.status(500).json({ error: "Något gick fel: " + error });
        return;
      }
      res.send('CV uppdaterades!');
    });
  });
  
  // Ta bort en arbetslivserfarenhet
  app.delete('/cv/:id', (req, res) => {
    const id = req.params.id;                                                        //Hämtar värdet på parametern ID från URL
    const sql = 'DELETE FROM cv WHERE id=?';                                        //
    connection.query(sql, [id], (error, result) => {                                //Skickar med ID som parameter i SQL-frågan
      if (error) {
        res.status(500).json({ error: "Något gick fel: " + error });
        return;
      }
      res.send('Data raderats!');
    });
  });
  



//Startar applikationen
app.listen(port, () => {
    console.log("Server started on port " + port);
});
