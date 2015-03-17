$(document).on('ready', function() {
  
  $('.profile-save').on('click', function(e){
    
    e.preventDefault();
    
    var id = $('.profile-userid').val();
    var username = $('.profile-username').val();
    var name = $('.profile-name').val();
    var email = $('.profile-email').val();
    var age = $('.profile-age').val();
    var gender = $('.profile-gender').val();
    var ntrp = $('.profile-ntrp').val();
    var location = $('.profile-location').val();

    //var temp = id + " " + username;
    //console.log(temp);
    
  });
});