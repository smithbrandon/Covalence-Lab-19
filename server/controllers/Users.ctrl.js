var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/Users.proc');
var auth = require('../middleware/auth.mw.js');
var utils = require('../../utils');

var router = express.Router();

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.get('/me', function (req, res) {
    console.log(req.user);
    res.send(req.user);
})

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

router.all('*', auth.isLoggedIn, auth.isAdmin)

router.route('/')
    .get(function (req, res) {
        procedures.all()
            .then(function (users) {
                res.send(users);
            }, function (err) {
                res.status(500).send(err);
            });
    })
    .post(function (req, res) {
        var u = req.body;
        utils.encryptPassword(u.password)
            .then(function (hash) {
                return procedures.add(u.firstname, u.lastname, u.email, hash, u.role)
                    .then(function (id) {
                        res.send(id)
                    }, function (err) {
                        console.log(err);
                        res.sendStatus(500);
                    })
            })
    });

router.route('/:id')
    .get(function (req, res) {
        procedures.read(req.params.id)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            });
    })
    .put(function (req, res) {
        var u = req.body;
        console.log(u);
        utils.encryptPassword(u.password)
            .then(function (hash) {
                procedures.update(u.id, u.firstname, u.lastname, u.email, hash, u.role)
                    .then(function () {
                        res.sendStatus(201);
                    }, function (err) {
                        console.log(err);
                        res.status(500).send(err);
                    });
            })
    })
    .delete(function (req, res) {
        procedures.destroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.status(500).send(err);
            })
    });


module.exports = router;