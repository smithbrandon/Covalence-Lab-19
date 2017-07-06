var express = require('express');
var Users = require('./controllers/Users.ctrl');
var Posts = require('./controllers/Posts.ctrl');
var Categories = require('./controllers/Categories.ctrl');

var router = express.Router();

router.use('/users', Users);
router.use('/posts',Posts);
router.use('/categories', Categories);

module.exports = router;