var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

var oriUrl = "http://www.nlotto.co.kr/lotto645Confirm.do?method=allWin";
var crawlUrl;
var tHtml;

function getHistory() {
	request({url: oriUrl, encoding: null}, function(error, res, html) {
		
		if (error) { throw error }
		
		var $ = cheerio.load(iconv.convert(html).toString('utf-8'));
		
		var lastNum  = parseInt($("#drwNoEnd").val());
		var firstNum  = lastNum-4;
		crawlUrl = oriUrl+"&nowPage=1&drwNoStart="+firstNum+"&drwNoEnd="+lastNum;

		request({url: crawlUrl, encoding: null}, function(error, res, html) {
			
			if (error) { throw error }
			
			var $ = cheerio.load(iconv.convert(html).toString('utf-8'));
		
			tHtml = $("table.tblType1 > tbody > tr:gt(0):lt(6) > td:nth-child(2)").html();
		})

	})
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

	getHistory();

 	res.render('pages/main', {history: tHtml});
});

app.get('/test', function(req, res) {	

	getHistory();
	res.send(tHtml);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


