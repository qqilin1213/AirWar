/*
 * @Author: qqilin1213
 * @Date: 2021-04-07 15:44:07
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-01 22:33:03
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

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.saveGame = this
        // this.stars = [0, 0, 0]
    },

    saveScore() {
        // let star = [] // 存储游戏分数
        if (game.levelNum == 1) {
            cc.sys.localStorage.setItem('level1', game.starNum)
        } else if (game.levelNum == 2) {
            cc.sys.localStorage.setItem('level2', game.starNum)
        } else if (game.levelNum == 3) {
            cc.sys.localStorage.setItem('level3', game.starNum)
        }
    },
    // saveScore() {
    //     game.star = this.getScore()
    // }
    // update (dt) {},
});