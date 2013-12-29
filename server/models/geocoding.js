/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var http = require('http');
//var net = require('net');
//var url = require('url');

function converttoBaiduCord(originallat, originallon, cb){
   
    var url = "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&x="+ originallon
    + "&y=" +  originallat;
    http.get(url, function(res) {
//  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
      var chunk = JSON.parse(chunk);
//    console.dir( chunk);
    cb(null, chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
  cb("Failed to converttoBaiduCordo");
});
}

function converttoBaiduAddress(originallat, originallon, cb){
//   var url = "http://api.map.baidu.com/geocoder/v2/?ak=1940c3a3f8baf51693710c8a33910609&location=39.983424,116.322987&output=json&pois=0";
    var url = "http://api.map.baidu.com/geocoder/v2/?ak=1940c3a3f8baf51693710c8a33910609&location=" + 
            originallat + "," + originallon + "&output=json&pois=0";
    http.get(url, function(res) {
  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
      var chunk = JSON.parse(chunk);
    console.dir( chunk);
//    cb(null, chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
//  cb("Failed to converttoBaiduCordo");
});
    
}


//var url = "http://api.map.baidu.com/geocoder/v2/?address=百度大厦&output=json&ak=1940c3a3f8baf51693710c8a33910609";


module.exports = {
    converttoBaiduCord: converttoBaiduCord,
    converttoBaiduAddress:converttoBaiduAddress
};

