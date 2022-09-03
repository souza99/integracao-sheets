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

  //console.log(novaLista);

  const retornoHubContacts = await postHubSportCmr();
  console.log(retornoHubContacts);
  return novaLista;
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


const postHubSportCmr = () => {

  // const ACCESS_TOKEN = "pat-na1-fcb92bc0-ac4a-4b46-808b-2d04a1d552a9";
  // var request = require("request");

  // var options = {
  //   method: 'POST',
  //   url: 'https://api.hubapi.com/contacts/v1/contact/',
  //   qs: { hapikey: 'demo' },
  //   headers:
  //   {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${ACCESS_TOKEN}`,
  //   },
  // body:
  //   {
  //     properties:
  //       [{ property: 'email', value: {} },
  //       { property: 'firstname', value: {} },
  //       { property: 'website', value: {} },
  //       { property: 'company', value: {} },
  //       { property: 'phone', value: {} },]
  //   },
  //   json: true
  // };

  // request(options, function (error, response, body) {
  //   if (error) throw new Error(error);

  //   console.log(body);
  // });

  const ACCESS_TOKEN = "pat-na1-fcb92bc0-ac4a-4b46-808b-2d04a1d552a9";

  const options = {
    method: 'POST',
    url: 'https://api.hubapi.com/contacts/v1/contact/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN} `,
    },
    data: {
      properties: [
        { property: 'email', value: 'testingapis@hubspot.com' },
        { property: 'firstname', value: 'Adrian' },
        { property: 'lastname', value: 'Mott' },
        { property: 'website', value: 'http://hubspot.com' },
        { property: 'company', value: 'HubSpot' },
        { property: 'phone', value: '555-122-2323' },
        { property: 'address', value: '25 First Street' },
        { property: 'city', value: 'Cambridge' },
        { property: 'state', value: 'MA' },
        { property: 'zip', value: '02139' },
      ]
    }
  };

  return axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}


module.exports = GoogleSheetsService;
