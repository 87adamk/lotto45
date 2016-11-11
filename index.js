var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

var oriUrl = "http://www.nlotto.co.kr/lotto645Confirm.do?method=allWin";
var crawlUrl;
var tHtml;
var t;

request({url: oriUrl, encoding: null}, function(error, res, html) {
	if (error) {
		throw error
	}
	
	var $ = cheerio.load(iconv.convert(html).toString('utf-8'));
	
	t = $("#drwNoStart option:first").val();
	var lastNum  = parseInt($("#drwNoStart option:first").val());
	var firstNum  = lastNum;
	crawlUrl = oriUrl+"&nowPage=1&drwNoStart="+firstNum+"&drwNoEnd="+lastNum;
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
	
	/*request({url: crawlUrl, encoding: null}, function(error, res, html) {
		if (error) {
			throw error
		}
		
		var $ = cheerio.load(iconv.convert(html).toString('utf-8'));
		
		tHtml = "<table>" + $("table.tblType1").html() + "</table>";
	});*/

	res.send(t);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


