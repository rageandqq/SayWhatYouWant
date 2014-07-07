/* 
	Created by Sameer Chitley, 2014 
									*/
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

app.get ('*', function(req, res){
	res.redirect ('/');
});

io.on('connection', function(socket) {
	numUsersConnected++;
	io.emit('user-connection', numUsersConnected);
	socket.on('disconnect', function() {
		numUsersConnected--;
		io.emit('user-connection', numUsersConnected);
	});
	socket.on('chat-message', function(message) {
		io.emit('chat-message', message);
	});
});

var port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log ('Started listening on port: ' + port);
});