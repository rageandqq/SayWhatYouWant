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
	if (data.message.toLowerCase() == 'l') {
		$('#chat').append('<li><b>' + data.user + ' says: </b><i class="glyphicon glyphicon-thumbs-up"></li>');
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

