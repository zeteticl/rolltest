var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();
var analytics = require('./modules/analytics.js');
var replyMsgToLine = require('./modules/replyMsgToLine.js');
var path ={	reply: '/v2/bot/message/reply', richmenu: 'v2/bot/richmenu'};
//追求安全性,Authorization可以使用process.env
var options = {
	host: 'api.line.me',
	port: 443,
	method: 'POST',
	headers: {
	'Content-Type': 'application/json',
	'Authorization':'Bearer L/rv6DxG3fHK7SOuQOz4mvHxX5mjN7+Axpy1IJJBg6ENFEKVV1Z+kApbryOPP77P03OF7O80JNHmjl6Ncxt/dgIml8n4UOD71jQPhI+wiEKhnagEmiqxC2sLKROX/GSrLcbxa0fei67hhh5QyfDLngdB04t89/1O/w1cDnyilFU='
	}
}
app.set('port', (process.env.PORT || 5000));
// views is directory for all template files
app.get('/', function(req, res) {
//	res.send(parseInput(req.query.input));
	res.send('Hello');
});
app.post('/', jsonParser, function(req, res) {
	let event = req.body.events[0];
	let type = event.type;
	let msgType = event.message.type;
	let msg = event.message.text;
	let rplyToken = event.replyToken;
	let rplyVal = {};
	console.log(msg);
	//如果有訊息, 呼叫handleEvent 分類	
	try {
	rplyVal = handleEvent(event);
	} 
	catch(e) {
		console.log('catch error');
		console.log('Request error: ' + e.message);
	}
	//把回應的內容,掉到replyMsgToLine.js傳出去
	if (rplyVal) {
	options.rply= path.rply;	
	replyMsgToLine.replyMsgToLine(rplyToken, rplyVal, options); 
	} else {
	//console.log('Do not trigger'); 
	}
	res.send('ok');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


////////////////////////////////////////
///////// 骰組分析放到analytics.js 
////////////////////////////////////////	


function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return analytics.parseInput(event.rplyToken, event.message.text); 
        case 'image':
           break;
        case 'video':
           break;
        case 'audio':
           break;
        case 'location':
           break;
        case 'sticker':
           break;
        default:
           break;
      }
    case 'follow':
		break;
    case 'unfollow':
       break;
    case 'join':
break;
    case 'leave':
       break;

    case 'postback':
       break;

    case 'beacon':
      break;

    default:
       break;
  }
}
	