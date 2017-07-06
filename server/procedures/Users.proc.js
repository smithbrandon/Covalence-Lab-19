var db = require('../config/db');

exports.readByEmail = function(email){
    return db.row('getUserByEmail',[email]);
}

exports.all = function(){
    return db.rows('getUsers');
}

exports.read = function(id){
    return db.row('GetUser',[id])
}