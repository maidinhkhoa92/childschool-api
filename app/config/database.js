'use strict';

// Dependencies
const Mongoose = require('mongoose');

// Configurations
const parameters = require('./parameters.json');

Mongoose.connect(`mongodb://${parameters.database.username}:${parameters.database.password}@cluster0-shard-00-00-0mjj1.mongodb.net:27017,cluster0-shard-00-01-0mjj1.mongodb.net:27017,cluster0-shard-00-02-0mjj1.mongodb.net:27017/${parameters.database.db}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,{
  useMongoClient: true
});

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
  console.log('Connection with database succeeded');
});

module.exports = db;
