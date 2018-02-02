var rollbase = require('./rollbase.js');
var funny = require('./funny.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

function Help() {
rply.text = [
  {
	"系統縮寫": [
      "這裡要放系統說明的關鍵字"
    ],
	
    "說明": "《骰子狗功能一覽》\n建議加入骰子狗為好友，在手機上檢視以獲得更完整的說明。\n\n【一般擲骰功能】\n骰子狗支援一般常見的擲骰格式，如：2d4+1、2D10+1d2\n也支援多筆輸出，先打你要的次數，再空一格打擲骰內容，如：7 3d6、5 2d6+6\n\n【各別系統專屬擲骰】\n我目前支援的個別系統有\n「克蘇魯的呼喚(CoC7th)」「PBTA系列系統」\n可打「骰子狗+系統名稱」取得更多說明。\n\n其他骰組因為作者暫時用不到，所以沒有更新的預定\n\n【其他相關指令】\n主要是有趣為主的功能，有興趣可以打「骰子狗其他功能」來取得說明。"

  },
  {
    "系統名稱": "CoC7th",
    "系統縮寫": [
      "cc",
      "克蘇魯",
      "coc"
    ],
    "說明": "《CC功能說明》\n【一般擲骰】\n和凍豆腐一樣，「cc<=[數字]」。\n如：cc<=50\n\n【獎懲骰】\n「cc([-2~2])<=[數字]」，小括號中為獎懲骰數，正數為獎勵、負數為懲罰。\n如：cc(1)<=30、cc(-2)<=60\n\n和凍豆腐不同的新增功能如下：\n【幕間成長骰】\n「cc>[數字]」，用於幕間技能成長。\n\n【一鍵創角】\n「cc 創角/crt [年齡]」，\n若不加上年齡參數，則以悠子/冷嵐房規創角。若加上年齡，則以核心規則創角（含年齡調整）。\n\n【一鍵產生背景】\n「cc bg」，娛樂性質居多的調查員背景產生器"
  },
    {
    "系統名稱": "PBTA",
    "系統縮寫": [
      "pb"
    ],
    "說明": "《PB功能說明》\n【一般擲骰】\n直接打「pb」就是不含加減值的擲骰，可以直接在後面加上加減值。\n如：pb+1、pb-2"
  },
  {
    "系統名稱": "其他功能",
    "系統縮寫": [
      "其他"
    ],
    "說明": "《其他附加功能說明》\n目前實裝的附加功能是以下這些：\n\n【運勢】\n只要提到我的名字和運勢，我就會回答你的運勢。\n如：「骰子狗，請告訴我今天抽卡運勢！」\n\n【隨機選擇】\n只要提到我的名字和[選、挑、決定]，然後空一格打選項。\n記得選項之間也要用空格隔開，我就會幫你挑一個。\n如：「骰子狗，請幫我選宵夜要吃 鹽酥雞 滷味 吃p吃，不准吃」\n\n【圖片關鍵字】\n這個，有點難解釋。可以試著打打看「我什麼都沒有.jpg」或是「警察先生(ry」。圖片所有權屬於原作者所有，此處僅做為學術分享，不要吉我拜託。"
  },
  {
	"系統名稱": "關於骰子狗",
    "系統縮寫": [
      "關於骰子狗"
    ],
    "說明": 
	"《關於骰子狗》\n骰子狗是一個開放源碼的line骰子機器人計畫，前身是「機器鴨霸獸」。最早由作者的強者同學（LarryLo）提供基礎原始碼支援。而後幾經開發成為機器鴨霸獸。\n\n然而此時的機器鴨霸獸是以JavaScript寫成，在外連的支援度以及程式碼的分拆上都遇到困難（其實只是我能力不足）。幾經權衡之後決定以php語言重新寫成，並使用linebot的簡易api。\n\n骰子狗並非想要成為一個全功能的骰子機器人，而是希望成為一個引玉的磚頭。也希望能夠成為對開發Line機器人有興趣的人的一塊拍門磚。\n\n以下是骰子狗的原始碼，希望你也可以成功建立屬於你的linebot：\n https://github.com/retsnimle/TrpgLineBot-php"
  },
  {
	"系統名稱": "錯誤回報",
    "系統縮寫": [
      "錯誤回報"
    ],
    "說明": 
	"《錯誤回報與功能建議》\n如果在使用的過程中有發現任何的錯誤，或是有功能上的建議，請利用這個google表單回報：\n https://goo.gl/forms/YGQZNPgOIDmmR7wH3 \n\n我有空的時候，就會去修正…有空的時候（眼神飄移）\n畢竟我自己也是從零開始摸索的，有些東西不見得可以很快的反應，請多包涵。"
  }
];	
return rply;	
}



module.exports = {
	Help:Help
};