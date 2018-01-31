var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');  
var app = express();
var jsonParser = bodyParser.json();
var coc = require('./roll/coc.js');
var rollbase = require('./roll/rollbase.js');
var advroll = require('./roll/advroll.js');
var nc = require('./roll/nc.js');
var wod = require('./roll/wod.js');
var funny = require('./roll/funny.js');
var help = require('./roll/help.js');
var options = {
  host: 'api.line.me',
  port: 443,
  path: '/v2/bot/message/reply',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'Bearer L/rv6DxG3fHK7SOuQOz4mvHxX5mjN7+Axpy1IJJBg6ENFEKVV1Z+kApbryOPP77P03OF7O80JNHmjl6Ncxt/dgIml8n4UOD71jQPhI+wiEKhnagEmiqxC2sLKROX/GSrLcbxa0fei67hhh5QyfDLngdB04t89/1O/w1cDnyilFU='
  }
}
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files

app.get('/', function(req, res) {
//  res.send(parseInput(req.query.input));
  res.send('Hello');
});

app.post('/', jsonParser, function(req, res) {
  let event = req.body.events[0];
  let type = event.type;
  let msgType = event.message.type;
  let msg = event.message.text;
  let rplyToken = event.replyToken;

  let rplyVal = null;
  console.log(msg);
  if (type == 'message' && msgType == 'text') {
    try {
      rplyVal = parseInput(rplyToken, msg); 
    } 
    catch(e) {
      console.log('catch error');
	  console.log('Request error: ' + e.message);
    }
  }

  if (rplyVal) {
    replyMsgToLine(rplyToken, rplyVal); 
  } else {
    //console.log('Do not trigger'); 
  }

  res.send('ok');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function replyMsgToLine(rplyToken, rplyVal) {
	let rplyObj = {
    replyToken: rplyToken,
    messages: [
      {
        type: "text",
        text: rplyVal
      }
    ]
  }

  let rplyJson = JSON.stringify(rplyObj); 
  
  var request = https.request(options, function(response) {
    console.log('Status: ' + response.statusCode);
    console.log('Headers: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function(body) {
      console.log(body); 
    });
  });
  request.on('error', function(e) {
    console.log('Request error: ' + e.message);
  })
  request.end(rplyJson);
}

////////////////////////////////////////
//////////////// 分析開始
////////////////////////////////////////
function parseInput(rplyToken, inputStr) {
          
		//console.log('InputStr: ' + inputStr);
		_isNaN = function(obj) 	{
		return isNaN(parseInt(obj));  
		}
		
        let msgSplitor = (/\S+/ig);	
		let mainMsg = inputStr.match(msgSplitor); //定義輸入字串
		let trigger = mainMsg[0].toString().toLowerCase(); //指定啟動詞在第一個詞&把大階強制轉成細階
                       
        //鴨霸獸指令開始於此
        if (trigger.match(/鴨霸獸|巴獸/) != null) return funny.randomReply() ;        
        if (trigger.match(/運氣|運勢/) != null) return funny.randomLuck(mainMsg) ; //占卜運氣        
        
		//FLAG指令開始於此
        if (trigger.match(/立flag|死亡flag/) != null) return funny.BStyleFlagSCRIPTS() ;        
       
        if (trigger.match(/^coc7角色背景$/)!= null ) return coc.PcBG();
		
		//nc指令開始於此 來自Rainsting/TarotLineBot 
		if (trigger.match(/^[1-4]n[c|a][+|-][1-99]$|^[1-4]n[c|a]$/)!= null ) return nc.nechronica(trigger,mainMsg[1]);

		//依戀
		if (trigger.match(/(^nm$)/) != null)	 return nc.nechronica_mirenn(mainMsg[1]);
			
		if (trigger.match(/(^cc7版創角$|^cc七版創角$)/) != null && mainMsg[1] != NaN )	 return coc.build7char(mainMsg[1]);
	
		if (trigger.match(/(^cc6版創角$|^cc六版創角$)/) != null && mainMsg[1] != NaN )	 return coc.build6char(mainMsg[1]);
  
		if (trigger.match(/^help$|^幫助$/)!= null ) return help.Help();
		
			/**
 	* Fisher–Yates shuffle
 	  SortIt 指令開始於此
 	*/
 	if (trigger.match(/排序/)!= null && mainMsg.length >= 3) return funny.SortIt(inputStr,mainMsg);
 	if (trigger.match(/^d66$/)!= null ) return advroll.d66(mainMsg[1]);
	if (trigger.match(/^d66s$/)!= null ) return advroll.d66s(mainMsg[1]);
	if (trigger.match(/^ccb$|^cc$|^ccn[1-2]$|^cc[1-2]$/)!= null && mainMsg[1]<=1000 )
	{       		
        //ccb指令開始於此
		if (trigger == 'ccb'&& mainMsg[1]<=99) return coc.coc6(mainMsg[1],mainMsg[2]);
          
        //cc指令開始於此
        if (trigger == 'cc'&& mainMsg[1]<=1000) return coc.coc7(mainMsg[1],mainMsg[2]);
        
        //獎懲骰設定於此    
          if (trigger == 'cc1'&& mainMsg[1]<=1000) return coc.coc7bp(mainMsg[1],'1',mainMsg[2]); 
          if (trigger == 'cc2'&& mainMsg[1]<=1000) return coc.coc7bp(mainMsg[1],'2',mainMsg[2]);   
          if (trigger == 'ccn1'&& mainMsg[1]<=1000) return coc.coc7bp(mainMsg[1],'-1',mainMsg[2]);   
          if (trigger == 'ccn2'&& mainMsg[1]<=1000) return coc.coc7bp(mainMsg[1],'-2',mainMsg[2]);   
	}
	
	//wod 指令開始於此
	if (trigger.match(/^(\d+)(wd|wod)(\d|)((\+|-)(\d+)|)$/i)!= null)return wod.wod(trigger,mainMsg[1]);
	
	//choice 指令開始於此
	if (trigger.match(/choice|隨機|選項|選1/)!= null && mainMsg.length >= 3) return funny.choice(inputStr,mainMsg);
	//tarot 指令
	if (trigger.match(/tarot|塔羅牌|塔羅/) != null) {
			if (trigger.match(/每日|daily/)!= null) return funny.NomalDrawTarot(mainMsg[1], mainMsg[2]);
			if (trigger.match(/時間|time/)!= null) 	return funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
			if (trigger.match(/大十字|cross/)!= null) return funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
			return funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 3); //預設抽 79 張
		}

		/*tarot 指令
	if (trigger.match(/猜拳/) != null) {
			return RockPaperScissors(inputStr, mainMsg[1]);
		}
*/

	//xBy>A 指令開始於此
	if (trigger.match(/^(\d+)(b)(\d+)$/i)!= null) return advroll.xBy(trigger,mainMsg[1],mainMsg[2]);
	//xUy 指令開始於此	
	if (trigger.match(/^(\d+)(u)(\d+)$/i)!= null && isNaN(mainMsg[1])== false) return advroll.xUy(trigger,mainMsg[1],mainMsg[2],mainMsg[3]);
     //普通ROLL擲骰判定在此        
     if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/\d+d+\d/)!=null) return rollbase.nomalDiceRoller(inputStr,mainMsg[0],mainMsg[1],mainMsg[2]);
  
}


////////////////////////////////////////
//////////////// 骰組開始
////////////////////////////////////////      



