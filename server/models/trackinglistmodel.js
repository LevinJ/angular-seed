/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = require('../config.js');
var db = config.db;


db.bind('trackinglist', {
    qeuryTrackingList: function(queryParams, cb) {
        var query = {user: queryParams.user};
        this.findOne(query, function(err, result) {
            
//            console.dir(err);
//            console.dir(result);
            cb(err, result);
        });
    },
    insertTrackinglist: function(postData, cb) {
        //it's not allowed to update id
        delete postData._id;
        this.findAndModify(
                {user: postData.user}, // query
        [['_id', 'asc']], // sort order
                postData, // replacement, replaces only the field "hi"
        {upsert:true,new:true}, // options
                function(err, result) {
                    console.log(result);
                    console.log(result);
                    cb(err,result);
                });
    }
}
);
    
module.exports = db.trackinglist;    

//var postData = {user: 'user1', trackinglist: ['user2','user1']};
//db.trackinglist.insertTrackinglist(postData, function() {
//});
//
//queryParams={};
//queryParams.user = "user1";
//db.trackinglist.qeuryTrackingList(queryParams, function() {
//});
