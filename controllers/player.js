var User = require('../models/user');

var playerController = {
  displayPlayer: function(req, res) {
    var playerid = req.params.id;
    //console.log(playerid);
    User.findById(playerid, function(err,result){
      res.send(result);
    });
  }
};

module.exports = playerController;