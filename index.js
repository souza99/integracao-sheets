const express = require("express");
const {google } = require("googleapis");
const GoogleSheetsService = require("./services/GoogleSheetsService");
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();

async function getAuthSheets () {

    //guarda as credenciais do google
    //scopes == link da api
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    //cliente da autenticação
    const client = await auth.getClient()

    //conexão com googlesheets
    const googleSheets = google.sheets({
        version: "v4",
        auth: client,
    });

    //parametro esperado pelos gets da função
    const spreadsheetId = "1Fa_NzZz8BTs7EbIYn0knQDxK_veCABefpJ0HvAweGnU";

    return {
        auth,
        client,
        googleSheets,
        spreadsheetId,
    };
}

app.get("/metadata", async (req, res) => {

    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    res.send(metadata);

});

//pega os alores das resposta da planilha
app.get("/getRows", async (req, res) => {

    const googleSheetsService = new GoogleSheetsService().seartAllRows();
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Página1!A2:F1000",
        valueRenderOption: "UNFORMATTED_VALUE",
    })

    res.send(getRows.data);
});

app.listen(HTTP_PORT, () => console.log(`Ouvindo na porta ${HTTP_PORT}`));