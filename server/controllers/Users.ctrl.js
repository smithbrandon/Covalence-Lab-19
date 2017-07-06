var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw.js');

var router = express.Router();

router.post('/login', function(req, res,next){
    passport.authenticate('local', function(err,user, info){
            console.log('just after passport');
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }else if (!user){
            return res.status(401).send(info);
        }else{
            console.log('made it here')
            req.logIn(user, function (err){
                if(err){
                    return res.sendStatus(500);
                }else{
                    console.log('User is correct');
                    return res.send(user);
                }
            })
        }
    })(req, res, next);
})

router.all('*', auth.isLoggedIn)

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me',function(req,res){
    res.send(req.user);
})

router.get('/', function (req, res) {
    procedures.all()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            res.status(500).send(err);
        })
});

router.get('/:id', function(req, res){
    procedures.read()
        .then(function(user){
            res.send(user);
        },function(err){
            console.log(err);
            res.status(500).send(err);
        })
});


module.exports = router;