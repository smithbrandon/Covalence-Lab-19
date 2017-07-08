exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

exports.isOwned = function(req, res, next){
    // if(req.user.id === )
}
exports.isAdmin = function(req, res, next){
    if(req.user.role === 'admin'){
        next();
    }else{
        res.redirect('/');
        res.sendStatus(401);
    }
}
