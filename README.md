App de gestion de fast food

# Install

You need mongoDB installed

`$ npm install` & `npm run client-install`

# Dev

`$ npm run server` & `npm run client`

# DB

Configurer l'accés à la DB dans le dossier config
let test = ["toto", "tata", "tutu"];

function remove(elmIndex) {
test = test.filter((elm, index) => index !== elmIndex);
}

remove(1);

Peupler la DB grâce au script seed.js
`node seed.js`

# Loging

2 comptes utilisateurs existent:

admin@admin.fr ==> compte admin
Mot de passe: "password"

test@test.fr ==> compte client
Mot de passe: "password"

Vous pouvez également créer votre propre compte

# Test

`npm test`

## To do list

     - Write API test
