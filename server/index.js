var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./api');
var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport');
var auth = require('./middleware/auth.mw');
var routing = require("./middleware/routing.mw");

var indexPath = path.join(__dirname, '../client/index.html');
var clientPath = path.join(__dirname, '../client');

var app = express();

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);

app.get('*', routing.stateRouting);

app.listen(3000);
