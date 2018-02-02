var rollbase = require('./rollbase.js');
var funny = require('./funny.js');
var rply ={type : 'text'}; //type是必需的,但可以更改

function Help() {
rply =		{
  "type": "template",
  "altText": "【擲骰BOT】v1.30 \
 例如輸入2d6+1　攻撃！\
 會輸出）2d6+1：攻撃  9[6+3]+1 = 10\
 如上面一樣,在骰子數字後方隔空白位打字,可以進行發言。\
 以下還有其他例子\
 5 3D6 	：分別骰出5次3d6\
 D66 D66s ：骰出D66 s小者固定在前\
 5B10：不加總的擲骰 會進行小至大排序 \
 5B10 9：如上,另外計算其中有多少粒大過9 \
 5U10 8：進行5D10 每骰出一粒8會有一粒獎勵骰 \
 5U10 8 9：如上,另外計算其中有多少粒大過9 \
 Choice：啓動語choice/隨機/選項/選1\
 (問題)(啓動語)(問題)  (選項1) (選項2) \
 例子 隨機收到聖誕禮物數 1 2 3 >4  \
  \
 隨機排序：啓動語　排序\
 (問題)(啓動語)(問題)  (選項1) (選項2)(選項3) \
 例子 交換禮物排序 A君 C君 F君 G君\
 \
 ・COC六版判定　CCb （目標値）：做出成功或失敗的判定\
例）CCb 30　CCb 80\
 ・COC七版判定　CCx（目標値）\
　x：獎勵骰/懲罰骰 (2～n2)。沒有的話可以省略。\
  \
 ・cc六版創角\
 ・cc七版創角 （年齡）\
  \
・NC 永遠的後日談擲骰\
 (骰數)NC/NA (問題)\
  例子 1NC 2Na+4 3na-2\
 	依戀  NM (問題) \
  例子 NM NM 我的依戀\
  \
・WOD 黑暗世界擲骰\
 (骰數)WOD/Wd(加骰)(+成功數) (問題)\
  例子 2wod 3wd8 15wd9+2\
  \
・占卜運氣功能 字句中包括運氣即可\
・塔羅牌占卜 塔羅/大十字塔羅/每日塔羅牌\
  時間tarot 等關键字可啓動\
  死亡FLAG：啓動語 立Flag/死亡flag\
  coc7角色背景：啓動語 coc7角色背景\
",
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