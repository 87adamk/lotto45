var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');

var url = 'http://www.nlotto.co.kr/lotto645Confirm.do?method=allWin&nowPage=1&drwNoStart=723&drwNoEnd=727';
var cHtml;
request(url, function(error, res, html){

	if (error) {throw error};

		//console.log (html);
		cHtml = html;
		//var $ = cheerio.load(html);

		//res.send(cHtml);
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 	res.render('pages/main');
});

app.get('/test', function(req, res) {

	res.send(cHtml);

});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


