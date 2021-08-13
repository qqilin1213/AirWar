/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 10:50:38
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-04-03 21:22:38
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

    },

    onCollisionEnter: function (other, self) {
        if (self.tag == 11) { //子弹
            bulletGroup.onBulletKilled(self.node)
        }
        if (other.tag == 1) { //敌机1
            // cc.log('1碰撞了')
            var js = other.node.getComponent('enemy')
            // console.log(js)
            if (js && js.isDie == false) {
                js.hit()
            }
        } else if (other.tag == 2) { //敌机2
            // cc.log('2碰撞了')
            var js = other.node.getComponent('enemy')
            if (js && js.isDie == false) {
                js.hit()
            }
        } else if (other.tag == 3) { //敌机3
            // cc.log('3碰撞了')
            var js = other.node.getComponent('enemy')
            if (js && js.isDie == false) {
                js.hit()
            }
        }

    },

    update(dt) {
        if (game.gameType == 0) {
            this.node.y = this.node.y + 8
        }
        if (this.node.y >= 580) {
            bulletGroup.onBulletKilled(this.node)
        }
    },
});