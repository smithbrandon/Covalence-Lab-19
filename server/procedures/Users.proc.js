var db = require('../config/db');

exports.readByEmail = function(email){
    return db.row('getUserByEmail',[email]);
}

exports.all = function(){
    return db.rows('getUsers');
}

exports.read = function(id){
    return db.row('getUser',[id]);
}

exports.add = function(firstname, lastname, email, password, role){
    return db.row('addUser',[firstname, lastname, email, password, role]);
}

exports.update = function(id, firstname, lastname, email, password, role){
    return db.empty('updateUser',[id, firstname, lastname, email, password, role]);
}
exports.destroy = function(id){
    return db.empty('deleteUser',[id])
}