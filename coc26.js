	
	
	////////////////////////////////////////
//////////////// COC6
////////////////////////////////////////      
    

function coc26(chack,text){
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



module.exports = {
    coc26: coc26
};