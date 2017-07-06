var db = require('../config/db')

exports.all = function(){
    return db.rows('getPosts');
};

exports.read = function(id){
    return db.row('getPost',[id]);
}
exports.add = function(title, user, category, content){
    return db.row('addPost',[title, user, category, content]);
};
exports.update = function(id, title, category, contents){
    return db.empty('updatePost',[id, title, category, contents]);
};
exports.destroy = function(id){
    return db.empty('delPost',[id]);
};