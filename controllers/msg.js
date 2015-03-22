var User = require('../models/user');
var Message = require('../models/message');
//==============================================

// use config file
// var config = require('../config/email');
// var sendgrid = require('sendgrid')(config.emailAccount, config.emailPassword);

// use the environment variables if run on heroku
// use the config file if run on localhost 

var config;

if(process.env.EMAIL_ACCOUNT) {
  config = {
    emailAccount: process.env.EMAIL_ACCOUNT,
    emailPassword: process.env.EMAIL_PASSWORD
  };
} else {
  config = require('../config/email');  
}

var sendgrid = require('sendgrid')(
  process.env.EMAIL_ACCOUNT || config.emailAccount, 
  process.env.EMAIL_PASSWORD || config.emailPassword);

//==============================================
var compileMsg = function(req, type) {
  var returnMsg = req.body.todaydate + " - " + 
      req.user.name + " : " + 
      req.body.content;

  if (type) {
    return returnMsg;
  } else {
    return returnMsg + " {End} ";
  }
}

//==============================================
var sendEmail = function(msg) {
  var website = "http://tchallenger.herokuapp.com";

  var emailsubject = msg.invite.name + 
    " is inviting you to play tennis on " 
    + msg.playdate;
  
  var emailbody = "Court Name: " + msg.courtname + "\n\r" + 
    "Court Location: " + msg.courtlocation + "\n\r" + 
    "Date: " + msg.playdate + "\n\r" +
    "Time: " + msg.playtime + "\n\r\n\r" + 
    msg.content + "\n\r\n\r" + 
    website;

  // console.log("subject:", emailsubject);
  // console.log("body:", emailbody);

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

  sendgrid.send({
    to: msg.invite.email,
    from: msg.beinvited.email,
    subject: emailsubject,
    text: emailbody}, function(err, result) {
      if (err) {
        return "email failed!";
      } else {
        return "email send!";
      }
  });
}

var msgController = {

  // Display Messages
  displayMsgs: function(req, res){
    Message.find({}, function(err, msgsFromDB) {
      if (err) console.log("err");
      // only disply current user's messages
      var msgsFromDBFilter = [];
      for (var i=0; i<msgsFromDB.length; i++) {
        if ((msgsFromDB[i].invite.name === req.user.name) || (msgsFromDB[i].beinvited.name === req.user.name)) {
          msgsFromDBFilter.push(msgsFromDB[i]);
        }
      }
      // show the messagaes on messages page
      res.render("messages",{
        user: req.user,
        msgs:msgsFromDBFilter
      });
    });
  },

  // Display A Message
  displayMsg: function(req, res) {
    var msgid = req.params.id;
    // get the data from database
    Message.findById(msgid, function(err, result){
      // send the data to client site
      res.send(result);
    });
  },

  saveMsg: function(req, res) {
    User.findById(req.body.playerid, function(err, result){
      var msg = {
        invite: req.user,
        beinvited: result,
        courtname: req.body.courtname,
        courtlocation: req.body.courtaddress,
        playdate: req.body.playdate,
        playtime: req.body.playtime,
        msgdate: req.body.todaydate,
        content: compileMsg(req, 1),
        status: req.body.status
      };

      // save to message collection
      var msgDB = new Message(msg);
      msgDB.save();

      // send email to notify 
      sendEmail(msg);    

      res.send("success");
    });
  },

  updateMsg: function(req, res) {
    var messageLog;

    Message.findById(req.body.msgid, function(err, result){       
      if (req.body.status === "Open") {
        messageLog = compileMsg(req, 1);
      } else {
        messageLog = compileMsg(req, 0);
      }

      result.content.push(messageLog);
      req.body.content = result.content;

      Message.update({_id:req.body.msgid}, req.body, function(err) {});
    
      var msg = {
          invite: req.user,
          beinvited: result.beinvited,
          courtname: result.courtname,
          courtlocation: result.courtlocation,
          playdate: result.playdate,
          playtime: result.playtime,
          msgdate: result.todaydate,
          content: messageLog,
          status: result.status
      };
      
      sendEmail(msg);

      res.send("success");
    });
    
  }
};

module.exports = msgController;