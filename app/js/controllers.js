'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl4', ['$scope','$location','$route','$routeParams','version',
      function($scope,$location,$route, $routeParams, version) {
        $scope.greeting = 'hurray';
        $scope.locationpath = $location.path();
        $scope.location = $location;
         $scope.routeParams = $routeParams;
  }])
  .controller('HomeCtrl', ['$scope','$location','$route','$routeParams','version',
      function($scope,$location,$route, $routeParams, version) {

  }])
  .controller('MyCtrl3', ['$scope','$location','$route','$routeParams','version',
      function($scope,$location,$route, $routeParams, version) {
        $scope.greeting = 'hurray';
        $scope.locationpath = $location.path();
        $scope.location = $location;
         $scope.routeParams = $routeParams;
         $location.path('/view2');
  }])
  .controller('MyCtrl2', [function() {

  }]);