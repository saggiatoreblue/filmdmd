dmdApp.factory('dmdAuth', function($http, dmdIdentity, $q, dmdUser){
    return {
        authenticateUser : function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(response){
                if(response.data.success) {
                    var user = new dmdUser();
                    angular.extend(user, response.data.user);
                    dmdIdentity.currentUser = user;
                    dfd.resolve(true);
                }
                else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser : function(newUserData) {
            var newUser = new dmdUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function(){
                dmdIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        updateCurrentUser : function(newUserData) {
            var dfd = $q.defer();
            var clone = angular.copy(dmdIdentity.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function(){
                dmdIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },


        addReject : function(rejectId) {
            var dfd = $q.defer();
            var currentUser = dmdIdentity.currentUser;
            currentUser.rejects.unshift(rejectId);
            currentUser.$update().then(function() {
                dmdIdentity.currentUser.rejects = currentUser.rejects;
                dfd.resolve();
            },function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        addLater : function(laterId) {
            var dfd = $q.defer();
            var currentUser = dmdIdentity.currentUser;
            currentUser.later.unshift(laterId);
            currentUser.$update().then(function() {
                dmdIdentity.currentUser.later = currentUser.later;
                dfd.resolve();
            },function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        addWatched : function(watchedId) {
            var dfd = $q.defer();
            var currentUser = dmdIdentity.currentUser;
            currentUser.watched.unshift(watchedId);
            currentUser.$update().then(function() {
                dmdIdentity.currentUser.watched = currentUser.watched;
                dfd.resolve();
            },function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        removeReject : function(rejectId) {
            var dfd = $q.defer();
            var currentUser = dmdIdentity.currentUser;
            var idx = currentUser.rejects.indexOf(rejectId);
            currentUser.rejects.splice(idx, 1);
            currentUser.$update().then(function() {
                dmdIdentity.currentUser.rejects = currentUser.rejects;
                dfd.resolve();
            },function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        removeLater : function(rejectId) {
            var dfd = $q.defer();
            var currentUser = dmdIdentity.currentUser;
            var idx = currentUser.later.indexOf(rejectId);
            currentUser.later.splice(idx, 1);
            currentUser.$update().then(function() {
                dmdIdentity.currentUser.later = currentUser.later;
                dfd.resolve();
            },function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        removeWatched : function(watchedId) {
            var dfd = $q.defer();
            var currentUser = dmdIdentity.currentUser;
            var idx = currentUser.watched.indexOf(watchedId);
            currentUser.watched.splice(idx, 1);
            currentUser.$update().then(function() {
                dmdIdentity.currentUser.watched = currentUser.watched;
                dfd.resolve();
            },function(response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },


        logoutUser : function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout : true}).then(function(){
                dmdIdentity.currentUser = undefined;
                dfd.resolve();
            });

            return dfd.promise;
        },

        authorizeCurrentUserForRoute : function(role) {
            if(dmdIdentity.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute : function() {
            if(dmdIdentity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
});