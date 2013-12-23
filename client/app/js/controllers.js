'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate']).
        controller('MyCtrl1', [function() {

    }])
       
        .controller('ContentCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
//        $('#slider').height(function(index, height) {
//            console.log(window.innerHeight);
//            console.log($(this).offset().top);
//            console.log(window.innerHeight - $(this).offset().top);
//            return window.innerHeight - $(this).offset().top;
//        });
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
        .controller('RegisterCtrl',
        ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
                $scope.role = Auth.userRoles.user;
                $scope.userRoles = Auth.userRoles;

                $scope.register = function() {
                    Auth.register({
                        username: $scope.username,
                        password: $scope.password,
                        email:$scope.email,
                        role: $scope.role
                    },
                    function() {
                        $location.path('/');
                    },
                            function(err) {
                                $rootScope.error = err;
                            });
                };
            }])
        .controller('AdminCtrl', [function() {

    }])
       
        .controller('PrivateCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.useHttp = function() {
            $http.get('http://localhost:8002/helloworld')
                    .success(function(data) {
                alert(data.helloword);
            });
        };

        $scope.postHttp = function() {

            $http.post('http://localhost:8002/helloworld')
                    .success(function(data) {
                alert(data.helloword);
            });
        };
        $scope.putHttp = function() {

            $http.put('http://localhost:8002/helloworld')
                    .success(function(data) {
                alert(data.helloword);
            });
        };
        $scope.deleteHttp = function() {

            $http.delete('http://localhost:8002/helloworld')
                    .success(function(data) {
                alert(data.helloword);
            });
        };
    }]);