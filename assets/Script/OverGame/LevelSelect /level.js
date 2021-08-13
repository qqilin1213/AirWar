/*
 * @Author: qqilin1213
 * @Date: 2021-04-04 16:38:34
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 13:20:38
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
        classNum: 0,
        canPlay: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let level1 = cc.sys.localStorage.getItem('level1')
        let level2 = cc.sys.localStorage.getItem('level2')
        let level3 = cc.sys.localStorage.getItem('level3')
        cc.find('Canvas/LevelSelect/view/content/Level2/Close').active = true
        cc.find('Canvas/LevelSelect/view/content/Level3/Close').active = true
        // console.log(level1, level2, level3)
        if (this.classNum == 1) {
            cc.find('Canvas/LevelSelect/view/content/Level1/StarGroup').active = true
            // let starGroup = cc.find('Canvas/LevelSelect/view/content/Level1').getComponent('starGroup')
            // starGroup.creatStarOnSel(stars[0], 1)
            if (level1 >= 1) {
                cc.find('Canvas/LevelSelect/view/content/Level1/StarGroup/star1').active = true
            }
            if (level1 >= 2) {
                cc.find('Canvas/LevelSelect/view/content/Level1/StarGroup/star2').active = true
                cc.find('Canvas/LevelSelect/view/content/Level2/Close').active = false
                cc.find('Canvas/LevelSelect/view/content/Level2').getComponent('level').canPlay = 1
            }
            if (level1 >= 3) {
                cc.find('Canvas/LevelSelect/view/content/Level1/StarGroup/star3').active = true
                cc.find('Canvas/LevelSelect/view/content/Level2/Close').active = false
                cc.find('Canvas/LevelSelect/view/content/Level2').getComponent('level').canPlay = 1
            }
        }
        if (this.classNum == 2) {
            cc.find('Canvas/LevelSelect/view/content/Level2/StarGroup').active = true
            if (level2 >= 1) {
                cc.find('Canvas/LevelSelect/view/content/Level2/StarGroup/star1').active = true
            }
            if (level2 >= 2) {
                cc.find('Canvas/LevelSelect/view/content/Level2/StarGroup/star2').active = true
                cc.find('Canvas/LevelSelect/view/content/Level3/Close').active = false
                cc.find('Canvas/LevelSelect/view/content/Level3').getComponent('level').canPlay = 1
            }
            if (level2 >= 3) {
                cc.find('Canvas/LevelSelect/view/content/Level2/StarGroup/star3').active = true
                cc.find('Canvas/LevelSelect/view/content/Level3/Close').active = false
                cc.find('Canvas/LevelSelect/view/content/Level3').getComponent('level').canPlay = 1
            }
        }
        if (this.classNum == 3) {
            cc.find('Canvas/LevelSelect/view/content/Level2/Close').active = false
            cc.find('Canvas/LevelSelect/view/content/Level3/Close').active = false
            cc.find('Canvas/LevelSelect/view/content/Level3/StarGroup').active = true
            if (level3 >= 1) {
                cc.find('Canvas/LevelSelect/view/content/Level3/StarGroup/star1').active = true
            }
            if (level3 >= 2) {
                cc.find('Canvas/LevelSelect/view/content/Level3/StarGroup/star2').active = true
            }
            if (level3 >= 3) {
                cc.find('Canvas/LevelSelect/view/content/Level3/StarGroup/star3').active = true
            }
        }
    },

    // goScene() {
    // cc.director.loadScene('PlayingGame')
    // },


    clickBtn(sender, str) {
        if (str == '1') {
            cc.director.preloadScene('Level1_Game');
            cc.director.loadScene('Level1_Game');
        } else if (str == '2') {
            cc.director.preloadScene('Level2_Game');
            if (cc.find('Canvas/LevelSelect/view/content/Level2').getComponent('level').canPlay === 1) {
                cc.director.loadScene('Level2_Game');
                console.log('2')
            }
        } else if (str == '3') {
            cc.director.preloadScene('Level3_Game');
            if (cc.find('Canvas/LevelSelect/view/content/Level3').getComponent('level').canPlay === 1) {
                cc.director.loadScene('Level3_Game');
                console.log('3')
            }
        }
    },

    start() {


    },

    // update (dt) {},
});