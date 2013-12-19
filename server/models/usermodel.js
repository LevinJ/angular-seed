var async = require('async');
var util = require('util');
var config = require('../config.js');
var db = config.db;



var userCollection=db.collection('userCollection');
//export postCollection
module.exports = userCollection;

///////////////////////////////////////////////////////
//exported methods
///////////////////////////////////////////////////////
db.bind('userCollection', {
	register:function(info, fn){
		var that=this;
		async.waterfall([
		       		  function(callback){
		       			  //ensure the username is not already registered
		       			that.findOne({username: info.username}, function (err, doc) {
		       				if(doc){
		       					callback('用户名已被使用');
		       				} else {
		       					callback(null);
		       				}
		       			});  
		       		  },
		       		  function(callback){
		       			  //ensure the email is not already used
		       			that.findOne({email: info.email}, function (err, doc) {
		       				if(doc){
		       					callback('邮箱已被使用');
		       				} else {
		       					callback(null);
		       				}
		       			});  
			       	  },
		       		  function(callback){
		       			//insert the register info
			       		that.insert(info, {safe:true}, function(err, docs) {  
		       				callback(err, docs);  	   	  
		       			 });
		       		  }],
		       		function (err, result) {
						// result now equals 'done'
						fn(err, result);
					});	
	},
	login:function(info, fn){
		var that=this;
		async.waterfall([
		       		  function(callback){
		       			  //verify the user name is in it
		       			that.findOne({username: info.username}, function (err, doc) {
		       				if(doc){
		       					callback(null);		       					
		       				} else {
		       					callback('该用户名不存在');
		       				}
		       			});  
		       		  },
		       		  function(callback){
		       			  //ensure the email is not already used
		       			that.findOne({username: info.username,password: info.password}, function (err, doc) {
		       				if(doc){
		       					callback(null, doc);		       					
		       				} else {
		       					callback('密码错误');
		       				}
		       			});  
			       	  }],
		       		function (err, result) {
						// result now equals 'done'
						fn(err, result);
					});	
	},
	addCredits:function(username, credits, fn){
		this.findAndModify({username: username}, 
				[['_id', 1]],{$inc : {"credits":credits}}, {"new":true, upsert:true, safe:true}, function(err, doc){		
					if(fn){
						fn(err, doc);
					}
		});
	},
	getUser:function(username, fn){
		this.findOne({username: username}, function (err, doc) {
				fn(err,doc);
		});  
	},
        deleteUser:function(username, fn){
		this.findOne({username: username}, function (err, doc) {
				fn(err,doc);
		});  
	}
});




