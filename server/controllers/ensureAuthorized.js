/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userRoles = require('../client/app/js/routingConfig').userRoles;
var accessLevels = require('../client/app/js/routingConfig').accessLevels;
module.exports = {ensureAuthorized: ensureAuthorized};
var routes = [{path: '/users', accessLevel: accessLevels.admin},
    {path: '/position', accessLevel: accessLevels.admin}];


function ensureAuthorized(req, res, next) {
    var role;
    if (!req.user)
        role = userRoles.public;
    else
        role = req.user.role;

    var accessLevel = _.findWhere(routes, {path: req.route.path}).accessLevel || accessLevels.public;

    if (!(accessLevel.bitMask & role.bitMask))
        return res.send(403);
    return next();
}

