dmdApp.controller('dmdLaterCtrl', function($rootScope, $scope, dmdAuth, dmdIgnored, dmdIdentity, dmdNotifier) {
    $scope.limit = 4;

    $scope.$on('rootScope:laterAdded', function(event, data){
        fetchLaterLimit();
    });

    function fetchLaterLimit() {
        $scope.later = [];
        dmdIgnored.fetchIgnored('later', $scope.limit);
        $scope.later = $rootScope.later;
    }
    fetchLaterLimit();

    $scope.remove = function(idx) {
        var id = $scope.later[idx].id;
        $scope.later.splice(idx, 1);
        dmdAuth.removeLater(id).then(function(){
            dmdNotifier.notify('This selection has been removed from saved list!');
            $rootScope.$emit('rootScope:laterRemoved', $rootScope.later);
            $rootScope.later = dmdIdentity.currentUser.later;
            fetchLaterLimit();
        }, function(reason){
            dmdNotifier.error(reason);
        });
    };
});
