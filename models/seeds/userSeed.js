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
      email: "fiona@abc.com",
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

    var userDemo1 = new User({
      username: "Demo1",
      password:  "1234",
      name: "Demo1 Demo",
      email: "demo1@demo.com",
      image: "tennisball.jpeg",
      age: 35,
      gender: "female",
      ntrp: 3.5,
      location: "Los Angeles CA"
    });
    userDemo1.save();

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
      email: "forever.fun.cj@gyahoo.com",
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


    var userDemo2 = new User({
      username: "Demo2",
      password:  "1234",
      name: "Demo2 Demo",
      email: "demo2@demo.com",
      image: "tennisball.jpeg",
      age: 23,
      gender: "female",
      ntrp: 4.5,
      location: "Los Angeles CA"
    });
    userDemo2.save();
    
    /*
    var userDemo3 = new User({
      username: "Demo3",
      password:  "1234",
      name: "Demo3 Demo",
      email: "demo3@demo.com",
      image: "tennisball.jpeg",
      age: 48,
      gender: "male",
      ntrp: 2.5,
      location: "Los Angeles CA"
    });
    userDemo3.save();
  
    var userDemo4 = new User({
      username: "Demo4",
      password:  "1234",
      name: "Demo4 Demo",
      email: "demo4@demo.com",
      image: "tennisball.jpeg",
      age: 65,
      gender: "male",
      ntrp: 3.5,
      location: "Los Angeles CA"
    });
    userDemo4.save();

    var userDemo5 = new User({
      username: "Demo5",
      password:  "1234",
      name: "Demo5 Demo",
      email: "demo5@demo.com",
      image: "tennisball.jpeg",
      age: 37,
      gender: "male",
      ntrp: 4.0,
      location: "Los Angeles CA"
    });
    userDemo5.save();
  
    var userDemo6 = new User({
      username: "Demo6",
      password:  "1234",
      name: "Demo6 Demo",
      email: "demo6@demo.com",
      image: "tennisball.jpeg",
      age: 60,
      gender: "female",
      ntrp: 4.5,
      location: "Boulder CO"
    });
    userDemo6.save();

    var userDemo7 = new User({
      username: "Demo7",
      password:  "1234",
      name: "Demo7 Demo",
      email: "demo7@demo.com",
      image: "tennisball.jpeg",
      age: 55,
      gender: "male",
      ntrp: 4.0,
      location: "Boulder CO"
    });
    userDemo7.save();

    var userDemo8 = new User({
      username: "Demo8",
      password:  "1234",
      name: "Demo8 Demo",
      email: "demo8@demo.com",
      image: "tennisball.jpeg",
      age: 42,
      gender: "female",
      ntrp: 3.5,
      location: "Boulder CO"
    });
    userDemo8.save();
  
    var userDemo9 = new User({
      username: "Demo9",
      password:  "1234",
      name: "Demo9 Demo",
      email: "demo9@demo.com",
      image: "tennisball.jpeg",
      age: 38,
      gender: "male",
      ntrp: 3.0,
      location: "Boulder CO"
    });
    userDemo9.save();

    var userDemo10 = new User({
      username: "Demo10",
      password:  "1234",
      name: "Demo10 Demo",
      email: "demo10@demo.com",
      image: "tennisball.jpeg",
      age: 22,
      gender: "male",
      ntrp: 2.5,
      location: "Boulder CO"
    });
    userDemo10.save(); 
    */
  }
});