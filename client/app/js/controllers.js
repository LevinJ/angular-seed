'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
        controller('MyCtrl1', [function() {

    }])
        .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
        $scope.user = Auth.user;
        $scope.userRoles = Auth.userRoles;
        $scope.accessLevels = Auth.accessLevels;

        $scope.logout = function() {
            Auth.logout(function() {
                $location.path('/login');
            }, function() {
                $rootScope.error = "Failed to logout";
            });
        };
    }])
        .controller('LoginCtrl',
        ['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

                $scope.rememberme = false;
                $scope.login = function() {
                    Auth.login({
                        username: $scope.username,
                        password: $scope.password,
                        rememberme: $scope.rememberme
                    },
                    function(res) {
                        $location.path('/home');
                    },
                            function(err) {
                                $rootScope.error = "Failed to login";
                            });
                };

                $scope.loginOauth = function(provider) {
                    $window.location.href = '/auth/' + provider;
                };
            }])
        .controller('HomeCtrl', ['$scope', '$location', '$route', '$routeParams', 'version',
    function($scope, $location, $route, $routeParams, version) {

    }])
        .controller('AccountCtrl', ['$scope', 'Auth',
    function($scope, Auth) {
        $scope.currentuser = Auth.user;
    }])
        .controller('MyCtrl3', ['$scope', '$location', '$route', '$routeParams', 'version',
    function($scope, $location, $route, $routeParams, version) {
        $scope.greeting = 'hurray';
        $scope.locationpath = $location.path();
        $scope.location = $location;
        $scope.routeParams = $routeParams;
        $location.path('/view2');
    }])
        .controller('MyCtrl2', [function() {

    }]);