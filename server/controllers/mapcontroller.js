/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var db= require('../models/positionmodel.js');
module.exports = function(app) {

    app.get('/position', function(req, res) {
       db.positions.qeuryPositions(function(err,result){
           res.send({err:err, 
                result:result});
       });
        
    });
   
     app.post('/position', function(req, res) {
         db.positions.insertPosition(req.body,function(err,result){
            res.send({err:err, 
                result:result});
        });
    }); 
    app.delete('/position', function(req, res) {
        res.send({helloword: "delete hello world from nodejs"});
    });
     app.put('/position', function(req, res) {
        res.send({helloword: "put hello world from nodejs"});
    });
    
};

