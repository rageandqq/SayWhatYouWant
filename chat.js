var socket = io();
$('form').submit(function(){
	socket.emit('chat-message', $('#message-field').val());
	$('#message-field').val('');
	return false;
});