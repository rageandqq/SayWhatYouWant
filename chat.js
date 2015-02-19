/* 
	Created by Sameer Chitley, 2014 
									 */
/*jshint unused:true, eqnull:true */
var socket = io();
/* jshint ignore:start */
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
/* jshint ignore:end */
var sentMessages = [];
var messageIndex = null;
var hasCycledMessages = false;

$('form').submit(function(){
	var message = $('#message-field').val();
	if (message != null && message.trim() !== "" ) {
		var data = {
			user: $('#name-field').val(),
			message: message
		};

		sentMessages.push(message);
		messageIndex = sentMessages.length - 1;
		hasCycledMessages = false;

		socket.emit('chat-message', data);
		$('#message-field').val('');

		var editedData = {
			user: ((data.user == null || data.user.trim() == '')? 'Anon' : data.user.trim()),
			message: message.trim()
		};
		addMessage(editedData);

		return false;
	}
});

function addMessage (data) {
	if (data.user == null || data.user == '') {
		data.user = 'Anon';
	}
	if (glyphMap[data.message.toLowerCase()] != null) {
		$('#chat').append('<li><b>' + data.user + ' says: </b>' + glyphMap[data.message.toLowerCase()] + '</li>');
	}
	else {
		$('#chat').append('<li><b>' + data.user + ' says: </b>' + data.message + '</li>');
	}
	$('#chat').animate({scrollTop: $('#chat').prop("scrollHeight")}, 250);
}

socket.on('chat-message', function(data) {
	addMessage(data);
});

socket.on('user-connection', function(num) {
	$('#users').text('Users online: ' + num);
});

$('#userModal').on('shown.bs.modal', function () {
    $('#name-field').focus();
});

$('#userModal').on('hidden.bs.modal', function () {
    $('#message-field').focus();
});

$('#infoModal').on('hidden.bs.modal', function () {
    $('#message-field').focus();
});

$('#name-field').keypress(function(e) {		
	if (e.which == 13 && $('#name-field').is(':focus')) {
		$('#userModal').modal('hide');
		return false;
	}
});

function displayCycledMessage () {
	$('#message-field').val(sentMessages[messageIndex]);
}

$('#message-field').keydown(function (e) {
	var key = e.which;
	if (sentMessages.length > 0 && messageIndex != null) {
		if (!hasCycledMessages && (key == 38 || key == 40)) {
			e.preventDefault();
			hasCycledMessages = true;
			displayCycledMessage();
		}
		else {
			if (hasCycledMessages && key == 38 && messageIndex - 1 >= 0) {
				e.preventDefault();
				messageIndex--;
				displayCycledMessage();
			}
			else { 
				if (hasCycledMessages && key == 40 && messageIndex + 1 < sentMessages.length) {
					e.preventDefault();
					messageIndex++;
					displayCycledMessage();
				}
			}
		}
	}
});
