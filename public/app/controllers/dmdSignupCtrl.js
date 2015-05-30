dmdApp.controller('dmdSignupCtrl', function($scope, dmdAuth, dmdNotifier, $location){

    $scope.signup = function() {
        var newUserData = {
            firstName : $scope.firstName,
            lastName  : $scope.lastName,
            username  : $scope.username,
            email     : $scope.email,
            password  : $scope.password
        };
        dmdAuth.createUser(newUserData).then(function(){
            dmdNotifier.notify('User account created');
            $location.path('/dashboard');
        }, function(reason){
            dmdNotifier.error(reason);
        });
    };



});
