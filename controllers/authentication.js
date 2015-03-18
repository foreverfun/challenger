var passport = require('passport');

var User = require('../models/user');

var performLogin = function(req, res, next, user){
  req.login(user, function(err){
    if(err) {
      //console.log("err:",err);
      //console.log("user:", user);
      return next(err);
    }
    return res.redirect('/');
  });
};

var authenticationController = {
  login: function(req, res){
    res.render('login', {
      error: req.flash('error')
    });
  },

  processLogin: function(req, res, next){
    //console.log("processLogin:", req.body);
    var authFunction = passport.authenticate('local', function(err, user, info){

      if(err) return next(err);

      if(!user) {
        req.flash('error', 'Error logging in.');
        return res.redirect('/auth/login');
      }
      
      performLogin(req, res, next, user);
    });

    authFunction(req, res, next);
  },

  processSignup: function(req, res, next){

    // Seed the database
    require('../models/seeds/userSeed.js');

    //console.log("data from client:", req.body);
    
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      age: req.body.age,
      gender: req.body.gender,
      ntrp: req.body.ntrp,
      location: req.body.location
    });

    user.save(function(err, user){
      if(err) {
        var errorMessage = 'An error occured, please try again';

        if(err.code === 11000){
          errorMessage = 'This user already exists.';
        }

        req.flash('error', errorMessage);
        return res.redirect('/auth/login');
      }

      performLogin(req, res, next, user);
    });
  },

  logout: function(req, res){

    req.logout();

    res.redirect('/auth/login');
  }
};

module.exports = authenticationController;
