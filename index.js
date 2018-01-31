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
		_isNaN = function(obj) {
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
  
		if (trigger.match(/^help$|^幫助$/)!= null ) return Help();
		
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

		function Help() {
			return randomReply() + '\n' + '\
【擲骰BOT】v1.26 \
\n 例如輸入2d6+1　攻撃！\
\n 會輸出）2d6+1：攻撃  9[6+3]+1 = 10\
\n 如上面一樣,在骰子數字後方隔空白位打字,可以進行發言。\
\n 以下還有其他例子\
\n 5 3D6 	：分別骰出5次3d6\
\n D66 D66s ：骰出D66 s小者固定在前\
\n 5B10：不加總的擲骰 會進行小至大排序 \
\n 5B10 9：如上,另外計算其中有多少粒大過9 \
\n 5U10 8：進行5D10 每骰出一粒8會有一粒獎勵骰 \
\n 5U10 8 9：如上,另外計算其中有多少粒大過9 \
\n Choice：啓動語choice/隨機/選項/選1\
\n (問題)(啓動語)(問題)  (選項1) (選項2) \
\n 例子 隨機收到聖誕禮物數 1 2 3 >4  \
\n  \
\n 隨機排序：啓動語　排序\
\n (問題)(啓動語)(問題)  (選項1) (選項2)(選項3) \
\n 例子 交換禮物排序 A君 C君 F君 G君\
\n \
\n ・COC六版判定　CCb （目標値）：做出成功或失敗的判定\
\n例）CCb 30　CCb 80\
\n ・COC七版判定　CCx（目標値）\
\n　x：獎勵骰/懲罰骰 (2～n2)。沒有的話可以省略。\
\n  \
\n ・cc六版創角\
\n ・cc七版創角 （年齡）\
\n  \
\n・NC 永遠的後日談擲骰\
\n (骰數)NC/NA (問題)\
\n  例子 1NC 2Na+4 3na-2\
\n 	依戀  NM (問題) \
\n  例子 NM NM 我的依戀\
\n  \
\n・WOD 黑暗世界擲骰\
\n (骰數)WOD/Wd(加骰)(+成功數) (問題)\
\n  例子 2wod 3wd8 15wd9+2\
\n  \
\n・占卜運氣功能 字句中包括運氣即可\
\n・塔羅牌占卜 塔羅/大十字塔羅/每日塔羅牌\
\n  時間tarot 等關键字可啓動\
\n  死亡FLAG：啓動語 立Flag/死亡flag\
\n  coc7角色背景：啓動語 coc7角色背景test01\
';		
		}

