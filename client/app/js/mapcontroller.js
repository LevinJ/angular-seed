/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

/* Controllers */
angular.module('myApp.controllers')
        .controller('HomeCtrl',
        ['$rootScope', '$scope', '$location', '$route', '$routeParams', 'version',
            function($rootScope, $scope, $location, $route, $routeParams, version) {
                console.log("home page");

                $(document).ready(function() {
                    initLayout();
//    registerBtnHandle();
                    BAIDUMAPM.showBase();
                    LOGGINGUTIL.logInfo("Page loaded");
                    refreshMarker();
                });


            }]);
function debugInfoLog(log) {
    console.log(log);
//	alert(log);
}
function parsePosition(position) {
    return "Latitude: " + position.coords.latitude + ", Longitude: "
            + position.coords.longitude + ", Accuracy: "
            + position.coords.accuracy;
}

function parseError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    return ("Error: " + errors[error.code]);
}


var GETPOS = (function() {
    var timeoutVal = 5 * 1000;
    var options = {
        enableHighAccuracy: true,
        timeout: timeoutVal,
        maximumAge: 0
    };
    return {
        getCurrentPosition: function(success, error) {
            (function() {
                var position = {};
                position.coords = {};
                position.coords.accuracy = 30;
                position.coords.latitude = 31.250162;
                position.coords.longitude = 121.580714;
                success(position);}());
            //navigator.geolocation.getCurrentPosition(success, error, options);
        }
    };
}());


var BAIDUMAPM = (function() {
    var map;
    var markerlist = [];

    function showMarker(pos) {
        var crd = pos.coords;
        var point = new BMap.Point(crd.longitude, crd.latitude);
        BMap.Convertor.translate(point, 0, function(point) {
            var marker = new BMap.Marker(point);        // 创建标注    
            map.addOverlay(marker);
            map.centerAndZoom(point, 18);                 // 初始化地图，设置中心点坐标和地图级别  
            markerlist.push(marker);
        });
    }
    function showBase() {
        map = new BMap.Map("map");          // 创建地图实例  
        var point = new BMap.Point(121.5000, 31.2000);//shanghai
        map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别  
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
    }
    function removeAllMarkers() {
        $.each(markerlist, function(index, item) {
            map.removeOverlay(item);
        });
    }
    return {
        showBase: showBase,
        showMarker: showMarker,
        removeAllMarkers: removeAllMarkers
    };
}());
function initLayout() {
    $('#slider').height(function(index, height) {
        return window.innerHeight - $(this).offset().top;
    });
    $('#map').height(function(index, height) {
        return window.innerHeight - $(this).offset().top;
    });

}
function registerBtnHandle() {
    $('#btn').click(function() {
        $('#slider').toggle('slow');
    });
    $('#btnrefreshpos').click(function() {
        BAIDUMAPM.removeAllMarkers();
        refreshMarker();

    });
}
var LOGGINGUTIL = (function() {
    function addtimeline(log) {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
        log = datetime + ": " + log;
        return log;
    }
    function inserLog(log) {
        $('#slider').prepend(log);
    }
    return {
        logInfo: function(log) {
            log = "<div>" + addtimeline(log) + "</div>";
            inserLog(log);
        },
        logWarn: function(log) {
            log = "<div class= \"warninfo\">" + addtimeline(log) + "</div>";
            inserLog(log);
        }
    };
}());
//Find a position, show the position on map by marking
function refreshMarker() {
    var possuccesscallbacks = $.Callbacks();
    possuccesscallbacks.add(function(position) {
        if (position.coords.accuracy > 100) {
            LOGGINGUTIL.logWarn(parsePosition(position));
        } else {
            LOGGINGUTIL.logInfo(parsePosition(position));
        }

    });
    possuccesscallbacks.add(BAIDUMAPM.showMarker);
    GETPOS.getCurrentPosition(function(position) {
        //do a lot of sutff here for success
        possuccesscallbacks.fire(position);
    },
            function(err) {
                //log the failure
                LOGGINGUTIL.logWarn(parseError(err));
                console.warn(parseError(err));
            });
}
