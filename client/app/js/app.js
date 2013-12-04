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
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
        $routeProvider.when('/view3/:chapterId/Section/:sectionId', {templateUrl: 'partials/book.html', controller: 'MyCtrl3'});
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
        $routeProvider.otherwise({redirectTo: '/view1'});
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
