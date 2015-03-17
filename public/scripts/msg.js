var clearFields = function() {
  $('.msgcontent').val(""); 
}

// ==============================================

var renderMsgData = function(data) {
  var imagePath = "/images4demo/";
  var premsg = "";

  // msg id: hidden field
  $('.msgid').text(data._id); 
  // msg date
  $('.msgdate').text(data.msgdate);
  // challenger
  $('.msgchallenger').text(data.invite.name);
  $('.msgchallenger').append('<p><img src="' + imagePath + data.invite.image +  '" height="100"/></p>');
  // challenged
  $('.msgchallenged').text(data.beinvited.name);
  $('.msgchallenged').append('<p><img src="'+ imagePath + data.beinvited.image + '" height="100"/></p>');
  // date & time
  $('.msgplaydate').val(data.playdate);
  $('.msgplaytime').val(data.playtime);
  // name & address
  $('.msgcourtname').val(data.courtname);
  $('.msgcourtaddress').val(data.courtlocation);
  // previous conversation
  for (var i=0; i<data.content.length; i++) {
      premsg = premsg + data.content[i] +"<br/><br/>";
  }
  $('.msgaddcontent').remove();
  $('.msgprecontent').append("<div class='msgaddcontent'>" + premsg + "</div>");
}

// ==============================================
var compileMsgData = function(status) {
 
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

// ==============================================
var viewMessage = function(e) {
  
  e.preventDefault();

  clearFields();

  var originalMsgElement = $(this).closest('.msg');
  var targetId = originalMsgElement.attr('data-msgid');

  $.get('/message/'+targetId, function(dataFromServer){
    renderMsgData(dataFromServer);
    if (dataFromServer.status ==="Closed") {
      $('#closedmsg-modal').modal('show');
    }
    else {
      $('#detailedmsg-modal').modal('show');  
    }
  });
}

// ==============================================
var updateMessage = function(e) {
  e.preventDefault();

  $('#detailedmsg-modal').modal('hide');

  $.post('/msgu', compileMsgData("Open"));

  clearFields();

}

var closeMessage = function(e) {
  e.preventDefault();

  $('#closedmsg-modal').modal('hide');

  $.post('/msgu', compileMsgData("Closed"));

  clearFields();
}

$(document).on('ready', function(){
  // open view detailed message modal
  $(document).on('click', '.viewmsg', viewMessage);
  
  // click update message button in modal
  $('.updatemsg').on('click', updateMessage);

  // click close message button in modal
  $('.closemsg').on('click', closeMessage);

});