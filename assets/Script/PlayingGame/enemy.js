/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 13:12:58
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-04-08 10:33:40
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
        initSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
            tooltip: '初始化图像'
        },
        score: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机分数',
        },
        HP: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机血量',
        },
        soundDieEnemy: cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init()
    },

    normal(type) {
        var anim = this.getComponent(cc.Animation)
        let animName = String('enemyNormal_' + type)
        anim.play(animName)
    },

    init() {
        this.isDie = false
        this.speed = 200 + Math.random() * 300
        // var anim = this.getComponent(cc.Animation)
        // anim.play('enemy_1Normal')
    },

    hit() {
        this.HP--
        if (this.HP <= 0) {
            this.isDie = true
            if (this.score == 100) {
                this.die(1)
                game.addScore(100)
            } else if (this.score == 300) {
                this.die(2)
                game.addScore(300)
            } else if (this.score == 500) {
                this.die(3)
                game.addScore(500)
            }
            return
        } else {
            if (this.score == 100) {} else if (this.score == 300) {
                this.hitPlay(2)
            } else if (this.score == 500) {
                this.hitPlay(3)
            }
        }
    },

    hitPlay(type) {
        var anim = this.getComponent(cc.Animation)
        anim.over = function () {
            this.normal()
        }.bind(this)
        let animName = String('enemyHit_' + type)
        anim.play(animName)
    },

    die(type) {
        var anim = this.getComponent(cc.Animation)
        anim.over = function () {
            enemyGroup.onEnemyKilled(this.node, type)
        }.bind(this)
        let animName = String('enemyDie_' + type)
        anim.play(animName)
        cc.audioEngine.play(this.soundDieEnemy, false, 1)
    },

    update(dt) {
        if (this.isDie) return
        if (game.gameType == 0) {
            this.node.y = this.node.y - this.speed * dt
        }
        if (this.node.y <= -600) {
            enemyGroup.onEnemyKilled(this.node, 1)
        } else if (this.node.y <= -620) {
            enemyGroup.onEnemyKilled(this.node, 2)
        } else if (this.node.y <= -705) {
            enemyGroup.onEnemyKilled(this.node, 3)
        }
    },
});