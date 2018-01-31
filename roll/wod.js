var rollbase = require('./rollbase.js');

////////////////////////////////////////
//////////////// WOD黑暗世界
////////////////////////////////////////
function wod(triggermsg ,text) {
	var returnStr = triggermsg+' [';
	var varcou = 0;
	var varsu = 0;
	var match = /^(\d+)(wd|wod)(\d|)((\+|-)(\d+)|)$/i.exec(triggermsg);	//判斷式  [0]3wd8+10,[1]3,[2]wd,[3]8,[4]+10,[5]+,[6]10  
	if (match[3]=="") { match[3] =10 }
	if (match[3]<=2) { return '加骰最少比2高'; }
			
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

module.exports = {
	wod:wod
};