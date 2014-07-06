var socket = io();
$('form').submit(function(){
	socket.emit('chat-message', $('#message-field').val());
	$('#message-field').val('');
	return false;
});
socket.on('chat-message', function(message) {
	console.log('received message: ' + message);
	$('#chat').append('<li>' + message + '</li>');
});