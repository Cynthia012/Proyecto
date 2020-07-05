const functions = require('firebase-functions');
const express= require ('express');
const bodyParse= require('body-parser');
const rutas=require ('./routes/rutas');
const cors=require("cors");

const app = express();
app.use(cors());

app.use(bodyParse.urlencoded ({extended: false}));
app.use(bodyParse.json());
app.use('/', rutas);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.app = functions.https.onRequest(app);