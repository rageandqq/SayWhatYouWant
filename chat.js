/* 
	Created by Sameer Chitley, 2014 
									 */
var socket = io();

$('form').submit(function(){
	if ($('#message-field').val() != null && $('#message-field').val().trim() != "" ) {
		var data = {
			user: $('#name-field').val(),
			message: $('#message-field').val()
		}
		socket.emit('chat-message', data);
		$('#message-field').val('');
		return false;
	}
});

socket.on('chat-message', function(data) {
	if (glyphMap[data.message.toLowerCase()] != null) {
		$('#chat').append('<li><b>' + data.user + ' says: </b>' + glyphMap[data.message.toLowerCase()] + '</li>');
	}
	else {
		$('#chat').append('<li><b>' + data.user + ' says: </b>' + data.message + '</li>');
	}
	$('#chat').animate({scrollTop: $('#chat').prop("scrollHeight")}, 250);
});

socket.on('user-connection', function(num) {
	$('#users').text('Users online: ' + num);
});

$('#userModal').on('shown.bs.modal', function () {
    $('#name-field').focus();
})

$('#userModal').on('hidden.bs.modal', function () {
    $('#message-field').focus();
})

$('#infoModal').on('hidden.bs.modal', function () {
    $('#message-field').focus();
})

var glyphMap = {};
glyphMap['l'] = '<i class="glyphicon glyphicon-thumbs-up">';
glyphMap['+'] = '<i class="glyphicon glyphicon-plus">';
glyphMap['*'] = '<i class="glyphicon glyphicon-asterisk">';
glyphMap['<3'] = '<i class="glyphicon glyphicon-heart">';
glyphMap['u'] = '<i class="glyphicon glyphicon-magnet">';
glyphMap['x'] = '<i class="glyphicon glyphicon-remove">';
glyphMap['!'] = '<i class="glyphicon glyphicon-exclamation-sign">';
glyphMap['$'] = '<i class="glyphicon glyphicon-usd">';
glyphMap['^'] = '<i class="glyphicon glyphicon-chevron-up">';
glyphMap['>'] = '<i class="glyphicon glyphicon-chevron-right">';
glyphMap['<'] = '<i class="glyphicon glyphicon-chevron-left">';
glyphMap['?'] = '<i class="glyphicon glyphicon-question-sign">';