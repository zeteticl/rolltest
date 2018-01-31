module.exports.coc6 = coc6;  
module.exports.coc7 = coc7;  
module.exports.coc7chack = coc7chack;  	
	
	
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
//////////////// COC7傳統創角
////////////////////////////////////////      


  
function build7char(text01){
	let old ="";
	let ReStr = '調查員年齡設為：';
    //讀取年齡
	if (text01 == undefined) {
	old = 18;
    ReStr = ReStr + old + '(沒有填寫使用預設值)\n';
	}
	else 
	{
	old = text01;
    ReStr = ReStr + old + '\n';
	}
    //設定 因年齡減少的點數 和 EDU加骰次數
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;


    let oldArr = [15,20,40,50,60,70,80]
    let DebuffArr = [5,0,5,10,20,40,80]
    let AppDebuffArr = [0,0,5,10,15,20,25]
    let EDUincArr = [0,1,2,3,4,4,4]

    if (old < 15) return ReStr + '等等，核心規則不允許小於15歲的人物哦。';    
    if (old >= 90) return ReStr + '等等，核心規則不允許90歲以上的人物哦。'; 

    for ( i=0 ; old >= oldArr[i] ; i ++){
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }

    ReStr = ReStr + '==\n';
    if (old < 20) ReStr = ReStr + '年齡調整：從STR、SIZ擇一減去' + Debuff + '點\n（請自行手動選擇計算）。\n將EDU減去5點。LUK可擲兩次取高。' ;
    else
      if (old >= 40)  ReStr = ReStr + '年齡調整：從STR、CON或DEX中「總共」減去' + Debuff + '點\n（請自行手動選擇計算）。\n將APP減去' + AppDebuff +'點。可做' + EDUinc + '次EDU的成長擲骰。' ;

    else ReStr = ReStr + '年齡調整：可做' + EDUinc + '次EDU的成長擲骰。' ;
    ReStr = ReStr + '\n==';
    if (old>=40) ReStr = ReStr + '\n（以下箭號三項，自選共減' + Debuff + '點。）' ;
    if (old<20) ReStr = ReStr + '\n（以下箭號兩項，擇一減去' + Debuff + '點。）' ;
    ReStr = ReStr + '\nＳＴＲ：' + BuildDiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 共減' + Debuff ;
    if (old<20) ReStr = ReStr + ' ←擇一減' + Debuff ;
    ReStr = ReStr + '\nＣＯＮ：' + BuildDiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 共減' + Debuff;
    ReStr = ReStr + '\nＤＥＸ：' + BuildDiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' ← 共減' + Debuff ;
    if (old>=40) ReStr = ReStr + '\nＡＰＰ：' + BuildDiceCal('3d6*5-' + AppDebuff);
    else ReStr = ReStr + '\nＡＰＰ：' + BuildDiceCal('3d6*5');
    ReStr = ReStr + '\nＰＯＷ：' + BuildDiceCal('3d6*5');
    ReStr = ReStr + '\nＳＩＺ：' + BuildDiceCal('(2d6+6)*5');
    if (old<20) ReStr = ReStr + ' ←擇一減' + Debuff ;
    ReStr = ReStr + '\nＩＮＴ：' + BuildDiceCal('(2d6+6)*5');         
    if (old<20) ReStr = ReStr + '\nＥＤＵ：' + BuildDiceCal('3d6*5-5');
    else {
      let firstEDU = '(' + BuildRollDice('2d6') + '+6)*5';
      ReStr = ReStr + '\n==';
      ReStr = ReStr + '\nＥＤＵ初始值：' + firstEDU + ' = ' + eval(firstEDU);
      
      let tempEDU = eval(firstEDU);

      for (i = 1 ; i <= EDUinc ; i++){
        let EDURoll = Dice(100);
        ReStr = ReStr + '\n第' + i + '次EDU成長 → ' + EDURoll;


        if (EDURoll>tempEDU) {
          let EDUplus = Dice(10);
          ReStr = ReStr + ' → 成長' + EDUplus +'點';
          tempEDU = tempEDU + EDUplus;
        }
        else{
          ReStr = ReStr + ' → 沒有成長';       
        }
      }
      ReStr = ReStr + '\n';
      ReStr = ReStr + '\nＥＤＵ最終值：' +tempEDU;
    }
    ReStr = ReStr + '\n==';

    ReStr = ReStr + '\nＬＵＫ：' + BuildDiceCal('3d6*5');    
    if (old<20) ReStr = ReStr + '\nＬＵＫ加骰：' + BuildDiceCal('3D6*5');


    return ReStr;
  } 

////////////////////////////////////////
//////////////// COC7傳統創角
////////////////////////////////////////      


  
function build6char(){

/*    //讀取年齡
	if (text01 == undefined) text01 = 18;
    let old = text01;
    let ReStr = '調查員年齡設為：' + old + '\n';
    //設定 因年齡減少的點數 和 EDU加骰次數
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;


    let oldArr = [15,20,40,50,60,70,80]
    let DebuffArr = [5,0,5,10,20,40,80]
    let AppDebuffArr = [0,0,5,10,15,20,25]
    let EDUincArr = [0,1,2,3,4,4,4]

    if (old < 15) return ReStr + '等等，核心規則不允許小於15歲的人物哦。';    
    if (old >= 90) return ReStr + '等等，核心規則不允許90歲以上的人物哦。'; 

    for ( i=0 ; old >= oldArr[i] ; i ++){
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }

    ReStr = ReStr + '==\n';
    if (old < 20) ReStr = ReStr + '年齡調整：從STR、SIZ擇一減去' + Debuff + '點\n（請自行手動選擇計算）。\n將EDU減去5點。LUK可擲兩次取高。' ;
    else
      if (old >= 40)  ReStr = ReStr + '年齡調整：從STR、CON或DEX中「總共」減去' + Debuff + '點\n（請自行手動選擇計算）。\n將APP減去' + AppDebuff +'點。可做' + EDUinc + '次EDU的成長擲骰。' ;

    else ReStr = ReStr + '年齡調整：可做' + EDUinc + '次EDU的成長擲骰。' ;
    ReStr = ReStr + '\n=='; 
 if (old>=40) ReStr = ReStr + '\n（以下箭號三項，自選共減' + Debuff + '點。）' ;
    if (old<20) ReStr = ReStr + '\n（以下箭號兩項，擇一減去' + Debuff + '點。）' ;
 */
	let ReStr = '六版核心創角：';
	ReStr = ReStr + '\nＳＴＲ：' + BuildDiceCal('3d6');
    ReStr = ReStr + '\nＤＥＸ：' + BuildDiceCal('3d6');
    ReStr = ReStr + '\nＣＯＮ：' + BuildDiceCal('3d6');
	ReStr = ReStr + '\nＰＯＷ：' + BuildDiceCal('3d6');
    ReStr = ReStr + '\nＡＰＰ：' + BuildDiceCal('3d6');
    ReStr = ReStr + '\nＩＮＴ：' + BuildDiceCal('(2d6+6)');
    ReStr = ReStr + '\nＳＩＺ：' + BuildDiceCal('(2d6+6)');         
    ReStr = ReStr + '\nＥＤＵ：' + BuildDiceCal('(3d6+3)');         
	ReStr = ReStr + '\n年收入：' + BuildDiceCal('(1d10)'); 	  
	ReStr = ReStr + '\n調查員的最小起始年齡等於EDU+6，每比起始年齡年老十年，\n調查員增加一點EDU並且加20點職業技能點數。\n當超過40歲後，每老十年，\n從STR,CON,DEX,APP中選擇一個減少一點。';
    return ReStr;
  } 



