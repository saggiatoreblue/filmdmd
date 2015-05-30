dmdApp.controller('dmdWatchedListCtrl', function($rootScope, $scope, dmdAuth, dmdIgnored, dmdIdentity, dmdNotifier) {
    function fetchWatched() {
        $scope.watched = [];
        dmdIgnored.fetchIgnored('watched');
        $scope.watched = $rootScope.watched;
    }
    fetchWatched();

    $scope.remove = function(idx) {
        var id = $scope.watched[idx].id;
        $scope.watched.splice(idx, 1);
        dmdAuth.removeWatched(id).then(function(){
            dmdNotifier.notify('This selection has been removed from your already watched list!');
            $rootScope.$emit('rootScope:watchedRemoved', $rootScope.watched);
            $rootScope.watched = dmdIdentity.currentUser.watched;
            fetchWatched();
        }, function(reason){
            dmdNotifier.error(reason);
        });
    };
});