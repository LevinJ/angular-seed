/**
 * Middlewares
 */
module.exports = function (app) {
  return {
    allowCrossDomain: function (req, res, next) {
      // Added other domains you want the server to give access to
      // WARNING - Be careful with what origins you give access to
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', "*");
      res.header("Access-Control-Max-Age", 1728000);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      var reqallowedHead=req.headers["access-control-request-headers"];
      if(reqallowedHead){
        res.header('Access-Control-Allow-Headers', reqallowedHead);
      }
      // res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
      next();
    },
    userAuthentication: function (req, res, next) {
        if(!req.session.user){
        	if(req.cookies.user){
        		req.session.user = req.cookies.user;
        	}
        }
        next();
      }
  };
};
