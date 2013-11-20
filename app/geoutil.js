/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var g_pos = (function() {

    var rtn ={};
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

//    function success(pos) {
//        var crd = pos.coords;
//
//        console.log('Your current position is:');
//        console.log('Latitude : ' + crd.latitude);
//        console.log('Longitude: ' + crd.longitude);
//        console.log('More or less ' + crd.accuracy + ' meters.');
//    }
//    ;

    function error(err) {
//        console.warn('ERROR(' + err.code + '): ' + err.message);
        alert('ERROR(' + err.code + '): ' + err.message);
    }
    rtn.getCurrentPosition = function(success){
        navigator.geolocation.getCurrentPosition(success, error, options);
    };
    return rtn;
    //navigator.geolocation.getCurrentPosition(success, error, options);
}());

