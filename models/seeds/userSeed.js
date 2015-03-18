var User = require('../user');

User.find({}, function(err, documents){
  //console.log(documents.length);
  if (documents.length === 0) {
    var userElsa = new User({
      username: "Frozen",
      password:  "1234",
      name: "Else Black",
      email: "elsefrozen@yahoo.com",
      image: "elsa.jpg",
      age: 38,
      gender: "female",
      ntrp: 2.5,
      location: "Boulder CO"
    });
    userElsa.save();

    var userBelle = new User({
      username: "Beauty",
      password:  "1234",
      name: "Belle Johnson",
      email: "bellebeauty@gmail.com",
      image: "belle.jpg",
      age: 25,
      gender: "female",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userBelle.save();

    var userFiona = new User({
      username: "Green",
      password:  "1234",
      name: "Fiona Smith",
      email: "foreverfun7@gmail.com",
      image: "fiona.jpeg",
      age: 42,
      gender: "female",
      ntrp: 3.5,
      location: "Boulder CO"
    });
    userFiona.save();

    var userAriel = new User({
      username: "Mermaid",
      password:  "1234",
      name: "Ariel Jones",
      email: "arielmermaid@yahoo.com",
      image: "ariel.jpeg",
      age: 22,
      gender: "female",
      ntrp: 4.0,
      location: "Los Angeles CA"
    });
    userAriel.save(); 

    var userUrsula = new User({
      username: "Octopus",
      password:  "1234",
      name: "Ursula Brown",
      email: "ursulaoctopus@gmail.com",
      image: "ursula.jpeg",
      age: 58,
      gender: "female",
      ntrp: 3.0,
      location: "Los Angeles CA"
    });
    userUrsula.save();


    var userShrek = new User({
      username: "Shrek",
      password:  "1234",
      name: "Shrek Davis",
      email: "foreverfun7@gmail.com",
      image: "shrek.jpeg",
      age: 45,
      gender: "male",
      ntrp: 3.5,
      location: "Los Angeles CA"
    });
    userShrek.save();

    var userHomer = new User({
      username: "Homer",
      password:  "1234",
      name: "Homer Simpson",
      email: "forever.fun.cj@gmail.com",
      image: "homer.jpg",
      age: 32,
      gender: "male",
      ntrp: 2.5,
      location: "Los Angeles CA"
    });
    userHomer.save();

    var userBatman = new User({
      username: "Batman",
      password:  "1234",
      name: "Batman Miller",
      email: "batmanmiller@gyahoo.com",
      image: "batman.jpeg",
      age: 28,
      gender: "male",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userBatman.save();

    var userPikcachu = new User({
      username: "Pikachu",
      password:  "1234",
      name: "Pikachu Go",
      email: "pkachugo@live.com",
      image: "pikachu.jpeg",
      age: 22,
      gender: "male",
      ntrp: 3.0,
      location: "Boulder CO"
    });
    userPikcachu.save();

    var userSpiderman = new User({
      username: "Spiderman",
      password:  "1234",
      name: "Spider Harris",
      email: "spiderharris@gmail.com",
      image: "spiderman.jpeg",
      age: 48,
      gender: "male",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userSpiderman.save();
  }
});