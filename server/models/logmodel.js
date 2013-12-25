/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = require('../config.js');
var db = config.db;

module.exports=db;
db.bind('logs', {
    queryDataByuser: function(queryParams, cb) {
        var queryParams = {username:queryParams.username};
        this.find(queryParams).toArray(function(err, result) {
            cb(err, result);
        });
    },
    queryDataByuserandlevel: function(queryParams, cb) {
        var queryParams = {username:queryParams.username,
        'log.loglevel':queryParams.log.loglevel};
        this.find(queryParams).toArray(function(err, result) {
            cb(err, result);
        });
    },
    insertData: function(data, cb) {
        this.insert(data, function(err, result) {
            cb(err, result);
        });
    },
    removeAll:function(fn){
		this.remove({}, function (err, doc) {
				fn(err,doc);
		});  
	}
}
);