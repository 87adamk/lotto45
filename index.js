var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');
/*
var options = {  
  url: "http://www.nlotto.co.kr/lotto645Confirm.do?method=allWin&nowPage=1&drwNoStart=723&drwNoEnd=727",
  headers: {  	
    "Host": "www.nlotto.co.kr"
  },
   encoding: null
};*/

var crawlUrl = "http://www.nlotto.co.kr/lotto645Confirm.do?method=allWin&nowPage=1&drwNoStart=723&drwNoEnd=727";
var cHtml;

request({url: crawlUrl, encoding: null}, function(error, res, html) {
	if (error) {throw error}
	cHtml = iconv.convert(html).toString('utf-8');
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

	res.setEncoding('utf8');
	res.send(cHtml);

});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


