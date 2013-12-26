/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var unittestenv = false;


var mongoskin = require('mongoskin');
var dbConnection;
if(unittestenv){
   dbConnection = mongoskin.db('localhost:27017/geotrackerdb_test?auto_reconnect=true', {safe: true});
}else{
    dbConnection = mongoskin.db('localhost:27017/geotrackerdb?auto_reconnect=true', {safe: true});
}
module.exports = {
db:  dbConnection,
testhost:'http://localhost:8002',
unittestenv:unittestenv
};


