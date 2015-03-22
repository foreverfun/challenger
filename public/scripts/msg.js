var clearFormFields = function() {
  $('.msgid').text("");
  $('.msgdate').text("");
  $('.msgchallenger').text("");
  $('.msgchallenged').text("");
  $('.msgplaydate').val("");
  $('.msgplaytime').val(""); 
  $('.msgcourtname').val("");
  $('.msgcourtaddress').val("");
  $('.msgcontent').val("");
}

var viewClosedMessage = function() {
  // no msg can be inserted
  $('.msgcontentl').hide();
  $('.msgcontent').hide();

  // no msg actions can be performed
  $('.updatemsg').hide();
  $('.closemsg').hide();
  
  // data cannot be changed
  $('.msgplaydate').attr('disabled', 'disabled');
  $('.msgplaytime').attr('disabled', 'disabled');
  $('.msgcourtname').attr('disabled', 'disabled');
  $('.msgcourtaddress').attr('disabled', 'disabled');
}

var viewOpenMessage = function() {
  $('.msgcontentl').show();
  $('.msgcontent').show();
  
  $('.updatemsg').show();
  $('.closemsg').show();

  $('.msgplaydate').removeAttr('disabled');
  $('.msgplaytime').removeAttr('disabled');
  $('.msgcourtname').removeAttr('disabled');
  $('.msgcourtaddress').removeAttr('disabled');
}

var receiveAndFormatMessage = function(dataFromServer) {
  // hidden fields - message id & date
  $('.msgid').text(dataFromServer._id);
  $('.msgdate').text(dataFromServer.msgdate);
    
  // challenger
  $('.msgchallenger').text(dataFromServer.invite.name);
  $('.msgchallenger').append(
    '<p><img src="/images4demo/' + 
    dataFromServer.invite.image +  
    '" height="100"/></p>');

  // display challenged info
  $('.msgchallenged').text(dataFromServer.beinvited.name);
  $('.msgchallenged').append(
    '<p><img src="/images4demo/' + 
    dataFromServer.beinvited.image +  
    '" height="100"/></p>');

  // display play date
  $('.msgplaydate').val(dataFromServer.playdate);

  // display play time
  $('.msgplaytime').val(dataFromServer.playtime);

  // display court name
  $('.msgcourtname').val(dataFromServer.courtname);

  // display court location
  $('.msgcourtaddress').val(dataFromServer.courtlocation);

  // previous message area
  var premsg = "";
  for (var i=0; i<dataFromServer.content.length; i++) {
      premsg = premsg + dataFromServer.content[i] +"<br/>";
  }
  $('.msgaddcontent').remove();
  $('.msgprecontent').append("<div class='msgaddcontent'>" + premsg + "</div>");
}

var viewMessage = function(e) {
  e.preventDefault();

  clearFormFields();

  // get the message id
  var originalMsgElement = $(this).closest('.msg');
  var targetId = originalMsgElement.attr('data-msgid');

  // get message info from server
  $.get('/message/'+targetId, function(dataFromServer){
    receiveAndFormatMessage(dataFromServer);

    // open vs. closed msg
    if (dataFromServer.status === "Closed") {
      viewClosedMessage();
    } else {
      viewOpenMessage();
    }
  });

  $('#detailedmsg-modal').modal('show');
}

var getAndFormatMessage = function(status) { 
  var todayDate = new Date();
  var todaydate = todayDate.toDateString();

  var messageData = {
    msgid: $('.msgid').text(),
    msgdate: $('.msgdate').text(),
    courtname: $('.msgcourtname').val(),
    courtaddress: $('.msgcourtaddress').val(),
    playdate: $('.msgplaydate').val(),
    playtime: $('.msgplaytime').val(),
    todaydate: todaydate,
    content: $('.msgcontent').val(),
    status: status
  };

  return messageData;
}

var updateMessage = function(e) {
  e.preventDefault();

  $('#detailedmsg-modal').modal('hide');

  $.post('/msgu', getAndFormatMessage("Open"));
}

var closeMessage = function(e) {
  e.preventDefault();

  $('#detailedmsg-modal').modal('hide');
  
  $.post('/msgu', getAndFormatMessage("Closed"), function(result){
    window.location.reload(true); 
  });

}

$(document).on('ready', function(){
  // open view detailed message modal
  $(document).on('click', '.viewmsg', viewMessage);
  
  // update message
  $('.updatemsg').on('click', updateMessage);

  // end message
  $('.closemsg').on('click', closeMessage);

});