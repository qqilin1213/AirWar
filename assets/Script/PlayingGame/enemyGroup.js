/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 13:12:28
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-04-30 16:24:40
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
        pre_enemy_1: {
            default: null,
            type: cc.Prefab,
        },
        pre_enemy_2: {
            default: null,
            type: cc.Prefab,
        },
        pre_enemy_3: {
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.enemyGroup = this
        this.enemyPool_1 = new cc.NodePool()
        this.enemyPool_2 = new cc.NodePool()
        this.enemyPool_3 = new cc.NodePool()
    },

    // 制造敌机
    creatEnemy: function (enemyType) {
        let enemy = null
        var str = ''
        var pos_enemy = cc.v2(0, 0)
        if (enemyType == 1) { //创建敌机1
            if (this.enemyPool_1.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                enemy = this.enemyPool_1.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy = cc.instantiate(this.pre_enemy_1)
            }
            str = 'Enemy_1'
            pos_enemy.x = -289 + Math.random() * 580
            pos_enemy.y = 588 + Math.random() * 100
        } else if (enemyType == 2) { //创建敌机2
            if (this.enemyPool_2.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                enemy = this.enemyPool_2.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy = cc.instantiate(this.pre_enemy_2)
            }
            str = 'Enemy_2'
            pos_enemy.x = -280 + Math.random() * 550
            pos_enemy.y = 619 + Math.random() * 100
        } else if (enemyType == 3) { //创建敌机3
            if (this.enemyPool_3.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                enemy = this.enemyPool_3.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                enemy = cc.instantiate(this.pre_enemy_3)
            }
            str = 'Enemy_3'
            pos_enemy.x = -236 + Math.random() * 465
            pos_enemy.y = 695 + Math.random() * 150
        }

        enemy.parent = this.node
        var js = enemy.getComponent(str)
        if (js) {
            js.init()
        }
        enemy.setPosition(pos_enemy)
    },

    onEnemyKilled: function (enemy, enemyType) {
        if (enemyType == 1) {
            this.enemyPool_1.put(enemy)
        } else if (enemyType == 2) {
            this.enemyPool_2.put(enemy)
        } else if (enemyType == 3) {
            this.enemyPool_3.put(enemy)
        }
    },

    start() {

    },

    // update (dt) {},
});