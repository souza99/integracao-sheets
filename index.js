const express = require("express");
const GoogleSheetsService = require("./services/GoogleSheetsService");
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

// app.get("/metadata", async (req, res) => {

//     const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

//     const metadata = await googleSheets.spreadsheets.get({
//         auth,
//         spreadsheetId,
//     });

//     res.send(metadata);

// });

//pega os alores das resposta da planilha
app.get("/buscaDadosSheets", async (req, res) => {

    const googleSheetsService = GoogleSheetsService();

    res.send(googleSheetsService);
});

app.listen(HTTP_PORT, () => console.log(`Ouvindo na porta ${HTTP_PORT}`));
