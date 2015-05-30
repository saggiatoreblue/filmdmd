var dmdApp = angular.module('dmdApp', ['ngResource', 'ngRoute', 'snap', 'ngAnimate']);

dmdApp.config(function($routeProvider,$locationProvider){

    var routeRoleChecks = {
        admin : { auth : function(dmdAuth) {
            return dmdAuth.authorizeCurrentUserForRoute('admin')
        }},
        user : {auth : function(dmdAuth) {
            return dmdAuth.authorizeAuthenticatedUserForRoute();
        }}
    };


    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {

        templateUrl : '/partials/account/signup',
        controller : 'dmdSignupCtrl',
        resolve : {
            auth : function(dmdIdentity, $location) {
                if(dmdIdentity.currentUser) {
                    $location.path('/dashboard');
                }
            }
        }

    });

    $routeProvider.when('/dashboard', {
        templateUrl : '/partials/main/dashboard',
        controller : 'dmdDashboardCtrl',
        resolve : routeRoleChecks.user
    });

    $routeProvider.when('/profile', {
        templateUrl : '/partials/account/profile',
        controller : 'dmdProfileCtrl',
        resolve : routeRoleChecks.user
    });

    $routeProvider.when('/notinterested', {
        templateUrl : '/partials/main/rejects-list',
        controller : 'dmdRejectsListCtrl',
        resolve : routeRoleChecks.user
    });

    $routeProvider.when('/watched', {
        templateUrl : '/partials/main/watched-list',
        controller : 'dmdWatchedListCtrl',
        resolve : routeRoleChecks.user
    });

    $routeProvider.when('/saved', {
        templateUrl : '/partials/main/saved-list',
        controller : 'dmdLaterListCtrl',
        resolve : routeRoleChecks.user
    });
});

dmdApp.run(function($rootScope, $location){

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not authorized') {
            $location.path('/');
        }
       
    })
});

