var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

var oriUrl = "http://www.nlotto.co.kr/lotto645Confirm.do?method=allWin";
var crawlUrl;
var msg = "";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

	//getHistory();

 	res.render('pages/main');
});

app.get('/test', function(req, res) {	

	

	console.log("msg : " + msg);
	res.send(msg);
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));

	request({url: oriUrl, encoding: null}, function(error, res, html) {
		
		console.log("getHistory Start");

		if (error) { throw error }
		
		var $ = cheerio.load(iconv.convert(html).toString('utf-8'));
		
		var lastNum  = parseInt($("#drwNoEnd").val());
		var firstNum  = lastNum-4;
		crawlUrl = oriUrl+"&nowPage=1&drwNoStart="+firstNum+"&drwNoEnd="+lastNum;

		request({url: crawlUrl, encoding: null}, function(error, res, html) {
		
			console.log("getHistory sub Start");

			if (error) { throw error }
			
			var $ = cheerio.load(iconv.convert(html).toString('utf-8'));
					
			msg = $("table.tblType1 > tbody > tr > td:nth-child(2)").text();

			console.log("getHistory sub END");
		});

		console.log("getHistory END");

	});
});


