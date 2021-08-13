/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 21:09:09
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 10:50:22
 */


cc.Class({
    extends: cc.Component,

    properties: {
        soundDieHero: cc.AudioClip,
        HP: {
            default: 0,
            type: cc.Integer,
            tooltip: '英雄机血量',
        },
        GameLife: {
            default: 0,
            type: cc.Integer,
            tooltip: '英雄机血量',
        },
    },


    onLoad() {
        window.hero = this
        this.init()
    },

    onCollisionEnter: function (other, self) {
        if (self.tag == 100 && other.tag != 111 && other.tag != 222 && this.isDie == false) { //hero
            // cc.log("碰撞了")
            this.hit(this.HP)
        }
    },

    init: function () {
        this.node.active = true
        this.isDie = false
        this.normal()
    },

    normal: function () {
        var anim = this.getComponent(cc.Animation)
        anim.play('heroFlying')
    },

    hit() {
        if (this.GameLife == 3) {
            this.HP--
            if (this.HP <= 0) {
                cc.find('Canvas/lifeGroup/life1').active = false
                this.isDie = true
                this.die()
                return
            } else {
                if (this.HP <= 2) {
                    cc.find('Canvas/lifeGroup/life3').active = false
                    if (this.HP <= 1) {
                        cc.find('Canvas/lifeGroup/life2').active = false
                    }
                }
            }
        }
        if (this.GameLife == 2) {
            this.HP--
            if (this.HP <= 0) {
                cc.find('Canvas/lifeGroup/life1').active = false
                this.isDie = true
                this.die()
                return
            } else {
                if (this.HP <= 2) {
                    cc.find('Canvas/lifeGroup/life2').active = false
                }
            }
        }
        if (this.GameLife == 1) {
            this.HP--
            if (this.HP <= 0) {
                cc.find('Canvas/lifeGroup/life1').active = false
                this.isDie = true
                this.die()
                return
            }
        }

    },

    hitPlay() {
        var anim = this.getComponent(cc.Animation)
        anim.over = function () {
            this.normal()
        }.bind(this)
        anim.play('heroHit')
    },

    die: function () {
        var anim = this.getComponent(cc.Animation)
        anim.play('heroDie')
        anim.over = function () {
            this.node.active = false
            game.gameOver()
        }.bind(this)
        cc.audioEngine.play(this.soundDieHero, false, 1)
    },

    // update (dt) {},
});