module.exports.coc6 = coc6;  
module.exports.coc7 = coc7;  
module.exports.coc7chack = coc7chack;  	
	
	
	////////////////////////////////////////
//////////////// COC6
////////////////////////////////////////      
    

function coc6(chack,text){
          let temp = Dice(100);
          if (text == null ) {
            if (temp == 100) return 'ccb<=' + chack  + ' ' + temp + ' �� �ڡI�j���ѡI';
            if (temp <= chack) return 'ccb<=' + chack + ' '  + temp + ' �� ���\';
            else return 'ccb<=' + chack  + ' ' + temp + ' �� ����' ;
          }
          else
    {
            if (temp == 100) return 'ccb<=' + chack + ' ' + temp + ' �� �ڡI�j���ѡI�F' + text;
            if (temp <= chack) return 'ccb<=' + chack +  ' ' + temp + ' �� ���\�F' + text;
            else return 'ccb<=' + chack  + ' ' +  temp + ' �� ���ѡF' + text;
    }
}        

////////////////////////////////////////
//////////////// COC7
////////////////////////////////////////      

        
function coc7(chack,text){
  let temp = Dice(100);  
  if (text == null ) {
    if (temp == 1) return temp + ' �� ���ߡI�j���\�I';
    if (temp == 100) return temp + ' �� �ڡI�j���ѡI';
    if (temp <= chack/5) return temp + ' �� �������\';
    if (temp <= chack/2) return temp + ' �� �x�����\';
    if (temp <= chack) return temp + ' �� �q�`���\';
    else return temp + ' �� ����' ;
  }
  else
  {
  if (temp == 1) return temp + ' �� ���ߡI�j���\�I�F' + text;
  if (temp == 100) return temp + ' �� �ڡI�j���ѡI�F' + text;
  if (temp <= chack/5) return temp + ' �� �������\�F' + text;
  if (temp <= chack/2) return temp + ' �� �x�����\�F' + text;
  if (temp <= chack) return temp + ' �� �q�`���\�F' + text;
  else return temp + ' �� ���ѡF' + text;
  }
}
        
function coc7chack(temp,chack,text){
  if (text == null ) {
    if (temp == 1) return temp + ' �� ���ߡI�j���\�I';
    if (temp == 100) return temp + ' �� �ڡI�j���ѡI';
    if (temp <= chack/5) return temp + ' �� �������\';
    if (temp <= chack/2) return temp + ' �� �x�����\';
    if (temp <= chack) return temp + ' �� �q�`���\';
    else return temp + ' �� ����' ;
  }
else
  {
    if (temp == 1) return temp + ' �� ���ߡI�j���\�I�F' + text;
    if (temp == 100) return temp + ' �� �ڡI�j���ѡI�F' + text;
    if (temp <= chack/5) return temp + ' �� �������\�F' + text;
    if (temp <= chack/2) return temp + ' �� �x�����\�F' + text;
    if (temp <= chack) return temp + ' �� �q�`���\�F' + text;
    else return temp + ' �� ���ѡF' + text;
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
    countStr = countStr + temp2 + '�B';
  }
  countStr = countStr.substring(0, countStr.length - 1) 
    let countArr = countStr.split('�B'); 
    
  countStr = countStr + ' �� ' + coc7chack(Math.min(...countArr),chack,text);
  return countStr;
  }
  
  if (bpdiceNum < 0){
    bpdiceNum = Math.abs(bpdiceNum);
    for (let i = 0; i <= bpdiceNum; i++ ){
      let temp = Dice(10);
      let temp2 = temp.toString() + temp0.toString();
      if (temp2 > 100) temp2 = parseInt(temp2) - 100;  
      countStr = countStr + temp2 + '�B';
    }
    countStr = countStr.substring(0, countStr.length - 1) 
    let countArr = countStr.split('�B'); 

    countStr = countStr + ' �� ' + coc7chack(Math.max(...countArr),chack,text);
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
//////////////// COC7�ǲγШ�
////////////////////////////////////////      


  
function build7char(text01){
	let old ="";
	let ReStr = '�լd���~�ֳ]���G';
    //Ū���~��
	if (text01 == undefined) {
	old = 18;
    ReStr = ReStr + old + '(�S����g�ϥιw�]��)\n';
	}
	else 
	{
	old = text01;
    ReStr = ReStr + old + '\n';
	}
    //�]�w �]�~�ִ�֪��I�� �M EDU�[�릸��
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;


    let oldArr = [15,20,40,50,60,70,80]
    let DebuffArr = [5,0,5,10,20,40,80]
    let AppDebuffArr = [0,0,5,10,15,20,25]
    let EDUincArr = [0,1,2,3,4,4,4]

    if (old < 15) return ReStr + '�����A�֤߳W�h�����\�p��15�����H���@�C';    
    if (old >= 90) return ReStr + '�����A�֤߳W�h�����\90���H�W���H���@�C'; 

    for ( i=0 ; old >= oldArr[i] ; i ++){
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }

    ReStr = ReStr + '==\n';
    if (old < 20) ReStr = ReStr + '�~�ֽվ�G�qSTR�BSIZ�ܤ@��h' + Debuff + '�I\n�]�Цۦ��ʿ�ܭp��^�C\n�NEDU��h5�I�CLUK�i�Y�⦸�����C' ;
    else
      if (old >= 40)  ReStr = ReStr + '�~�ֽվ�G�qSTR�BCON��DEX���u�`�@�v��h' + Debuff + '�I\n�]�Цۦ��ʿ�ܭp��^�C\n�NAPP��h' + AppDebuff +'�I�C�i��' + EDUinc + '��EDU�������Y��C' ;

    else ReStr = ReStr + '�~�ֽվ�G�i��' + EDUinc + '��EDU�������Y��C' ;
    ReStr = ReStr + '\n==';
    if (old>=40) ReStr = ReStr + '\n�]�H�U�b���T���A�ۿ�@��' + Debuff + '�I�C�^' ;
    if (old<20) ReStr = ReStr + '\n�]�H�U�b���ⶵ�A�ܤ@��h' + Debuff + '�I�C�^' ;
    ReStr = ReStr + '\n����G' + BuildDiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' �� �@��' + Debuff ;
    if (old<20) ReStr = ReStr + ' ���ܤ@��' + Debuff ;
    ReStr = ReStr + '\n�ѢݢܡG' + BuildDiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' �� �@��' + Debuff;
    ReStr = ReStr + '\n�ҢӢ�G' + BuildDiceCal('3d6*5');
    if (old>=40) ReStr = ReStr + ' �� �@��' + Debuff ;
    if (old>=40) ReStr = ReStr + '\n�ϢޢޡG' + BuildDiceCal('3d6*5-' + AppDebuff);
    else ReStr = ReStr + '\n�ϢޢޡG' + BuildDiceCal('3d6*5');
    ReStr = ReStr + '\n�ޢݢ�G' + BuildDiceCal('3d6*5');
    ReStr = ReStr + '\n��ע�G' + BuildDiceCal('(2d6+6)*5');
    if (old<20) ReStr = ReStr + ' ���ܤ@��' + Debuff ;
    ReStr = ReStr + '\n�עܢ�G' + BuildDiceCal('(2d6+6)*5');         
    if (old<20) ReStr = ReStr + '\n�ӢҢ�G' + BuildDiceCal('3d6*5-5');
    else {
      let firstEDU = '(' + BuildRollDice('2d6') + '+6)*5';
      ReStr = ReStr + '\n==';
      ReStr = ReStr + '\n�ӢҢ��l�ȡG' + firstEDU + ' = ' + eval(firstEDU);
      
      let tempEDU = eval(firstEDU);

      for (i = 1 ; i <= EDUinc ; i++){
        let EDURoll = Dice(100);
        ReStr = ReStr + '\n��' + i + '��EDU���� �� ' + EDURoll;


        if (EDURoll>tempEDU) {
          let EDUplus = Dice(10);
          ReStr = ReStr + ' �� ����' + EDUplus +'�I';
          tempEDU = tempEDU + EDUplus;
        }
        else{
          ReStr = ReStr + ' �� �S������';       
        }
      }
      ReStr = ReStr + '\n';
      ReStr = ReStr + '\n�ӢҢ�̲׭ȡG' +tempEDU;
    }
    ReStr = ReStr + '\n==';

    ReStr = ReStr + '\n�ڢ�١G' + BuildDiceCal('3d6*5');    
    if (old<20) ReStr = ReStr + '\n�ڢ�٥[��G' + BuildDiceCal('3D6*5');


    return ReStr;
  } 

////////////////////////////////////////
//////////////// COC7�ǲγШ�
////////////////////////////////////////      


  
function build6char(){

/*    //Ū���~��
	if (text01 == undefined) text01 = 18;
    let old = text01;
    let ReStr = '�լd���~�ֳ]���G' + old + '\n';
    //�]�w �]�~�ִ�֪��I�� �M EDU�[�릸��
    let Debuff = 0;
    let AppDebuff = 0;
    let EDUinc = 0;


    let oldArr = [15,20,40,50,60,70,80]
    let DebuffArr = [5,0,5,10,20,40,80]
    let AppDebuffArr = [0,0,5,10,15,20,25]
    let EDUincArr = [0,1,2,3,4,4,4]

    if (old < 15) return ReStr + '�����A�֤߳W�h�����\�p��15�����H���@�C';    
    if (old >= 90) return ReStr + '�����A�֤߳W�h�����\90���H�W���H���@�C'; 

    for ( i=0 ; old >= oldArr[i] ; i ++){
      Debuff = DebuffArr[i];
      AppDebuff = AppDebuffArr[i];
      EDUinc = EDUincArr[i];
    }

    ReStr = ReStr + '==\n';
    if (old < 20) ReStr = ReStr + '�~�ֽվ�G�qSTR�BSIZ�ܤ@��h' + Debuff + '�I\n�]�Цۦ��ʿ�ܭp��^�C\n�NEDU��h5�I�CLUK�i�Y�⦸�����C' ;
    else
      if (old >= 40)  ReStr = ReStr + '�~�ֽվ�G�qSTR�BCON��DEX���u�`�@�v��h' + Debuff + '�I\n�]�Цۦ��ʿ�ܭp��^�C\n�NAPP��h' + AppDebuff +'�I�C�i��' + EDUinc + '��EDU�������Y��C' ;

    else ReStr = ReStr + '�~�ֽվ�G�i��' + EDUinc + '��EDU�������Y��C' ;
    ReStr = ReStr + '\n=='; 
 if (old>=40) ReStr = ReStr + '\n�]�H�U�b���T���A�ۿ�@��' + Debuff + '�I�C�^' ;
    if (old<20) ReStr = ReStr + '\n�]�H�U�b���ⶵ�A�ܤ@��h' + Debuff + '�I�C�^' ;
 */
	let ReStr = '�����֤߳Ш��G';
	ReStr = ReStr + '\n����G' + BuildDiceCal('3d6');
    ReStr = ReStr + '\n�ҢӢ�G' + BuildDiceCal('3d6');
    ReStr = ReStr + '\n�ѢݢܡG' + BuildDiceCal('3d6');
	ReStr = ReStr + '\n�ޢݢ�G' + BuildDiceCal('3d6');
    ReStr = ReStr + '\n�ϢޢޡG' + BuildDiceCal('3d6');
    ReStr = ReStr + '\n�עܢ�G' + BuildDiceCal('(2d6+6)');
    ReStr = ReStr + '\n��ע�G' + BuildDiceCal('(2d6+6)');         
    ReStr = ReStr + '\n�ӢҢ�G' + BuildDiceCal('(3d6+3)');         
	ReStr = ReStr + '\n�~���J�G' + BuildDiceCal('(1d10)'); 	  
	ReStr = ReStr + '\n�լd�����̤p�_�l�~�ֵ���EDU+6�A�C��_�l�~�֦~�ѤQ�~�A\n�լd���W�[�@�IEDU�åB�[20�I¾�~�ޯ��I�ơC\n��W�L40����A�C�ѤQ�~�A\n�qSTR,CON,DEX,APP����ܤ@�Ӵ�֤@�I�C';
    return ReStr;
  } 



