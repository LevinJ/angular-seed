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
  console.log("Got response: " + res.statusCode);
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



module.exports = {
    converttoBaiduCord: converttoBaiduCord
};

