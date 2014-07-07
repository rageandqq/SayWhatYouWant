var socket = io();
$('form').submit(function(){
	if ($('#message-field').val() != null && $('#message-field').val().trim() != "" ) {
		socket.emit('chat-message', $('#message-field').val());
		$('#message-field').val('');
		return false;
	}
});
socket.on('chat-message', function(message) {
	$('#chat').append('<li>' + message + '</li>');
});
socket.on('user-connection', function(num) {
	$('#users').text('Users online: ' + num);
});