var User = require('../models/user');

var filterController = {

  filterPlayers: function(req, res){
    //console.log(req.body);
    var index;
    // var requirementStr = requirementStr = "ntrp: {$in:" + req.body.ntrp +"},location:" + req.body.location + "}";
      
    // if ((req.body.gender === "male") || (req.body.gender == "female"))
    //   requirementStr = '{gender:"' + req.body.gender + '", ntrp: {$in:{' + req.body.ntrp +'}}', 'location:' + req.body.location + '"}}';

    // console.log(requirementStr);
    
    // User.find(requirementStr, function(err, usersFromDB) {
    //         for (var i=0; i<usersFromDB.length; i++) {
    //           if (usersFromDB[i].username === req.user.username) {
    //             index = i;
    //             usersFromDB.splice(index,1);
    //             break;
    //           }
    //         }
    //         res.send({players:usersFromDB});
    // });


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