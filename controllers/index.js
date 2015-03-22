var User = require('../models/user');

var indexController = {

  index: function(req, res){

    User.find({location:req.user.location}, function(err, usersFromDB) {
      var index;
      for (var i=0; i<usersFromDB.length; i++) {
        if (usersFromDB[i].email === req.user.email) {
          index = i;
          break;
        }
      }
      usersFromDB.splice(index,1);
      res.render('index', {
        user: req.user,
        players: usersFromDB
      });
    });
  }
};

module.exports = indexController;