var User = require('../models/user');
var Message = require('../models/message');
//var config = require('../config/email');

var config;

if(process.env.EMAIL_ACCOUNT) {
  config = {
    emailAccount: process.env.EMAIL_ACCOUNT,
    emailPassword: process.env.EMAIL_PASSWORD
  };
} else {
  config = require('../config/email');  
}


// var sendgrid = require('sendgrid')(config.emailAccount, config.emailPassword);

var sendgrid = require('sendgrid')(
  process.env.EMAIL_ACCOUNT || config.emailAccount, 
  process.env.EMAIL_PASSWORD || config.emailPassword);

var sendEmail = function(msg) {
  var website = "http://www.challenger.com";

  var emailsubject = msg.invite.name + 
    " is inviting you to play tennis on " 
    + msg.playdate;
  
  var emailbody = "Court Name: " + msg.courtname + "\n\r" + 
    "Court Location: " + msg.courtlocation + "\n\r" + 
    "Date: " + msg.playdate + "\n\r" +
    "Time: " + msg.playtime + "\n\r\n\r" + 
    msg.content + "\n\r\n\r" + 
    website;

  //console.log(emailbody);

  sendgrid.send({
    to: msg.beinvited.email,
    from: msg.invite.email,
    subject: emailsubject,
    text: emailbody}, function(err, result) {
      if (err) {
        return "email failed!";
      } else {
        return "email send!";
      }
  });
}

var updateMsgDB = function(req) {
  var messageLog = req.body.todaydate + " - " + req.user.name + " : " + req.body.content;

  if (req.body.status === "Closed")
    messageLog = messageLog + " {End} "

  // find the previous content from the database
  Message.findOne({_id:req.body.msgid}, function(err, result){
    // attached the new message
    result.content.push(messageLog);
    // update the content in req.body
    req.body.content = result.content;
    // update the msg with req.body 
    Message.update({_id:req.body.msgid}, req.body, function(err) {
      
      var msg = {
        invite: req.user,
        beinvited: result,
        courtname: req.body.courtname,
        courtlocation: req.body.courtaddress,
        playdate: req.body.playdate,
        playtime: req.body.playtime,
        msgdate: req.body.todaydate,
        content: messageLog,
        status: req.body.status
      }; 

      sendEmail(msg);
    });
  });
}

var msgController = {

  // Display Messages
  displayMsgs: function(req, res){
    Message.find({}, function(err, msgsFromDB) {
      if (err)
        console.log("err");
      
      // only disply current user's messages
      var msgsFromDBFilter = [];

      for (var i=0; i<msgsFromDB.length; i++) {
        if ((msgsFromDB[i].invite.name === req.user.name) || (msgsFromDB[i].beinvited.name === req.user.name)) {
          msgsFromDBFilter.push(msgsFromDB[i]);
        }
      }
      
      res.render("messages",{
        user: req.user,
        msgs:msgsFromDBFilter
      });
    });
  },

  // Display A Message
  displayMsg: function(req, res) {
    var msgid = req.params.id;
    Message.findById(msgid, function(err, result){
      res.send(result);
    });
  },

saveMsg: function(req, res) {

    //User.findOne({_id:req.body.playerid}, function(err, result){
    User.findById(req.body.playerid, function(err, result){
      
      var messageLog = req.body.todaydate + " - " + req.user.name + " : " + req.body.content;

      var msg = {
        invite: req.user,
        beinvited: result,
        courtname: req.body.courtname,
        courtlocation: req.body.courtaddress,
        playdate: req.body.playdate,
        playtime: req.body.playtime,
        msgdate: req.body.todaydate,
        content: messageLog,
        status: req.body.status
      };

      // send email to notify 
      sendEmail(msg);    

      // save to message collection
      var msgDB = new Message(msg);
      msgDB.save();

      //res.redirect("/messages");
      res.send("success");

    });
  },

  updateMsg: function(req, res) {

    var messageLog = req.body.todaydate + " - " + req.user.name + " : " + req.body.content;    
    
    Message.findById(req.body.msgid, function(err, result){       
      result.content.push(messageLog);
      req.body.content = result.content;
      Message.update({_id:req.body.msgid}, req.body, function(err) {
      });

    });
    
  },

  closeMsg: function(req, res) {
    var messageLog = req.body.todaydate + " - " + req.user.name + " : " + req.body.content + "{ END }";  
    Message.findById(req.body.msgid, function(err, result){
      result.content.push(messageLog);
      req.body.content = result.content;
      Message.update({_id:req.body.msgid}, req.body, function(err) {
        res.send("success");});
    });
  }
};

module.exports = msgController;