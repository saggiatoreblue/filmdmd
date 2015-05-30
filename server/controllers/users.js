var User = require('mongoose').model('User');

var crypto = require('../utilities/encryption');

exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection){
        res.send(collection);
    });
};


exports.updateUser = function(req, res) {

    var userUpdate = req.body;

    if(req.user._id != userUpdate._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }
    req.user.firstName = userUpdate.firstName;
    req.user.lastName = userUpdate.lastName;
    req.user.username = userUpdate.username;
    req.user.email = userUpdate.email;
    req.user.rejects = userUpdate.rejects;
    req.user.watched = userUpdate.watched;
    req.user.later = userUpdate.later;

    if(userUpdate.password && userUpdate.password.length > 0) {
        req.user.salt = crypto.createSalt();
        req.user.hashed_pwd = crypto.hashPwd(req.user.salt, userUpdate.password);
    }

    req.user.save(function(err){
        if(err) {res.status(400); return res.send({reason: err.toString()})}
        res.send(req.user);
    });

};


exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = crypto.createSalt();
    userData.hashed_pwd = crypto.hashPwd(userData.salt, userData.password);

    User.create(userData, function(err, user){
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason : err.toString()});
        }
        req.logIn(user, function(err){
            if(err) {return next(err)}
            res.send(user);
        });

    })
};