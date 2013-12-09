/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var db = mongoskin.db('localhost:27017/geotrackerdb?auto_reconnect=true');


db.bind('positions', {
  findTop10 : function (fn) {
   this.find({}, {limit:10, sort:[['views', -1]]}).toArray(fn);
  },
  removeTagWith : function (tag, fn) {
   this.remove({tags:tag},fn);
  }
 } 
})