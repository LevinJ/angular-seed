'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngAnimate']).
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

        $rootScope.togglesidebar = false;

        $rootScope.toggleSidebarClick = function() {
            $rootScope.togglesidebar = !$rootScope.togglesidebar;
        };
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
        .controller('RouteCtrl', ['getposition','$scope',function(getposition,$scope) {
             $scope.positions=[];
                $scope.getposition= function(){
                    getposition.get(function(position){
                        $scope.positions.push(position);
                console.log(position);
            },function(error){
                console.log(error);
            });
                };
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