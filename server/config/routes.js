var auth = require('./auth');
var users = require('../controllers/users');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

    app.post('/api/users', users.createUser);

    app.put('/api/users', users.updateUser);

    app.get('/partials/*', function(req,res){
        res.render('partials/' + req.params[0])

    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser : req.user
        });
    });


};
