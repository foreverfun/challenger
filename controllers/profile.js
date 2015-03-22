var profileController = {
  account: function(req, res){
    res.render('profile', {
      user: req.user
    }); 
  }
};

module.exports = profileController;