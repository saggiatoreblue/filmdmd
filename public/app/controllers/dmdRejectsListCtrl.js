dmdApp.controller('dmdRejectsListCtrl', function($rootScope, $scope, dmdAuth, dmdIgnored, dmdIdentity, dmdNotifier){
    function fetchRejects() {
        $scope.rejects = [];
        dmdIgnored.fetchIgnored('rejects');
        $scope.rejects = $rootScope.rejects;
    }
    fetchRejects();

    $scope.remove = function(idx) {
        var id = $scope.rejects[idx].id;
        $scope.rejects.splice(idx, 1);
        dmdAuth.removeReject(id).then(function(){
            dmdNotifier.notify('This selection has been removed from your do not watch list!');
            $rootScope.$emit('rootScope:rejectRemoved', $rootScope.rejects);
            $rootScope.rejects = dmdIdentity.currentUser.rejects;
            fetchRejects();
        }, function(reason){
            dmdNotifier.error(reason);
        });
    };

});
