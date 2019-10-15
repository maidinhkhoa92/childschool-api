const firebase = require('firebase');
const parameters = require('../config/parameters.json');
const app = firebase.initializeApp(parameters.firebase);

module.exports = app.firestore();