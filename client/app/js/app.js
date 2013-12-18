'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
])
        .factory('myHttpInterceptor', ['$q','$location','$rootScope',function($q,$location,$rootScope) {
    return {
        // optional method
        'request': function(config) {
// do something on success
            return config || $q.when(config);
        },
// optional method
        'requestError': function(rejection) {
// do something on error
            return $q.reject(rejection);
        },
        response: function(response) {
            // do something on success
            return response;
        },
        responseError: function(response) {
            // do something on error
            if (response.status === 403) {
                $location.path('/login');
            }
            //consider all the other stuff as offline
            $location.path('/errorpage');
             $rootScope.errorpage_responsebackup =  response;
            return $q.reject(response);
        }
    };
}])
        .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
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
            access: access.anon
        });
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            access: access.user
        });
        $routeProvider.when('/account', {
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl',
            access: access.anon
        });
        $routeProvider.when('/admin', {
            templateUrl: 'partials/admin.html',
            controller: 'AdminCtrl',
            access: access.admin
        });
        $routeProvider.when('/route', {
            templateUrl: 'partials/route.html',
            controller: 'RouteCtrl',
            access: access.user
        });
        $routeProvider.when('/trackinglist', {
            templateUrl: 'partials/trackinglist.html',
            controller: 'TrackinglistCtrl',
            access: access.user
        });
         $routeProvider.when('/errorpage', {
            templateUrl: 'partials/errorpage.html',
            controller: 'ErrorPageCtrl',
            access: access.public
        });
        $routeProvider.otherwise({redirectTo: '/home'});
        $httpProvider.interceptors.push('myHttpInterceptor');

//        var interceptor = ['$location', '$q', function($location, $q) {
//        function success(response) {
//            return response;
//        }
//
//        function error(response) {
//
//            if(response.status === 403) {
//                $location.path('/login');
//                return $q.reject(response);
//            }
//            else {
//                return $q.reject(response);
//            }
//        }
//
//        return function(promise) {
//            return promise.then(success, error);
//        }
//    }];
//
//    $httpProvider.responseInterceptors.push(interceptor);

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
