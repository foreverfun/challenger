var User = require('../models/user');

var filterController = {
  filterPlayers: function(req, res){
    var index;

    if (req.body.gender === "any") {
      User.find({
        ntrp: {$in:req.body.ntrp},
        location:req.body.location}, function(err, usersFromDB) {
          for (var i=0; i<usersFromDB.length; i++) {
            if (usersFromDB[i].username === req.user.username) {
              index = i;
              usersFromDB.splice(index,1);
              break;
            }
          }
        res.send({players:usersFromDB});
      });
    } else {
      User.find({
        gender: req.body.gender,
        ntrp: {$in:req.body.ntrp},
        location:req.body.location}, function(err, usersFromDB) {
          //console.log("gender:", usersFromDB);
          for (var i=0; i<usersFromDB.length; i++) {
            if (usersFromDB[i].username === req.user.username) {
              index = i;
              usersFromDB.splice(index,1);
              break;
            }
          }
        res.send({players:usersFromDB});
      });
    }
  }
};

// Export our index control
module.exports = filterController;