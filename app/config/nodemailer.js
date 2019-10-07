var nodemailer = require('nodemailer');

// Configurations
const parameters = require('./parameters.json');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(parameters.mail);

module.exports = transporter;
