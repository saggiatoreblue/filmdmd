var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development : {
        db : 'mongodb://localhost/filmdmd',
        rootPath : rootPath,
        port : process.env.PORT || 3030
    },

    production : {
        db : 'mongodb://saggiatoreblue:Antimatter12!@ds037252.mongolab.com:37252/filmdmd',
        rootPath : rootPath,
        port : process.env.PORT || 80
    }
};