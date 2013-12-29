/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = require('../config.js');
var db = config.db;

module.exports=db;
db.bind('positions', {
    qeuryPositions: function(queryParams, cb) {
        var query = {user:queryParams.username,
            submitDate:{$gte: queryParams.starttime, $lt: queryParams.endtime}};
        this.find(query).toArray(function(err, result) {
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
    },
    removeAll:function(fn){
		this.remove({}, function (err, doc) {
				fn(err,doc);
		});  
	}

}
);
//var queryParams = {};
//queryParams.username = "user";
//queryParams.starttime = new Date(2010, 3, 1);
//queryParams.endtime = new Date(2015, 4, 1);
//db.positions.qeuryPositions(queryParams,function(){});
//db.positions.insertPosition({vow:"hello"},function(){});
//db.positions.insertPosition({vow2:"hello2"},function(){});
//
//db.positions.qeuryPositions(function(){});