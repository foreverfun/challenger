var profileController = {
  account: function(req, res){
    //res.redirect('/signup');
    res.render('profile', {
      user: req.user
    }); 
  }
};

module.exports = profileController;