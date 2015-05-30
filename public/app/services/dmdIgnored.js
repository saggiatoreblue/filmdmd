dmdApp.factory('dmdIgnored', function($http, dmdFilm, $rootScope, dmdNotifier, dmdIdentity) {
    return {
        fetchIgnored : function(type, limit) {
            $rootScope[type] = [];
            angular.forEach(dmdIdentity.currentUser[type], function (value, key) {
                if(limit) {
                    if (key > (limit - 1)) {
                        return;
                    }
                }
                dmdFilm.getFilmById(value).then(function (response) {
                   $rootScope[type].push(response);
                }, function (reason) {
                    dmdNotifier.error(reason);
                });
            });
        }

    }
});