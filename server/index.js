var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./api');
var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport');
var auth = require('./middleware/auth.mw');
var routing = require("./middleware/routing.mw");
var prerender = require('prerender-node');

var indexPath = path.join(__dirname, '../client/index.html');
var clientPath = path.join(__dirname, '../client');

var app = express();

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
// prerender.set('prerenderServiceUrl', 'http://localhost:1337/');
app.use(prerender)
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);

app.get('*', routing.stateRouting);

app.listen(process.env.PORT || 3000);
