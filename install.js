const mysql = require("mysql");
require('dotenv').config(); //Kan hämta in variabler från .env-filen

//Anslutningsinställningar (Hämtar variablerna från .env)
const connection = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD, 
    database:process.env.DB_DATABASE 
});

connection.connect((error) => {
    if (error) {
        console.error("Connection failed" + error);
        return;
    }

    console.log("Connected through mySql");
});

module.exports = connection; //Exporterar variabeln connection för anvädnings i server.js
/*********************************************/

//SQL-frågor

connection.query(`CREATE DATABASE IF NOT EXISTS work_experience_db`);

console.log("Database work_experience_db created.");

connection.query(`USE work_experience_db`);

console.log("Database work_experience_db in use.");

connection.query(`DROP TABLE IF EXISTS cv`);

connection.query(`CREATE TABLE cv (
id INT AUTO_INCREMENT PRIMARY KEY,
companyname VARCHAR(255),
jobtitle VARCHAR(255),
location VARCHAR(255))`, (error, results) => {
    if(error) throw error;

    console.log("Table cv created ");

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["Zborr AB", "Arbetsledare", "Östersund"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["Zborr AB", "Håltagare/Sanerare", "Östersund"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["Hägerstens AB", "Håltagare", "Stockholm"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["Gnesta Kommun", "Lärare", "Gnesta"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["Bikupan FSK", "Föreskolepedagod", "Östersund"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["Krokom Kommun", "Hemtjänst", "Krokom"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

    connection.query(`INSERT INTO cv (companyname, jobtitle, location) VALUES (?, ?, ?)`, ["SwedishMatch", "Lager", "Göteborg"], (error, results) => {
        if(error) throw error;
        console.log('Data successfully inserted into cv table.');
        
    });

})



