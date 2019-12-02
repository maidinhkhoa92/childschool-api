const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ev = require('express-validation');
const backend = require('./app/back-end/route');
const frontend = require('./app/front-end/route');
const flash = require('connect-flash');
const cors = require('cors');
const boom = require('express-boom');
const errorHelper = require('./app/helper/error');
require('./app/config/database');
require('dotenv').config()
app
  .use(morgan('tiny'))
  .use(bodyParser.json())
  .use(cors())
  .use(boom())
  .use(flash())
  .use("/images", express.static(__dirname + '/images'))
  .use("/menus", express.static(__dirname + '/menus'))
  .use("/videos", express.static(__dirname + '/videos'))
  .use('/backend', backend)
  .use('/frontend', frontend)
  .use(function (err, req, res, next) {
    if (err instanceof ev.ValidationError) {
      err.code = 11000;
      errorHelper(res.boom, err);
    }
  })
  .listen(process.env.PORT || 8081, function (error) {
    if (error) throw error;
    app.get('/', function (req, res) {
      res.send('Your Web app s running.');
    })
  });
