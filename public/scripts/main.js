var clearPlayerData = function() {
//$('.playerpic').text(dataFromServer.image);
  $('.player-username').text("");
  $('.player-name').text("");
  $('.player-age').text("");
  $('.player-gender').text("");
  $('.player-ntrp').text("");
  $('.player-location').text("");
}

var displayPlayerData = function(data) {
  $('.playerpic').attr('src', "/images4demo/"+data.image);
  //$('.playerpic').text(dataFromServer.image);
  $('.player-username').text(data.username);
  $('.player-name').text(data.name);
  $('.player-age').text(data.age);
  $('.player-gender').text(data.gender);
  $('.player-ntrp').text(data.ntrp);
  $('.player-location').text(data.location);
}

// =======================================================
var viewPlayer = function(e) {
  e.preventDefault();
  clearPlayerData();

  var originalPlayerElement = $(this).closest('.player');
  var targetId = originalPlayerElement.attr('data-playerid');
  //console.log(targetId);

  // with player id, get data from database
  // display on the view a player dialog box
  $.get('/player/' + targetId, function(dataFromServer){
    //console.log(dataFromServer);
    displayPlayerData(dataFromServer);
  });

  // show view a player dialog box
  $('#viewplayer-modal').modal('show');  
  
};

// =======================================================
// open filter players modal
var showFilterPlayersModal = function() {
    $('#filterplayers-modal').modal('show');
}

// =======================================================
var filterPlayers = function(e) {
  e.preventDefault();

  $('#filterplayers-modal').modal('hide');

  // get data from the filter players form
  var gender = $('.filter-gender').val();
  //console.log(gender);
  
  var ntrp = []; 
  $("input:checkbox[name='ntrp[]']:checked").each(function(){
    ntrp.push($(this).val());  
  });
  //console.log(ntrp);

  var city = $('.filter-city').val();
  //console.log(city);
  
  var state = $('.filter-state').val();
  //console.log(state);

  var location = city + " " + state;

  // form an object 
  var filterrules = {
    gender: gender,
    ntrp: ntrp,
    location: location
  }

    // remove the current players
    $('.players').remove();
    $('.playersid').remove();

  // console.log(filterrules);
  // send to server
  $.post('/filterplayers', filterrules, function(dataFromServer){
    //console.log(dataFromServer);
    //console.log(dataFromServer.players);
    // for (var i=0; i<dataFromServer.players.length; i++) {
    //   console.log(dataFromServer.players[i]);
    // };

    // parse data and display on the screen
    var bplayers = "<div class='playersid'>";
    //var players = "<div class='players'><table class='table table-bordered'></tr>";
    var players = "<div class='players'>";
    for (var i=0; i<dataFromServer.players.length; i++) {
      bplayers = bplayers + 
        "<div class='playerid'><input value='" + 
        dataFromServer.players[i]._id + 
        "' class='playeridvalue form-control'></div>";
      
      players = players + 
        "<div class='column fifth'><div class='player' data-playerid='" +  dataFromServer.players[i]._id + "'>" +
        "<img src='/images4demo/" +dataFromServer.players[i].image+ "' height='100px'/><br/>" + 
        "<strong>" + dataFromServer.players[i].username + "</strong><br/>" + 
        "<strong>" + dataFromServer.players[i].name + "</strong><br/>" + 
        "<a class='viewplayer' href='#'>View Profile</a><br/>" +
        "<a class='compilemsg' href='#'>Send Message</a><br/>" + 
        //"</div></td>";
        "</div></div>";
    }
    players = players + "</div></div>"
    //console.log(players);
    //console.log(bplayers);

    $('.playersection').append(players);
    $('.broadcastsection').append(bplayers);
  });
}

// =======================================================
var showCompiledMessageModal = function() {

  //$('.msg-beinvitedid').val("");
  $('.msg-courtname').val("");
  $('.msg-courtaddress').val("");
  $('.msg-playdate').val("");
  $('.msg-playtime').val(""); 
  $('.msg-content').val("");

  var originalPlayerElement = $(this).closest('.player');
  var playerId = originalPlayerElement.attr('data-playerid');
  //console.log(playerId);

  $('.msg-beinvitedid').val(playerId);

  $("#compilemsg-modal").modal('show');
}

// =======================================================
var sendMessage = function(e) {
  e.preventDefault();

  $("#compilemsg-modal").modal('hide');
  
  //var invite = $('.msg-inviteid').val();
  var playDate = $('.msg-playdate').val();
  var playTime = $('.msg-playtime').val();
  var courtName = $('.msg-courtname').val();
  var courtAddress = $('.msg-courtaddress').val();
  var todayDate = new Date();
  var todaydate = todayDate.toDateString(); 
  var content = $('.msg-content').val();
  
  var beInvited = $('.msg-beinvitedid').val();
  var beInviteds = [];
  var beInviteds = beInvited.split(",");
  console.log(beInviteds.length);

var messageData = {};
  
  for (var i=0; i<beInviteds.length; i++) {
    messageData = {
      playerid: beInviteds[i],
      courtname: courtName,
      courtaddress: courtAddress,
      playdate: playDate,
      playtime: playTime,
      todaydate: todaydate,
      content: content,
      status: "Open"
    };

    $.post('/msg', messageData, function(result){
      window.location.pathname="/messages";
    });
  }
}

var broadcastMessages = function(e) {
  e.preventDefault();

  var playerIds = [];

$('.playersid').find('.playeridvalue').each(function(){  
      //console.log($(this).val());
      playerIds.push($(this).val());
      //console.log(playerIds);
  });
  
  $('.msg-beinvitedid').val(playerIds);
  $('.msg-courtname').val("");
  $('.msg-courtaddress').val("");
  $('.msg-playdate').val("");
  $('.msg-playtime').val(""); 
  $('.msg-content').val("");

  $("#compilemsg-modal").modal('show');
}

// =======================================================
$(document).on('ready', function(){
  // open view a player modal
  $(document).on('click', '.viewplayer', viewPlayer);

  // open compile message modal
  $(document).on('click', '.compilemsg', showCompiledMessageModal);

  // open filter players modal
  $('.filterplayers').on('click', showFilterPlayersModal);

  // run filters
  $('.runfilterplayers').on('click', filterPlayers);

  // send message
  $('.sendmsg').on('click', sendMessage);

  // broadcast message
  $('.broadcast').on('click', broadcastMessages);
});