const { google } = require("googleapis");
const axios = require("axios");

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

    } catch (e) {
      rodaRequest = false;
    }
  }

  const novaLista = [];

  for (const i of listafinal) {

    if ((String(i[2]).indexOf('@') > -1) &&
      !(String(i[2].indexOf('@gmail')) > -1) &&
      !(String(i[2].indexOf('@hotmail')) > -1) &&
      !(String(i[2].indexOf('@outlook')) > -1)) {
      console.log('exibindo valor ', i[2]);
      novaLista.push(i);
    }

  }

  const retornoHubContacts = await postHubSportCmr(novaLista);
  console.log("QQQQQQQQQ",retornoHubContacts);
  return retornoHubContacts;
}

// const postHubSportCmr = () => {

//   ////informa o token para validasção
// const ACCESS_TOKEN = "pat-na1-fcb92bc0-ac4a-4b46-808b-2d04a1d552a9"

//   const options = {
//     method: 'GET',
//     url: 'https://api.hubapi.com/crm/v3/objects/contacts',
//     headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
//   };

//   return axios.request(options).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

// }

//POST


const postHubSportCmr = (novaLista) => {

  const ACCESS_TOKEN = "pat-na1-fcb92bc0-ac4a-4b46-808b-2d04a1d552a9";

  let fazpost = true;

  while (fazpost) {

    //roda todos os itens para inserir
    for (const i of novaLista) {
      console.log("Roda a lista", i[2]);
      //monta a requisição
      const options = {
        method: 'POST',
        url: 'https://api.hubapi.com/contacts/v1/contact/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        data: {
          properties: [
            { property: 'email', value: `${i[2]}` },
            { property: 'firstname', value: `${i[1]}` },
            { property: 'website', value: `${i[0]}` },
            { property: 'company', value: `${i[3]}` },
            { property: 'phone', value: `${i[4]}` },
          ]
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });

    }

    fazpost = false;

  }

}


module.exports = GoogleSheetsService;
