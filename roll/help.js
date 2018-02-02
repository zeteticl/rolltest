var rollbase = require('./rollbase.js');
var funny = require('./funny.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

function Help() {
rply =		{
  "type": "template",
  "altText": "系統說明",
  "template": {
      "type": "carousel",
      "columns": [
          {
            "title": "《CoC7th 克蘇魯的呼喚》",
            "text": "本系統相關指令，關鍵字為 CC",
            "actions": [
                {
                    "type": "message",
                    "label": "系統指令說明",
                    "text": "骰子狗CC"
                },
                {
                    "type": "message",
                    "label": "獎懲骰範例",
                    "text": "CC(2)<=50 獎勵骰示範"
                },
                {
                    "type": "message",
                    "label": "技能成長範例",
                    "text": "CC>20 技能成長示範"
                }
            ]
          },
          {
			"title": "《PBTA系統》",
			"text": "本系統相關指令，關鍵字為 pb",
			"actions": [
				{
					"type": "message",
					"label": "系統指令說明",
					"text": "骰子狗pb"
				},
				{
					"type": "message",
					"label": "一般擲骰範例",
					"text": "pb 示範"
				},
				{
					"type": "message",
					"label": "調整值範例",
					"text": "pb+1 調整值示範"
				}
						
			]
		},
		{
			"title": "《附加功能》",
			"text": "附加功能相關指令，關鍵字為「骰子狗」以及 .jpg 和 (ry",
			"actions": [
				{
					"type": "message",
					"label": "附加功能指令說明",
					"text": "骰子狗其他"
				},
				{
					"type": "message",
					"label": "隨機選擇範例",
					"text": "骰子狗，請幫我選宵夜要吃 鹽酥雞 滷味 吃p吃，不准吃"
				},
				{
					"type": "message",
					"label": "圖片回應範例",
					"text": "我覺得不行.jpg"
				}
						
			]
		}
      ]
  }
};
return rply;	
}



module.exports = {
	Help:Help
};