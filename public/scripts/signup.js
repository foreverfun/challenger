// formValidation
// check all data in the sign up form
// make sure all fields are filled
var formValidation = function() {
  var username = $('.signup-username').val();
  var password = $('.signup-password').val();
  var name = $('.signup-name').val();
  var email = $('.signup-email').val();
  var age = parseInt($('.signup-age').val());
  var gender = $('input[name="gender"]:checked').val(); 
  var ntrp = parseFloat($('.signup-ntrp').val());
  var city = $('.signup-city').val(); 
  var state = $('.signup-state').val();

  if (!username.length) 
      return "Username is required!";
  if (!password.length)
      return "Password is required!";
  if (!name.length)
      return "Name is required!";
  if (!email.length)
      return "Email is required!";
  if (!age)
      return "You must be over 18 years old to use this site!"
  if (!gender)
      return "Gender is required!"
  if (!ntrp)
      return "NTRP is required!"
  if (!city.length)
      return "City is required!"
  if (!state.length)
      return "State is required!"
  return 1;
}

//============================================================
$(document).on('ready', function() {
  
  $('.signup').on('click', function(e){
    e.preventDefault();
 
    var returnResult = formValidation();
    //console.log(returnResult);

    if (returnResult != 1) {
      $('.errmsg').val("Error: " + returnResult);
    } else {
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
        
      $.post('/auth/signup', signupData, function(result) {
          window.location.pathname="/";
      });
    }
  });
});