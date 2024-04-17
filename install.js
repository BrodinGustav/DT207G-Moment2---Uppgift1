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
})



