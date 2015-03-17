var User = require('../models/user');

var indexController = {

  index: function(req, res){

    User.find({location:req.user.location}, function(err, usersFromDB) {
      //console.log(usersFromDB);
      var index;
      for (var i=0; i<usersFromDB.length; i++) {
        if (usersFromDB[i].email === req.user.email) {
          index = i;
          break;
        }
      }

      usersFromDB.splice(index,1);

      //console.log(usersFromDB);

      res.render('index', {
        user: req.user,
        players: usersFromDB
      });
    });
  }
};

// Export our index control
module.exports = indexController;