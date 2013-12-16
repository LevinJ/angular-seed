/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoskin = require('mongoskin');
var db = mongoskin.db('localhost:27017/geotrackerdb?auto_reconnect=true', {safe: true});
var async = require('async');

module.exports=db;
db.bind('positions', {
    qeuryTrackingList: function(queryParams, cb) {
        var query = {user:queryParams.username,
            submitDate:{$gte: queryParams.starttime, $lt: queryParams.endtime}};
        this.find(query).toArray(function(err, result) {
            cb(err, result);
            console.dir(err);
            console.dir(result);
        });
    },
    insertTrackinglist: function(postData, cb) {
        
        db.collection('test').findAndModify(
  {hello: 'world'}, // query
  [['_id','asc']],  // sort order
  {$set: {hi: 'there'}}, // replacement, replaces only the field "hi"
  {}, // options
  function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
  });
    }
}
);
//var queryParams = {};
//queryParams.username = "user";
//queryParams.starttime = new Date(2010, 3, 1);
//queryParams.endtime = new Date(2015, 4, 1);
//db.positions.qeuryPositions(queryParams,function(){});

//db.positions.insertPosition({vow2:"hello2"},function(){});
//
//db.positions.qeuryPositions(function(){});

var postData={user:'user1',trackinglist:['user2']};
db.positions.insertTrackinglist({vow:"hello"},function(){});