/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

/* Controllers */
angular.module('myApp.controllers')
        .controller('RouteCtrl', ['$scope', 'TrasmitPosition', function($scope, TrasmitPosition) {
        var queryParams = {};
        queryParams.username = 'user';
        queryParams.starttime = new Date(2010, 3, 1);
        queryParams.endtime = new Date(2015, 4, 1);
        $scope.positions = [];
        TrasmitPosition.get(queryParams)
                .then(function(value) {
            $scope.positions = value.data.result;
            console.log(value);
        })
        . catch (function(reason) {
            console.log(reason);
        });
    }])
        .controller('TrackinglistCtrl', ['$scope', 'TrasmitTrackingList', 'Auth', function($scope, TrasmitTrackingList,Auth) {
        var queryParams = {};
        queryParams.user = Auth.user.username;
        TrasmitTrackingList.get(queryParams)
                .then(function(value) {
                     $scope.trackingdata = value.data.result;
                     if(!$scope.trackingdata){
                         $scope.trackingdata = {};
                         $scope.trackingdata.user = Auth.user.username;
                         $scope.trackingdata.trackinglist=[];
                     }
                     console.log(value);
                  })
                  . catch (function(reason) {
                       console.log(reason);
                     });
        $scope.addNewUser = function(newUser) {
            
            $scope.trackingdata.trackinglist.push(newUser);
            
            TrasmitTrackingList.post($scope.trackingdata);
//            .then(function(value) {
//                     $scope.trackingdata = value.data.result;
//                     $scope.newUser = '';
//                     console.log(value);
//                  })
//                  . catch (function(reason) {
//                       console.log(reason);
//                        var arr = $scope.trackingdata.trackinglist;
//                                arr.splice(arr.indexOf(newUser), 1);
//                     });
            
        };
        $scope.deleteUser = function(user) {
             var arr = $scope.trackingdata.trackinglist;
             arr.splice(arr.indexOf(user
                     ), 1);
              TrasmitTrackingList.post($scope.trackingdata);
              //will add middleware to handle errors
//            .then(function(value) {
//                     $scope.trackingdata = value.data.result;
//                     $scope.newUser = '';
//                     console.log(value);
//                  })
//                  . catch (function(reason) {
//                       console.log(reason);
//                        var arr = $scope.trackingdata.trackinglist;
//                                arr.splice(arr.indexOf(newUser), 1);
//                     });
        };
    }])
        .controller('checkinCtrl', ['$scope', 'GetPosition', 'TrasmitPosition', function($scope, GetPosition, TrasmitPosition) {
        $scope.checkinClick = function() {
            GetPosition.get()
                    .then(function(value) {
                return TrasmitPosition.post(value);
            })
                    .then(function(value) {
                console.log(value);
            })
                    . catch (function(reason) {
                console.log(reason);
            });
        };
    }])
        .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', 'GetPosition', 'TrasmitPosition', function($rootScope, $scope, $location, Auth, GetPosition, TrasmitPosition) {
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
        .controller('HomeCtrl',
        ['$rootScope', '$scope', '$location', '$route', '$routeParams', 'version', 'TrasmitPosition', 'Users',
            function($rootScope, $scope, $location, $route, $routeParams, version, TrasmitPosition, Users) {

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
                                success(position);
                                TrasmitPosition.post(position,
                                        function(data, status, headers, config) {
                                            console.log(data);
                                        }
                                , function(data, status, headers, config) {
                                    console.log(data);
                                });
                            }());
                            //navigator.geolocation.getCurrentPosition(success, error, options);
                        }
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
//                        $('#slider').prepend(log);
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
                $scope.getusers = function() {
                    Users.getAll(function(data) {
                        console.log(data);
                    }, function(data) {
                        console.log(data);
                    });
                };
                $(document).ready(function() {
                    initLayout();
//    registerBtnHandle();
                    //  BAIDUMAPM.showBase();
                    // LOGGINGUTIL.logInfo("Page loaded");
                    // refreshMarker();
                });


            }]);

