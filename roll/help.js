var rollbase = require('./rollbase.js');
var funny = require('./funny.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

function Help() {
rply =		{
  "type": "template",
  "altText": "【擲骰BOT】v1.30 \
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
23213",
  "template": {
      "type": "carousel",
      "columns": [
	  {
			"title": "《AAAB》",
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
				},
				{
					"type": "message",
					"label": "調整值範例2",
					"text": "pb+1 調整值示範2"
				}
						
			]
		},{
			"title": "《AAA》",
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
			"title": "《P2系統》",
			"text": "本系統3為 pb",
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