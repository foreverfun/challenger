var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 18,
    max: 100
  },
  gender: {
    type: String
  },
  ntrp: {
    type: Number,
    required: true
  },
  location: {
    type: String
  }
});

userSchema.pre('save', function(next){

  if(!this.isModified('password')) return next();

  var user = this;

  bcrypt.genSalt(10, function(err, salt){

    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){

      if(err) return next(err);

      user.password = hash;

      return next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, next){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) return next(err);

    return next(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);