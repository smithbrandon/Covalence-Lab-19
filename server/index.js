var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var api = require('./api');
var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport');
var auth = require('./middleware/auth.mw');

var indexPath = path.join(__dirname, '../client/index.html');
var clientPath = path.join(__dirname, '../client');

var app = express();

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.get('*', auth.isLoggedIn);

app.use('/api', api);

app.get('*'
    , function (req, res, next) {
        if (isAsset(req.url)) {
            return next();
        } else {
            res.sendFile(indexPath);
        }
    });

app.listen(3000);
