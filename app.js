var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.Server(app);

app.set('views', path.join(__dirname, ''));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res) {
	res.render('chat.html');
});

server.listen(5000, function() {
	console.log ('Started listening on port 5000');
});