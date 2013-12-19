/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var userCollection = require('../models/usermodel.js');
module.exports = function(app) {

    app.get('/user', function(req, res) {
        res.send({helloword: "get hello world from nodejs"});
    });
    app.put('/user', function(req, res) {
        res.send({helloword: "put hello world from nodejs"});
    });
    app.post('/register', function(req, res) {
        userCollection.register(req.body, function(err, result){
            res.send({err:err, result:result});
        });
    }); 
    app.post('/login', function(req, res) {
        userCollection.login(req.body, function(err, result){
            //set the right cookie
            if(!err){
                if(req.body.rememberme){
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 360*10;
                }
            }
            res.send({err:err, result:result});
        });
    }); 

    
};
