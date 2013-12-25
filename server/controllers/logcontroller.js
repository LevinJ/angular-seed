/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var collection = require('../models/logmodel.js').logs;


module.exports = function(app) {

    app.post('/logs', function(req, res,next) {
        //validation of data is required to be added later on
        collection.insertData(req.body, function(err, result){
          res.send({err:err, result:result});       
        });
    }); 
    
    app.get('/logs', function(req, res) {
         var queryParams = {username:req.query.username};
        collection.queryDataByuser(queryParams,function(err, result) {
            res.send({err: err,
                result: result});
        });

    });
    
};
