/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoskin = require('mongoskin');
var db = mongoskin.db('localhost:27017/geotrackerdb?auto_reconnect=true', {safe: true});

module.exports=db;
db.bind('positions', {
    qeuryPositions: function(cb) {
        this.find().toArray(function(err, result) {
            cb(err, result);
            console.dir(err);
            console.dir(result);
        });
    },
    insertPosition: function(position, cb) {
        this.insert(position, function(err, result) {
            cb(err, result);
            console.dir(err);
            console.dir(result);
        });
    }
}
);

//db.positions.insertPosition({vow:"hello"},function(){});
//db.positions.insertPosition({vow2:"hello2"},function(){});
//
//db.positions.qeuryPositions(function(){});