/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 10:02:10
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 13:21:16
 */
/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 10:02:10
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-04-03 10:26:51
 */
// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 预先加载游戏场景
        cc.director.preloadScene('Level1_Game');

    },

    clickBtn(sender, str) {
        cc.director.preloadScene('LevelSelect');
        if (str == 'choice') {
            // console.log('ok')
            cc.director.loadScene('LevelSelect');
        }
        if (str == 'start') {
            // console.log('ok')
            cc.director.loadScene('Level1_Game');
        }
    }

    // update (dt) {},
});