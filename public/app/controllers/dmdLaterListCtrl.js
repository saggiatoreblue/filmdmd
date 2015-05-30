dmdApp.controller('dmdLaterListCtrl', function($rootScope, $scope, dmdAuth, dmdIgnored, dmdIdentity, dmdNotifier){
    function fetchLater() {
        $scope.later = [];
        dmdIgnored.fetchIgnored('later');
        $scope.later = $rootScope.later;
    }
    fetchLater();

    $scope.remove = function(idx) {
        var id = $scope.later[idx].id;
        $scope.later.splice(idx, 1);
        dmdAuth.removeLater(id).then(function(){
            dmdNotifier.notify('This selection has been removed from your do not watch list!');
            $rootScope.$emit('rootScope:laterRemoved', $rootScope.later);
            $rootScope.later = dmdIdentity.currentUser.later;
            fetchLater();
        }, function(reason){
            dmdNotifier.error(reason);
        });
    };

});
