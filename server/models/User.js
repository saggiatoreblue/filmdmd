var mongoose = require('mongoose');
var crypto = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName : {type : String, required : '{PATH} is required!'},
    lastName : {type : String, required : '{PATH} is required!'},
    username : {
        type : String,
        required : '{PATH} is required!',
        unique : true
    },
    email  : {type : String, required : '{PATH} is required!'},
    salt  : {type : String, required : '{PATH} is required!'},
    hashed_pwd : {type : String, required : '{PATH} is required!'},
    roles : [String],
    rejects : {
        type : [Number]
    },
    watched : {
        type : [Number]
    },
    later : {
        type : [Number]
    }

});

userSchema.methods = {
    authenticate : function(passwordToMatch) {
        return crypto.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },

    hasRole : function(role) {
        return this.roles.indexOf(role) > -1;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection){
        if(collection.length === 0) {
            var salt, hash;
            salt = crypto.createSalt();
            hash = crypto.hashPwd(salt, 'k72898');
            User.create({firstName : 'Michael', lastName : 'Botelho', username : 'saggiatoreblue', email : 'saggiatoreblue@gmail.com', salt : salt, hashed_pwd : hash, roles : ['admin'], rejects : [], watched : [], later : []});

        }
    });

}

exports.createDefaultUsers = createDefaultUsers;