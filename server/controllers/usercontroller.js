/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var userCollection = require('../models/usermodel.js');
var passport =  require('passport');

module.exports = function(app) {

    app.get('/user', function(req, res) {
        res.send({helloword: "get hello world from nodejs"});
    });
    app.post('/logout', function(req, res) {
         req.logout();
         res.send(200);
    });
    app.post('/register', function(req, res,next) {
        userCollection.register(req.body, function(err, result){
           if(!result){
               return  res.send(400, err);
           }
               var user = result[0];
                req.logIn(user, function(err) {
                if(err){ 
                    return next(err);
                } else{
                    res.json(200, { "role": user.role, "username": user.username });
                }
                });
         
                 
        });
    }); 
    app.post('/login', function(req, res,next) {
          passport.authenticate('local', function(err, user,message) {

            if(err)     { return next(err); }
            if(!user)   { 
                return res.send(400, message.message); }


            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }

                if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 360*10;
                res.json(200, { "role": user.role, "username": user.username });
            });
        })(req, res, next);
    }); 

    
};
