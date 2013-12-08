'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]).
        config(['$routeProvider', function($routeProvider) {
        var access = routingConfig.accessLevels;
        $routeProvider.when('/register', {
            templateUrl: 'partials/register.html', 
            controller: 'RegisterCtrl'});
        $routeProvider.when('/private', {
            templateUrl: 'partials/private.html', 
            controller: 'PrivateCtrl'});
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html', 
            controller: 'LoginCtrl',
            access:         access.anon
        });
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html', 
            controller: 'HomeCtrl',
            access:         access.user
        });
        $routeProvider.when('/account', {
            templateUrl: 'partials/account.html', 
            controller: 'AccountCtrl',
            access:         access.anon
        });
        $routeProvider.when('/admin', {
            templateUrl: 'partials/admin.html', 
            controller: 'AdminCtrl',
            access:         access.admin
        });
        $routeProvider.when('/route', {
            templateUrl: 'partials/route.html', 
            controller: 'RouteCtrl',
            access:         access.user
        });
        $routeProvider.otherwise({redirectTo: '/more'});
    }]);//.
     //   run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

//        $rootScope.$on("$routeChangeStart", function(event, next, current) {
//            $rootScope.error = null;
//            if (!Auth.authorize(next.access)) {
//                if (Auth.isLoggedIn())
//                    $location.path('/');
//                else
//                    $location.path('/login');
//            }
//        });

 //   }]);
