/*
 * @Author: qqilin1213
 * @Date: 2021-07-02 09:05:45
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 13:11:41
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
        pre_gift_bullet: {
            default: null,
            type: cc.Prefab
        },
        pre_gift_life: {
            default: null,
            type: cc.Prefab
        }
    },


    onLoad() {
        window.giftGroup = this
        this.giftGroup_bullet = new cc.NodePool()
        this.giftGroup_life = new cc.NodePool()
    },

    // 制造补给物
    creatGift: function (giftType) {
        // console.log('创建补给')
        let gift = null
        var str = ''
        var pos_gift = cc.v2(0, 0)
        if (giftType == 111) { //创建补给（弹药）
            if (this.giftGroup_bullet.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                gift = this.giftGroup_bullet.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                gift = cc.instantiate(this.pre_gift_bullet)
            }
            str = 'giftGroup_bullet'
            if (game.levelNum == 1) {
                pos_gift.x = 30 + Math.random() * 510
                pos_gift.y = 800 + Math.random() * 100
            }
            if (game.levelNum == 2) {
                pos_gift.x = -289 + Math.random() * 530
                pos_gift.y = 384 + Math.random() * 100
            }
            if (game.levelNum == 3) {
                pos_gift.x = -287 + Math.random() * 550
                pos_gift.y = 413 + Math.random() * 100
            }
        } else if (giftType == 112) { //创建补给（生命）
            if (this.giftGroup_life.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                gift = this.giftGroup_life.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                gift = cc.instantiate(this.pre_gift_life)
            }
            str = 'giftGroup_life'
            if (game.levelNum == 1) {
                pos_gift.x = 50 + Math.random() * 520
                pos_gift.y = 800 + Math.random() * 100
            }
            if (game.levelNum == 2) {
                pos_gift.x = -286 + Math.random() * 530
                pos_gift.y = 413 + Math.random() * 100
            }
            if (game.levelNum == 3) {
                pos_gift.x = -272 + Math.random() * 540
                pos_gift.y = 413 + Math.random() * 100
            }
        }

        gift.parent = this.node
        var js = gift.getComponent(str)
        if (js) {
            js.init()
        }
        gift.setPosition(pos_gift)
        // console.log(pos_gift)
    },

    onGiftKilled: function (gift, giftType) {
        if (giftType == 111) {
            this.giftGroup_bullet.put(gift)
        } else if (giftType == 112) {
            this.giftGroup_life.put(gift)
        }
    },

    start() {

    },

    // update (dt) {},
});