$(document).on('ready', function() {
  
  $('.signup').on('click', function(e){
    e.preventDefault();

    var signupData = {
        username: $('.signup-username').val(),
        password: $('.signup-password').val(),
        name: $('.signup-name').val(),
        email: $('.signup-email').val(),
        image: "tennisball.jpeg",
        age: parseInt($('.signup-age').val()),
        gender: $('input[name="gender"]:checked').val(),
        ntrp: parseFloat($('.signup-ntrp').val()),
        location: $('.signup-city').val() + " " + $('.signup-state').val(),
    };
    
    $.post('/auth/signup', signupData);

  });
});