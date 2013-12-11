var express =       require('express')
    , http =        require('http')
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');

var app = module.exports = express();

//app.set('views', __dirname + '/client/app');
//app.set('view engine', 'jade');
var middlewares = require('./middlewares.js')(app);
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.bodyParser());
app.use(middlewares.allowCrossDomain);
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client/app')));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);
//passport.use(User.twitterStrategy());  // Comment out this line if you don't want to enable login via Twitter
//passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
//passport.use(User.googleStrategy());   // Comment out this line if you don't want to enable login via Google
//passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

//add middleware
app.use(require('./server/controllers/ensureAuthorized.js').ensureAuthorized);
//add router middleware
app.use(app.router);

require('./server/routes.js')(app);
require('./server/controllers/testcontroller.js')(app);
require('./server/controllers/mapcontroller.js')(app);


app.set('port', process.env.PORT || 8002);

//app.listen(8000);
//(function(){
//    console.log("Express server listening on port " + app.get('port'));
//}());
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});