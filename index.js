var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');  
var app = express();

var jsonParser = bodyParser.json();

var options = {
  host: 'api.line.me',
  port: 443,
  path: '/v2/bot/message/reply',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer L/rv6DxG3fHK7SOuQOz4mvHxX5mjN7+Axpy1IJJBg6ENFEKVV1Z+kApbryOPP77P03OF7O80JNHmjl6Ncxt/dgIml8n4UOD71jQPhI+wiEKhnagEmiqxC2sLKROX/GSrLcbxa0fei67hhh5QyfDLngdB04t89/1O/w1cDnyilFU='
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
    }
  }

  if (rplyVal) {
    replyMsgToLine(rplyToken, rplyVal); 
  } else {
    console.log('Do not trigger'); 
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
          
		console.log('InputStr: ' + inputStr);
		_isNaN = function(obj) {
			return isNaN(parseInt(obj));
        }                   
        let msgSplitor = ' ';	
		let mainMsg = inputStr.split(msgSplitor); //定義輸入字串，以空格切開     
		let trigger = mainMsg[0].toString().toLowerCase(); //指定啟動詞在第一個詞&把大階強制轉成細階
                       
        //鴨霸獸指令開始於此
        if (trigger.match(/鴨霸獸|巴獸/) != null) return randomReply() ;        
        if (trigger.match(/運氣|運勢/) != null) return randomLuck(mainMsg) ; //占卜運氣        
        
		//nc指令開始於此 來自Rainsting/TarotLineBot 
		if (trigger.match(/^[1-4]n[c|a][+|-][1-99]$|^[1-4]n[c|a]$/)!= null ) return nechronica(trigger,mainMsg[1]);

  
		if (trigger.match(/^help$|^幫助$/)!= null ) return Help();
		
        if (trigger.match(/^d66$/)!= null ) return d66(mainMsg[1]);
	
		if (trigger.match(/^d66s$/)!= null ) return d66s(mainMsg[1]);
		if (trigger.match(/^ccb$|^cc$|^ccn$[1-2]$|^cc[1-2]$/)!= null )
	{       		

		if (inputStr.split(msgSplitor).length == 1) return randomReply() + '\n' + '\
CC後請輸入目標數字\
\n 詳情請輸入help\
';
        //ccb指令開始於此
		if (trigger == 'ccb') return coc6(mainMsg[1],mainMsg[2]);
          
        //cc指令開始於此
        if (trigger == 'cc') return coc7(mainMsg[1],mainMsg[2]);
        
        //獎懲骰設定於此    
          if (trigger == 'cc1') return coc7bp(mainMsg[1],'1',mainMsg[2]);        
          if (trigger == 'cc2') return coc7bp(mainMsg[1],'2',mainMsg[2]);   
          if (trigger == 'ccn1') return coc7bp(mainMsg[1],'-1',mainMsg[2]);   
          if (trigger == 'ccn2') return coc7bp(mainMsg[1],'-2',mainMsg[2]);   

	}
	//wod 指令開始於此
		if (trigger.match(/^(\d+)(wd|wod)(\d|)((\+|-)(\d+)|)$/i)!= null)
	{        
		return wod(trigger,mainMsg[1]);
	}

         //普通ROLL擲骰判定在此        
        if (inputStr.match(/\w/)!=null && inputStr.toLowerCase().match(/\d+d+\d/)!=null) {
          return nomalDiceRoller(inputStr,mainMsg[0],mainMsg[1],mainMsg[2]);
        }
	
}




               
////////////////////////////////////////
//////////////// COC6
////////////////////////////////////////      
    

function coc6(chack,text){
          let temp = Dice(100);
          if (text == null ) {
            if (temp == 100) return 'ccb<=' + chack  + ' ' + temp + ' → 啊！大失敗！';
            if (temp <= chack) return 'ccb<=' + chack + ' '  + temp + ' → 成功';
            else return 'ccb<=' + chack  + ' ' + temp + ' → 失敗' ;
          }
          else
    {
            if (temp == 100) return 'ccb<=' + chack + ' ' + temp + ' → 啊！大失敗！；' + text;
            if (temp <= chack) return 'ccb<=' + chack +  ' ' + temp + ' → 成功；' + text;
            else return 'ccb<=' + chack  + ' ' +  temp + ' → 失敗；' + text;
    }
}        

////////////////////////////////////////
//////////////// COC7
////////////////////////////////////////      

        
function coc7(chack,text){
  let temp = Dice(100);  
  if (text == null ) {
    if (temp == 1) return temp + ' → 恭喜！大成功！';
    if (temp == 100) return temp + ' → 啊！大失敗！';
    if (temp <= chack/5) return temp + ' → 極限成功';
    if (temp <= chack/2) return temp + ' → 困難成功';
    if (temp <= chack) return temp + ' → 通常成功';
    else return temp + ' → 失敗' ;
  }
  else
  {
  if (temp == 1) return temp + ' → 恭喜！大成功！；' + text;
  if (temp == 100) return temp + ' → 啊！大失敗！；' + text;
  if (temp <= chack/5) return temp + ' → 極限成功；' + text;
  if (temp <= chack/2) return temp + ' → 困難成功；' + text;
  if (temp <= chack) return temp + ' → 通常成功；' + text;
  else return temp + ' → 失敗；' + text;
  }
}
        
function coc7chack(temp,chack,text){
  if (text == null ) {
    if (temp == 1) return temp + ' → 恭喜！大成功！';
    if (temp == 100) return temp + ' → 啊！大失敗！';
    if (temp <= chack/5) return temp + ' → 極限成功';
    if (temp <= chack/2) return temp + ' → 困難成功';
    if (temp <= chack) return temp + ' → 通常成功';
    else return temp + ' → 失敗' ;
  }
else
  {
    if (temp == 1) return temp + ' → 恭喜！大成功！；' + text;
    if (temp == 100) return temp + ' → 啊！大失敗！；' + text;
    if (temp <= chack/5) return temp + ' → 極限成功；' + text;
    if (temp <= chack/2) return temp + ' → 困難成功；' + text;
    if (temp <= chack) return temp + ' → 通常成功；' + text;
    else return temp + ' → 失敗；' + text;
  }
}


function coc7bp (chack,bpdiceNum,text){
  let temp0 = Dice(10) - 1;
  let countStr = '';
  
  if (bpdiceNum > 0){
  for (let i = 0; i <= bpdiceNum; i++ ){
    let temp = Dice(10);
    let temp2 = temp.toString() + temp0.toString();
    if (temp2 > 100) temp2 = parseInt(temp2) - 100;  
    countStr = countStr + temp2 + '、';
  }
  countStr = countStr.substring(0, countStr.length - 1) 
    let countArr = countStr.split('、'); 
    
  countStr = countStr + ' → ' + coc7chack(Math.min(...countArr),chack,text);
  return countStr;
  }
  
  if (bpdiceNum < 0){
    bpdiceNum = Math.abs(bpdiceNum);
    for (let i = 0; i <= bpdiceNum; i++ ){
      let temp = Dice(10);
      let temp2 = temp.toString() + temp0.toString();
      if (temp2 > 100) temp2 = parseInt(temp2) - 100;  
      countStr = countStr + temp2 + '、';
    }
    countStr = countStr.substring(0, countStr.length - 1) 
    let countArr = countStr.split('、'); 

    countStr = countStr + ' → ' + coc7chack(Math.max(...countArr),chack,text);
    return countStr;
  }
  
}
        
function ArrMax (Arr){
  var max = this[0];
  this.forEach (function(ele,index,arr){
    if(ele > max) {
      max = ele;
    }
  })
  return max;
}
        
////////////////////////////////////////
//////////////// 普通ROLL
////////////////////////////////////////
 function nomalDiceRoller(inputStr,text0,text1,text2){
  
  //首先判斷是否是誤啟動（檢查是否有符合骰子格式）
  if (inputStr.toLowerCase().match(/\d+d\d+/) == null) return undefined;
  
  //再來先把第一個分段拆出來，待會判斷是否是複數擲骰
  let mutiOrNot = inputStr.toLowerCase().match(/\S+/);
  
  //排除小數點
  if (mutiOrNot.toString().match(/\./)!=null)return undefined;

  //先定義要輸出的Str
  let finalStr = '' ;  
  
  
  //是複數擲骰喔
  if(mutiOrNot.toString().match(/\D/)==null ) {
	  if(text2 != null){
	  finalStr= text0 + '次擲骰：\n' + text1 +' ' + text2 + '\n';
    	  }
		  else{
		  finalStr= text0 + '次擲骰：\n' + text1 +'\n';
    		  }
    if(mutiOrNot>30) return '不支援30次以上的複數擲骰。';
    
    for (i=1 ; i<=mutiOrNot ;i++){
    let DiceToRoll = inputStr.toLowerCase().split(' ',2)[1];
    if (DiceToRoll.match('d') == null) return undefined;

    //寫出算式
    let equation = DiceToRoll;
    while(equation.match(/\d+d\d+/)!=null) {
      let tempMatch = equation.match(/\d+d\d+/);
      equation = equation.replace(/\d+d\d+/, RollDice(tempMatch));
    }

    //計算算式
    let aaa = equation;
	aaa = aaa.replace(/\d+[[]/, '(' );
	aaa = aaa.replace(']', ')' );
	let answer = eval(aaa.toString());
	
    finalStr = finalStr + i + '# ' + equation + ' = ' + answer + '\n';
    }
        
  }
  
  else
  {
  //一般單次擲骰
  let DiceToRoll = mutiOrNot.toString();
  
  if (DiceToRoll.match('d') == null) return undefined;
  
  //寫出算式
  let equation = DiceToRoll;
  while(equation.match(/\d+d\d+/)!=null) {
	let totally = 0;
    let tempMatch = equation.match(/\d+d\d+/);    
    if (tempMatch.toString().split('d')[0]>300) return undefined;
    if (tempMatch.toString().split('d')[1]==1 || tempMatch.toString().split('d')[1]>1000000) return undefined;
    equation = equation.replace(/\d+d\d+/, RollDice(tempMatch));
	
  }
  
  //計算算式
	let aaa = equation;
	aaa = aaa.replace(/\d+[[]/, '(' );
	aaa = aaa.replace(']', ')' );
	let answer = eval(aaa.toString());
      
  if(text1 != null){
	  finalStr= text0 + '：' + text1 + '\n' + equation + ' = ' + answer;
    	  }
		  else{
		  finalStr= text0 + '：\n' + equation + ' = ' + answer;
    		  }

  }
  
  return finalStr;


}        


////////////////////////////////////////
//////////////// 擲骰子運算
////////////////////////////////////////

        function Dice(diceSided){          
          return Math.floor((Math.random() * diceSided) + 1)
        }              
		
	function RollDice(inputStr){
  //先把inputStr變成字串（不知道為什麼非這樣不可）
  let comStr=inputStr.toString();
  let finalStr = '[';
  let temp = 0;
  var totally = 0;
  for (let i = 1; i <= comStr.split('d')[0]; i++) {
	temp = Dice(comStr.split('d')[1]);
	totally +=temp;
    finalStr = finalStr + temp + '+';
     }

  finalStr = finalStr.substring(0, finalStr.length - 1) + ']';
  finalStr = finalStr.replace('[', totally +'[');
  return finalStr;
}

////////////////////////////////////////
//////////////// nechronica (NC)
////////////////////////////////////////
function nechronica(triggermsg ,text) {
	let returnStr = '';
	var ncarray = [];
	var dicemax = 0, dicemin = 0, dicenew = 0;

	var match = /^(\d+)(NC|NA)((\+|-)(\d+)|)$/i.exec(triggermsg);	//判斷式

	for (var i = 0; i < Number(match[1]); i++)	
	{
		dicenew = Dice(10) + Number(match[3]);
		ncarray.push(dicenew);
	}

	dicemax = Math.max(...ncarray);	//判斷最大最小值
	dicemin = Math.min(...ncarray);

	if (Number(match[1]) == 1)
		returnStr += dicemax + '[' + ncarray.pop() + ']'; 
	else
	{
		returnStr += dicemax + '[';
		for (i = 0; i < Number(match[1]); i++)
		{
			if (i != Number(match[1]) - 1)
				returnStr += ncarray.pop() + ',';
			else
				returnStr += ncarray.pop();
		}
		returnStr += ']';
	}

	if (dicemax > 5)
		if (dicemax > 10)
			returnStr += ' → 大成功';
		else
			returnStr += ' → 成功';
	else
		if (dicemin <= 1)
			returnStr += ' → 大失敗';
		else
			returnStr += ' → 失敗';

	if (text != null)
		returnStr += ' ; ' + text;

	return returnStr;
}

////////////////////////////////////////
//////////////// D66
////////////////////////////////////////

function d66(text) {

	let returnStr = '';
	if(text != null){
	returnStr =   'D66：' + text + ' → ' + Dice(6) + Dice(6);
	}
	else{
	returnStr = 'D66 → ' + Dice(6) + Dice(6);
	}
	return returnStr;
	
}

////////////////////////////////////////
//////////////// D66s
////////////////////////////////////////

function d66s(text) {

	let temp0 = Dice(6);
	let temp1 = Dice(6);
	let returnStr = '';
	if (temp0>= temp1){
		let temp2 = temp0;
		temp0 = temp1;
		temp2 = temp1;
	}
	if(text != null){
	
	returnStr =   'D66s：' + text + ' → ' + temp0 + temp1;
	}
	else{
	returnStr = 'D66s → ' +  temp0 + temp1;
	}
	return returnStr;
	
}


////////////////////////////////////////
//////////////// WOD黑暗世界
////////////////////////////////////////

function wod(triggermsg ,text) {
	var returnStr = triggermsg+' [';
	var varcou = 0;
	var varsu = 0;
	var match = /^(\d+)(wd|wod)(\d|)((\+|-)(\d+)|)$/i.exec(triggermsg);   //判斷式  [0]3wd8+10,[1]3,[2]wd,[3]8,[4]+10,[5]+,[6]10  
	if (match[3]=="") { match[3] =10 }
	if (match[3]<=1) { return '加骰最少比1高'; }
			
for (var i = 0; i < Number(match[1]); i++)	
	{
             varcou =  Math.floor(Math.random() * 10) + 1;
             returnStr += varcou +', ';
             
		
             if (varcou >=match[3]) { i--}
             if (varcou >=8) 
	     {
		     varsu++;
	     }

	}

	    if(match[5]=='+'){
    
    for (var i = 0; i < Number(match[6]); i++)	{
	    varsu++;
    }
    }
    if(match[5]=='-'){
    
    for (var i = 0; i < Number(match[6]); i++)	{
	    varsu--;
    }
    }
	
    returnStr = returnStr.replace(/[,][ ]$/,'] → '+varsu+'成功');
	if (text != null){
	returnStr += ' ; ' + text;
	}
	return returnStr;
}
////////////////////////////////////////
//////////////// 占卜&其他
////////////////////////////////////////

        function randomReply() {
          let rplyArr = ['你們死定了呃呃呃不要糾結這些……所以是在糾結哪些？', '在澳洲，每過一分鐘就有一隻鴨嘴獸被拔嘴。 \n我到底在共三小。', '嗚噁噁噁噁噁噁，不要隨便叫我。', '幹，你這學不會的豬！', '嘎嘎嘎。', 'wwwwwwwwwwwwwwwww', '為什麼你們每天都可以一直玩；玩就算了還玩我。', '好棒，整點了！咦？不是嗎？', '不要打擾我挖坑！', '好棒，誤點了！', '在南半球，一隻鴨嘴獸拍打他的鰭，他的嘴就會掉下來。 \n我到底在共三小。', '什麼東西你共三小。', '哈哈哈哈哈哈哈哈！', '一直叫，你4不4想拔嘴人家？', '一直叫，你想被淨灘嗎？', '幫主你也敢嘴？'];
          return rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
       function randomLuck(TEXT) {
           let rplyArr = ['超吉','超級上吉','大吉','吉','中吉','小吉','吉','小吉','吉','吉','中吉','吉','中吉','吉','中吉','小吉','末吉','吉','中吉','小吉','末吉','中吉','小吉','小吉','吉','小吉','末吉','中吉','小吉','凶','小凶','沒凶','大凶','很凶'];
           return TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
        }
		function Help() {
			return randomReply() + '\n' + '\
【擲骰BOT】v1.0 \
\n 例如輸入2d6+1　攻撃！\
\n 會輸出）2d6+1：攻撃  (6+3)+1 = 10\
\n 如上面一樣,在骰子數字後方隔空白位打字,可以進行發言。\
\n 以下還有其他例子\
\n 5 3D6  ：分別骰出5次3d6\
\n ・COC六版判定　CCb （目標値）：做出成功或失敗的判定\
\n例）CCb 30　CCb 80\
\n ・COC七版判定　CCx（目標値）\
\n　x：獎勵骰/懲罰骰 (2～n2)。沒有的話可以省略。\
\n例）CC 30　CC1 50　CCn2 75\
\n・占卜運氣功能 字句中包括運氣即可\
\n・NC 永遠的後日談擲骰\
\n(骰數)NC/NA (問題)\
\n 例如 1NC 2Na+4 3na-2\
\n・WOD 黑暗世界擲骰\
\n(骰數)WOD/Wd(加骰)(+成功數) (問題)\
\n 例如 2wod 3wd8 15wd9+2\
';
			
		}
		
		
