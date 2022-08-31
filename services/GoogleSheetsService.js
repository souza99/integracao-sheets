const { google } = require("googleapis");

async function getAuthSheets() {
  //guarda as credenciais do google
  //scopes == link da api
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //cliente da autenticação
  const client = await auth.getClient();

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

async function GoogleSheetsService() {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  let rodaRequest = true;
  let listafinal = [];
  let pagina = 1;

    while (rodaRequest) {
        try {

            const getRows = await googleSheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: `Página${pagina}!A2:F1000`,
                valueRenderOption: "UNFORMATTED_VALUE",
              });
               
                listafinal.push(...getRows.data.values);
                pagina += 1;

        }catch(e){
            rodaRequest = false;
        }
    }

    const novaLista = [];

    for(const i of listafinal) { 

      if ((String(i[2]).indexOf('@') > -1) &&
       !(String(i[2].indexOf('@gmail')) > -1) &&
        !(String(i[2].indexOf('@hotmail')) > -1) &&
         !(String(i[2].indexOf('@outlook')) > -1) ) {
        console.log('exibindo valor ', i[2]);
        novaLista.push(i);
      }

     
    }

    console.log(novaLista);
    return novaLista;
}

module.exports = GoogleSheetsService;
