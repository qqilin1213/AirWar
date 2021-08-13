/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 11:00:13
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 10:16:08
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
        pre_bullet: {
            default: null,
            type: cc.Prefab
        },
        hero: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.bulletGroup = this
        this.bulletPool = new cc.NodePool()
    },

    creatBullet: function (bullet_nor) {
        let bullet = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bullet = this.bulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            bullet = cc.instantiate(this.pre_bullet)
        }
        bullet.parent = this.node
        var pos = this.hero.getPosition()
        if (bullet_nor == 0)
            bullet.setPosition(cc.v2(pos.x, pos.y + this.hero.height - 30))
        else {
            let bullet2 = null;
            if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                bullet2 = this.bulletPool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                bullet2 = cc.instantiate(this.pre_bullet)
            }
            bullet2.parent = this.node
            bullet.setPosition(cc.v2(pos.x - 30, pos.y + this.hero.height - 30))
            bullet2.setPosition(cc.v2(pos.x + 30, pos.y + this.hero.height - 30))
        }
    },

    onBulletKilled: function (bullet) {
        // enemy 应该是一个 cc.Node
        this.bulletPool.put(bullet); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },

    start() {

    },

    update(dt) {
        // cc.log(this.node.children.length)
    },
});