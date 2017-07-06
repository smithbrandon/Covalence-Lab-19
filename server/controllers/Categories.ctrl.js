var express = require('express');
var procedures = require('../procedures/Categories.proc');

var router = express.Router();

router.get('/',function(req,res){
        procedures.all()
            .then(function(users){
                res.send(users);
            },function(err){
                res.sendStatus(500);
            })
});

module.exports = router;