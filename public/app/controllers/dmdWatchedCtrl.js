dmdApp.controller('dmdWatchedCtrl', function($rootScope, $scope, dmdAuth, dmdIgnored, dmdIdentity, dmdNotifier) {
    $scope.limit = 4;
    var handler = $scope.$on('rootScope:watchedAdded', function(event, data){
        fetchWatchedLimit();
    });
    $rootScope.$on('$destroy', handler);
    fetchWatchedLimit();

    function fetchWatchedLimit() {
        $scope.watched = [];
        dmdIgnored.fetchIgnored('watched', $scope.limit);
        $scope.watched = $rootScope.watched;
    }

    $scope.remove = function(idx) {
        var id = $scope.watched[idx].id;
        $scope.watched.splice(idx, 1);
        dmdAuth.removeWatched(id).then(function(){
            dmdNotifier.notify('This selection has been removed from your already watched list!');
            $rootScope.$emit('rootScope:watchedRemoved', $rootScope.watched);
            $rootScope.watched = dmdIdentity.currentUser.watched;
            fetchWatchedLimit();
        }, function(reason){
            dmdNotifier.error(reason);
        });
    };
});
