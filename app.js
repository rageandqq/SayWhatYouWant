var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

var numUsersConnected = 0;

app.set('views', path.join(__dirname, ''));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res) {
	res.render('chat.html');
});

io.on('connection', function(socket) {
	numUsersConnected++;
	console.log ("User connected. Users online: " + numUsersConnected);
	socket.on('disconnect', function() {
		numUsersConnected--;
		console.log ("User disconnected. Users online: " + numUsersConnected);
	});
	socket.on('chat-message', function(message) {
		console.log ('User says: ' + message);
		io.emit('chat-message', message);
	});
});

server.listen(5000, function() {
	console.log ('Started listening on port 5000');
});