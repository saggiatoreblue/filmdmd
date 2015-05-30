dmdApp.controller('dmdFeaturedCtrl', function($rootScope, $scope, dmdFilm, dmdAuth, dmdIdentity, dmdNotifier){

    if(dmdIdentity.currentUser) {
        $rootScope.rejects = dmdIdentity.currentUser.rejects;
        $rootScope.watched = dmdIdentity.currentUser.watched;
    }
    fetchNewFeatured();

    function fetchNewFeatured() {
        var access = true;
        dmdFilm.getFeatured().then(function(response){
            angular.forEach($rootScope.rejects, function(key, value){
                if(response.id === key) {
                    access = false;
                }
            });
            angular.forEach($rootScope.watched, function(key, value){
                if(response.id === key) {
                    access = false;
                }
            });
            if(access) {
                $scope.filmId = response.id;
                $scope.title = response.title;
                $scope.synopsis = response.overview;
                $scope.image = 'https://image.tmdb.org/t/p/w396/' + response.poster_path;
                $scope.rating = response.vote_average;
            }

        }, function(reason) {
            dmdNotifier.error(reason);
        });
    }

    $scope.reload = function() {
        fetchNewFeatured();
    };

    $scope.reject = function() {
        dmdAuth.addReject($scope.filmId).then(function(){
            dmdNotifier.notify($scope.title + ' has been added to your do not watch list!');
            $rootScope.rejects = dmdIdentity.currentUser.rejects;
            $rootScope.$broadcast('rootScope:rejectAdded', {});
            fetchNewFeatured();

        }, function(reason){
             dmdNotifier.error(reason);
        });
    };

    $scope.later = function() {
        dmdAuth.addLater($scope.filmId).then(function(){
            dmdNotifier.notify($scope.title + ' has been saved!');
            $rootScope.later = dmdIdentity.currentUser.later;
            $rootScope.$broadcast('rootScope:laterAdded', {});
            fetchNewFeatured();

        }, function(reason){
            dmdNotifier.error(reason);
        });
    };

    $scope.watched = function() {
        dmdAuth.addWatched($scope.filmId).then(function(){
            dmdNotifier.notify($scope.title + ' has been added to your list of films already watched!');
            $rootScope.watched = dmdIdentity.currentUser.watched;
            $rootScope.$broadcast('rootScope:watchedAdded', {});
            fetchNewFeatured();

        }, function(reason){
            dmdNotifier.error(reason);
        });
    };

});