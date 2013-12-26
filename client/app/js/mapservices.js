'use strict';

var g_webhostbaseurl = g_webhostbaseurl || ("http://localhost:8002/");

/**
 * Services that persists and retrieves the current user/role from localStorage
 */
angular.module('myApp.services').factory('TrasmitPosition', ['$http', function($http) {
        return {
            get: function(queryParams) {
                return $http.get((g_webhostbaseurl + 'position'),
                        {params: queryParams});
            },
            post: function(position) {
                var url = g_webhostbaseurl + 'position';
//                $http.post(url, position).success(success).error(error);
                return $http.post(url, position);
            }
        };
    }]);
angular.module('myApp.services').factory('TrasmitTrackingList', ['$http', function($http) {
        return {
            get: function(queryParams) {
                return $http.get((g_webhostbaseurl + 'trackinglist'),
                        {params: queryParams});
            },
            post: function(postData) {
                var url = g_webhostbaseurl + 'trackinglist';
                return $http.post(url, postData);
            }
        };
    }]);
angular.module('myApp.services').factory('BaiduMap', ['$http', function($http) {
        var map;
        var markerlist = [];
        return {
            showBase: function() {
                $('#map').height(function(index, height) {
                    return window.innerHeight - $(this).offset().top;
                });
                map = new BMap.Map("map");          // 创建地图实例  
                var point = new BMap.Point(121.5000, 31.2000);//shanghai
                map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别  
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.MapTypeControl());
            },
            showMarker: function(pos) {
                var crd = pos.coords;
                var point = new BMap.Point(crd.longitude, crd.latitude);
                BMap.Convertor.translate(point, 0, function(point) {
                    var marker = new BMap.Marker(point);        // 创建标注    
                    map.addOverlay(marker);
                    map.centerAndZoom(point, 18);                 // 初始化地图，设置中心点坐标和地图级别  
                    markerlist.push(marker);
                });
            }
        };
    }]);
angular.module('myApp.services').factory('GetPosition', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
        var timeoutVal = 5 * 1000*2;
        var options = {
            enableHighAccuracy: true,
            timeout: timeoutVal,
            maximumAge: 0
        };

        return {
            get: function() {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var position = {};
                position.coords = {};
                position.coords.latitude = 31.2539564;
                position.coords.longitude = 121.5784224;
                position.coords.altitude = 0;
                position.coords.accuracy = 136;
                deferred.resolve(position);

//                navigator.geolocation.getCurrentPosition(function(position) {
//                    deferred.resolve(position);
//                }, function(reason) {
//                    deferred.reject(reason);
//                }, options);


                return promise;


            }
        };



    }]);
