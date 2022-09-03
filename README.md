# integracao-sheets

__Primeiramente, esse projeto é uma integração do Google Sheets com o HubSpot CRM, para contatos__

## Como ver os valores da aplicação

__Primeiro realize o login com a conta google informada na foto, a senha correta está informada no campo "Confirmar"__ 

![This is a alt text.](https://cdn.discordapp.com/attachments/999865179988824132/1015721785280446464/Captura_de_tela_2022-08-30_184657.png "This is a sample image.")

__Acesse a planilha descrita na foto utilizando o link "https://docs.google.com/spreadsheets/d/1Fa_NzZz8BTs7EbIYn0knQDxK_veCABefpJ0HvAweGnU/edit#gid=1129032489"__

![This is a alt text.](https://cdn.discordapp.com/attachments/999865179988824132/1015721881837502534/unknown.png "This is a sample imagem.")

__Para inserir um novo contato para o HubSpot, primeiramente inserimos no sheets, acessado com o link da forma que está apresentada na imagem acima.__

## Rodando o projeto

__Para rodar o projeto, basta fazer um clone do projeto, entrar na pasta do integracao-sheets e rodar o comanto npm start como na foto abaixo__

![This is a alt text.](https://cdn.discordapp.com/attachments/999865179988824132/1015727485591232672/unknown.png "This is a sample imagem.")

__Para inserir um novo contato no HubSpot CRM, iremos realizar uma requisição no end point fornecido: http://localhost:3001/buscaDadosSheets__
__Caso a porta 3001 esteja ocupada, a requisição pode ser feita em outra porta, quando rodar o projeto, ele informara em qual porta está sendo escutada a requisição__

## Como ver os contatos inseridos pelo google sheets?

__Abra o hubSport com a mesma conta do google, que já esta configurada para o projeto e vá para a pagina de contatos, representada na imagem abaixo__

![This is a alt text.](https://cdn.discordapp.com/attachments/999865179988824132/1015722002021105815/unknown.png "This is a sample imagem.")
