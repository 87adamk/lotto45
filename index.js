var express = require('express');
var app = express();
var cheerio = require('cheerio');
var req = require('request');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/main');
});

app.get('/test', function(request, response) {
  response.render('pages/main');
	
	var url = 'http://blog.saltfactory.net';
	request(url, function(error, response, html){
		if (error) {throw error};

		console.log (html);

	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


