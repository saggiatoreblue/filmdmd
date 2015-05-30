dmdApp.controller('dmdProfileCtrl', function($scope, dmdAuth, dmdIdentity, dmdNotifier){
    $scope.username = dmdIdentity.currentUser.username;
    $scope.email = dmdIdentity.currentUser.email;
    $scope.firstName = dmdIdentity.currentUser.firstName;
    $scope.lastName = dmdIdentity.currentUser.lastName;


    $scope.update = function() {

        var newUserData = {
            username : $scope.username,
            email : $scope.email,
            firstName : $scope.firstName,
            lastName : $scope.lastName
        };

        if($scope.password && $scope.password.length > 0) {
            newUserData.password = $scope.password;
        }

        dmdAuth.updateCurrentUser(newUserData).then(function(){
            dmdNotifier.notify('User profile has been updated');
        }, function(reason) {
            dmdNotifier.error(reason);
        });
    }

});