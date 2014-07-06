var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.get('/', function(req, res) {
	res.send('<h1>Say What You Want</h1>');
});

server.listen(5000, function() {
	console.log ('Started listening on port 5000');
});