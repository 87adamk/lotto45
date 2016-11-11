var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var url = 'http://blog.saltfactory.net';


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	console.log("hi");
 	res.render('pages/main');
});

app.get('/test', function(req, res) {

	console.log('logging test');
	request(url, function(error, res, html){
		if (error) {throw error};

		console.log (html);

	});

	res.render('pages/index');

});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


