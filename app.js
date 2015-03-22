var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // Connect to the database

// passport
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');

var indexController = require('./controllers/index');
var authenticationController = require('./controllers/authentication');
var playerController = require('./controllers/player');
var signupController = require('./controllers/signup');
var profileController = require('./controllers/profile');
var filterController = require('./controllers/filter');
var msgController = require('./controllers/msg');

//======================================================================
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// for angular or backbone json data 
// app.use(bodyParser.json());
// bodyParser is set to false, will not take array data
// app.use(bodyParser.urlencoded({extended: false}));
// bodyParser is set to false, will take array data
app.use(bodyParser.urlencoded({extended: true}));

// passport
app.use(cookieParser());
app.use(flash());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// connect to player database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tennis');
// Seed the database
require('./models/seeds/userSeed.js');

// new player sign up
app.get('/signup', signupController.signup);

//passport
app.get('/auth/login', authenticationController.login);
app.post('/auth/login', authenticationController.processLogin);
app.post('/auth/signup', authenticationController.processSignup);
app.get('/auth/logout', authenticationController.logout);

// passport
app.use(passportConfig.ensureAuthenticated);

app.get('/', indexController.index);
app.get('/player/:id', playerController.displayPlayer);
app.get('/profile', profileController.account);
app.get('/messages', msgController.displayMsgs);
app.get('/message/:id', msgController.displayMsg);


app.post('/filterplayers', filterController.filterPlayers);
// app.post('/msgn', msgController.newMsg);
// app.post('/msgu', msgController.updateMsg);

app.post('/msg', msgController.saveMsg);
app.post('/msgu', msgController.updateMsg);
//app.post('/msgc', msgController.closeMsg);
// Start our server!
var port = process.env.PORT || 7152;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
