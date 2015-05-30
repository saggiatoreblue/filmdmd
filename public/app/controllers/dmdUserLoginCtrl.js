dmdApp.controller('dmdUserLoginCtrl', function($location, $scope, $http, dmdGravatar, dmdIdentity, dmdNotifier, dmdAuth){

    $scope.identity = dmdIdentity;


    if(dmdIdentity.currentUser) {
        $scope.img = dmdGravatar.getGravatar(dmdIdentity.currentUser.email, 80);
    }


    $scope.signin = function(username, password) {
        dmdAuth.authenticateUser(username, password).then(function(success){
            if(success) {
                dmdNotifier.notify('You have successfully logged in');
                $location.path('/dashboard');
                $scope.img = dmdGravatar.getGravatar(dmdIdentity.currentUser.email, 80);
            }
            else {
                dmdNotifier.error('You have failed to log in');
            }
        });
    };


    $scope.signout = function() {
        dmdAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            dmdNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    };


});
