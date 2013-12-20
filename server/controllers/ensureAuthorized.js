/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userRoles = require('../../client/app/js/routingConfig').userRoles;
var accessLevels = require('../../client/app/js/routingConfig').accessLevels;
var userCollection = require('../models/usermodel.js');
var _ = require('underscore');
var url = require("url");
module.exports = {ensureAuthorized: ensureAuthorized,
    localStrategy: new LocalStrategy(
        function(username, password, done) {
            userCollection.login({username:'username', password:'password'}, function(err, docs) {

            done();
        });
            var user = module.exports.findByUsername(username);

            if(!user) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else if(user.password != password) {
                done(null, false, { message: 'Incorrect username.' });
            }
            else {
                return done(null, user);
            }

        }
    ),
    serializeUser: function(user, done) {
        done(null, user.username);
        
    },

    deserializeUser: function(id, done) {
        userCollection.getUser(id, function(err, result) {
            if(result){
                done(null, user);
            }else{
                done(null, false);
            }
        });
    }};



var routes = [{path: '/users', accessLevel: accessLevels.admin},
    {path: '/position', accessLevel: accessLevels.user},
    {path: '/trackinglist', accessLevel: accessLevels.user}];


function ensureAuthorized(req, res, next) {
    var role;
    if (!req.user){
        role = userRoles.public;
    }
    else{
        role = req.user.role;
    }
    var pathname = url.parse(req.url).pathname;
    var route = _.findWhere(routes, {path: pathname});
    if (!route) {
        //if this route is not restricted at all
        return next();
    }
    var accessLevel = route.accessLevel;

    if (!(accessLevel.bitMask & role.bitMask))
        return res.send(403);
    return next();
}

