var express = require('express');
var procedures = require('../procedures/Posts.proc');
var auth = require('../middleware/auth.mw.js')

var router = express.Router();

router.route('/')
    .get(function(req,res){
        procedures.all()
            .then(function(posts){
               res.send('Posts: ' + post);
                res.status(201).send(posts);
            },function(err){
                console.log(err);
                res.sendStatus(500);
            });
    })
    .post(auth.isLoggedIn, function(req, res){
        console.log(req.body);
        procedures.add(req.body.title, req.body.user, req.body.category, req.body.contents)
            .then(function(post){
                console.log(post);
            },function(err){
                console.log(err);
                res.sendStatus(500);
            });
    });

router.route('/:id')
    .get(function(req,res){
        procedures.read(req.params.id)
            .then(function(post){
                res.send(post);
            },function(err){
                res.sendStatus(500);
            });
        })
    .put(auth.isLoggedIn, function(req,res){
        console.log(req.body);
        procedures.update(req.params.id, req.body.title, req.body.categoryid, req.body.content)
            .then(function(post){
                res.sendStatus(204);
            },function(err){
                res.sendStatus(500);
            });
    })
    .delete(auth.isLoggedIn, function(req,res){
        procedures.destroy(req.params.id)
            .then(function(post){
                res.sendStatus(204);
            },function(err){
                res.sendStatus(500);
            });
    });

module.exports = router;