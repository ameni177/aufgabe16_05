const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    fs.appendFile("users.txt", JSON.stringify(req.body) + "\n", (err) => {
        if (err) {
            console.error('Fehler beim Schreiben der Datei', err);
            return res.status(500).send('Fehler beim Schreiben der Datei');
        }
        res.send(`<!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kontakt Formular</title>
        </head>
        <body>
            <form action="/" method="get">
                <p>Registrierung erfolgreich!</p>
                <button type="submit">Zurück zum Formular</button>
            </form>
        </body>
        </html>`);
    });
});

app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
