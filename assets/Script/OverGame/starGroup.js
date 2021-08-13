/*
 * @Author: qqilin1213
 * @Date: 2021-04-04 20:48:26
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-05-27 11:21:28
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pre_star: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.starGroup = this
    },

    // 游戏结束产生的星星
    creatStar(num) {
        let star = null;
        let star2 = null;
        let star3 = null;
        if (num >= 1) {
            star = cc.instantiate(this.pre_star)
            star.parent = this.node
            star.setPosition(cc.v2(-120.592, -67.064))
            if (num >= 2) {
                star2 = cc.instantiate(this.pre_star)
                star2.parent = this.node
                star2.setPosition(cc.v2(4.862, -67.064))
            }
            if (num >= 3) {
                star3 = cc.instantiate(this.pre_star)
                star3.parent = this.node
                star3.setPosition(cc.v2(125.501, -67.064))
            }
        }
    },

    // 关卡界面星星数
    creatStarOnSel(num, levelNum) {
        let star = null;
        let star2 = null;
        let star3 = null;
        if (levelNum == 1) {
            if (num >= 1) {
                star = cc.instantiate(this.pre_star)
                star.parent = this.node
                star.setPosition(cc.v2(35.938, 30.529))
                if (num >= 2) {
                    star2 = cc.instantiate(this.pre_star)
                    star2.parent = this.node
                    star2.setPosition(cc.v2(107.677, 30.529))
                }
                if (num >= 3) {
                    star3 = cc.instantiate(this.pre_star)
                    star3.parent = this.node
                    star3.setPosition(cc.v2(171.995, 30.529))
                }
            }
        }
        if (levelNum == 2) {
            if (num >= 1) {
                star = cc.instantiate(this.pre_star)
                star.parent = this.node
                star.setPosition(cc.v2(57.28, 22.428))
                if (num >= 2) {
                    star2 = cc.instantiate(this.pre_star)
                    star2.parent = this.node
                    star2.setPosition(cc.v2(174.981, 22.428))
                }
                if (num >= 3) {
                    star3 = cc.instantiate(this.pre_star)
                    star3.parent = this.node
                    star3.setPosition(cc.v2(178.849, 22.428))
                }
            }
        }
        if (levelNum == 3) {
            if (num >= 1) {
                star = cc.instantiate(this.pre_star)
                star.parent = this.node
                star.setPosition(cc.v2(44.141, 40.343))
                if (num >= 2) {
                    star2 = cc.instantiate(this.pre_star)
                    star2.parent = this.node
                    star2.setPosition(cc.v2(125.738, 40.343))
                }
                if (num >= 3) {
                    star3 = cc.instantiate(this.pre_star)
                    star3.parent = this.node
                    star3.setPosition(cc.v2(186.297, 40.343))
                }
            }
        }
    },


    start() {

    },

    // update (dt) {},
});