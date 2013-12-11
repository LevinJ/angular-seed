'use strict';

var g_webhostbaseurl = g_webhostbaseurl || ("http://localhost:8002/");

/**
 * Services that persists and retrieves the current user/role from localStorage
 */
angular.module('myApp.services').factory('latitudelongitude', ['$http', function($http) {
        return {
            get: function(success, error) {
                return $http.get(g_webhostbaseurl + 'position');
//                $http.get(g_webhostbaseurl + 'position').success(success).error(error);
            },
            post: function(position, success, error) {
                var url = g_webhostbaseurl + 'position';
//                $http.post(url, position).success(success).error(error);
                return $http.post(url, position);
            }
        };
    }]);
angular.module('myApp.services').factory('getposition', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
        var timeoutVal = 5 * 1000 * 3;
        var options = {
            enableHighAccuracy: true,
            timeout: timeoutVal,
            maximumAge: 0
        };

        return {
            get: function() {
                var deferred = $q.defer();
                var promise = deferred.promise;

//                var position = {};
//                position.coords = {};
//                position.coords.latitude = 31.2539564;
//                position.coords.longitude = 121.5784224;
//                position.coords.altitude = 0;
//                position.coords.accuracy = 136;
//                deferred.resolve(position);

                navigator.geolocation.getCurrentPosition(function(position) {
                    deferred.resolve(position);
                }, function(reason) {
                    deferred.reject(reason);
                }, options);


                return promise;


            }
        };



    }]);
