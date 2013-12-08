'use strict';

var g_webhostbaseurl = g_webhostbaseurl || ("http://localhost:8002/");

/**
 * Services that persists and retrieves the current user/role from localStorage
 */
angular.module('myApp.services').factory('latitudelongitude', ['$http', function($http) {
        return {
            get: function(position, success, error) {
                $http.get(g_webhostbaseurl + 'position').success(success).error(error);
            },
            post: function(position, success, error) {
                var url = g_webhostbaseurl + 'position';
                $http.post(url, position).success(success).error(error);
            }
        };
    }]);
