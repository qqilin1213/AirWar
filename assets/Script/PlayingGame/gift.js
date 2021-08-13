/*
 * @Author: qqilin1213
 * @Date: 2021-07-02 09:05:35
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 13:12:45
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

    onLoad() {},

    init() {
        this.speed = 100 + Math.random() * 200
    },

    onCollisionEnter: function (other, self) {
        // if (self.tag == 111 || self.tag == 222) { //子弹
        //     giftGroup.onGiftKilled(self.node)
        // }
        if (other.tag == 11) { //与子弹发生碰撞
            // cc.log('补给')
            this.die(self.tag)
            if (self.tag == 111) { //子弹
                this.die(111)
                // console.log('加弹')
                game.bullet_nor = 1;
            } else if (self.tag == 112) {
                console.log(hero.HP)
                this.die(112)
                if (hero.GameLife == 3) {
                    if (hero.HP == 2) {
                        // console.log('加血')
                        hero.HP++;
                        cc.find('Canvas/lifeGroup/life3').active = true
                    }
                    if (hero.HP == 1) {
                        // console.log('加血')
                        hero.HP++;
                        cc.find('Canvas/lifeGroup/life2').active = true
                    }
                }
                if (hero.GameLife == 2) {
                    if (hero.HP == 1) {
                        // console.log('加血')
                        hero.HP++;
                        cc.find('Canvas/lifeGroup/life2').active = true
                    }
                }

            }
        }
    },

    die(type) {
        var anim = this.getComponent(cc.Animation)
        anim.over = function () {
            giftGroup.onGiftKilled(this.node, type)
        }.bind(this)
        let animName = String('gift_Hit' + type)
        anim.play(animName)
    },

    update(dt) {
        if (game.gameType == 0) {
            this.node.y = this.node.y - 20
        }
        if (game.levelNum == 1) {
            if (this.node.y <= -60) {
                giftGroup.onGiftKilled(this.node, 111)
            } else if (this.node.y <= -70) {
                giftGroup.onGiftKilled(this.node, 112)
            }
        }
        if (game.levelNum == 2 || game.levelNum == 3) {
            if (this.node.y <= -628) {
                giftGroup.onGiftKilled(this.node, 111)
            } else if (this.node.y <= -625) {
                giftGroup.onGiftKilled(this.node, 112)
            }
        }
    },


});