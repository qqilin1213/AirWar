/*
 * @Author: qqilin1213
 * @Date: 2021-04-03 10:29:11
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-07-02 13:13:39
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
        PlayingGame: {
            default: null,
            type: cc.Node
        },
        pauseGame: {
            default: null,
            type: cc.Node
        },
        overGame: {
            default: null,
            type: cc.Node
        },
        bg1: {
            default: null,
            type: cc.Node
        },
        bg2: {
            default: null,
            type: cc.Node
        },
        hero: {
            default: null,
            type: cc.Node
        },
        bulletGroup: {
            default: null,
            type: require('bulletGroup')
        },
        enemyGroup: {
            default: null,
            type: require('enemyGroup')
        },
        starGroup: {
            default: null,
            type: require('starGroup')
        },
        giftGroup: {
            default: null,
            type: require('giftGroup')
        },
        lab_score: cc.Label,
        lab_gameScore: cc.Label,
        time: 0,
        star1Score: 0,
        star2Score: 0,
        star3Score: 0,
        levelNum: 0,
        bgm: cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        window.game = this
        // 开启碰撞检测系统，未开启时无法检测
        cc.director.getCollisionManager().enabled = true
        this.PlayingGame.active = true
        this.pauseGame.active = false
        this.overGame.active = false
        this.bg1.y = 0
        this.bg2.y = this.bg1.y + this.bg1.height
        this.bgMove()
        this.setTouch()
        this.gameType = 0 //(0:游戏中,1:暂停 2:死亡)
        this.gameTime = 0; // 游戏时长
        this.bulletTime = 0
        this.bullet2Time = 0
        this.bullet_nor = 0
        this.enemyTime = 0
        this.giftTime = 0
        this.scoreNum = 0
        this.starNum = 0
        this.star = []
        // 三类敌机产生的概率  小敌机：60% 中敌机：30% 大敌机：10%
        this.randomNUm = [60, 90, 100]
        // 补给产生概率
        this.random_gift_NUm = [50, 100]
        cc.audioEngine.play(this.bgm, true, 1) // 循环播放
    },

    bgMove: function () {
        this.bg1.y = this.bg1.y - 2
        this.bg2.y = this.bg2.y - 2
        if (this.bg1.y <= -this.bg1.height) {
            this.bg1.y = this.bg2.y + this.bg1.height
        }
        if (this.bg2.y <= -this.bg1.height) {
            this.bg2.y = this.bg1.y + this.bg1.height
        }
    },

    setTouch: function () {

        // 移动飞机
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            //console.log('touchmove')
            var pos_hero = this.hero.getPosition()
            var pos_move = event.getDelta()
            var pos_end = cc.v2(pos_hero.x + pos_move.x, pos_hero.y + pos_move.y)
            // 限制飞机运动在视野可见范围
            if (pos_end.x < -290) {
                pos_end.x = -290
            } else if (pos_end.x > 290) {
                pos_end.x = 290
            }
            if (pos_end.y < -533) {
                pos_end.y = -533
            } else if (pos_end.y > 533) {
                pos_end.y = 533
            }
            if (this.gameType == 0) {
                this.hero.setPosition(pos_end)
            }
        }, this)
    },

    addScore(score) {
        this.scoreNum = this.scoreNum + score
        this.lab_score.string = 'Score : ' + this.scoreNum
    },

    clickBtn(sender, str) {
        let num = this.levelNum
        let scene = String('Level' + num + '_Game')
        cc.director.preloadScene(scene);
        if (str == 'pause') {
            cc.log('点击了暂停按钮')
            this.gameType = 1
            this.pauseGame.active = true
        } else if (str == 'continue') {
            cc.log('点击了继续按钮')
            cc.log(this.gameType)
            this.gameType = 0
            this.pauseGame.active = false
        } else if (str == 'restart') {
            // starGroup.onStarKilled()
            cc.log('点击了重新开始按钮')
            cc.director.loadScene(scene);
        } else if (str == 'backHome') {
            cc.director.loadScene('StartGame');
            cc.log('点击了返回主页按钮')
        } else if (str == 'choice' && this.scoreNum >= this.star2Score) {
            cc.director.preloadScene('LevelSelect');
            cc.director.loadScene('LevelSelect');
            // console.log('ok')
        }
    },

    start() {
        let countTime = cc.find('Canvas/PlayingGame/Text/Time').getComponent(cc.Label);
        countTime.string = this.time + 's';
        this.schedule(() => {
            // 游戏进行才倒计时
            if (this.gameType == 0) {
                this.time--
            }
            countTime.string = this.time + 'S'

            if (this.time == 0) {
                this.gameOver();
                // this.overGame.active = true
                // this.pauseGame.active = false
            }
        }, 1)
    },
    gameOver() {
        let level1 = cc.sys.localStorage.getItem('level1')
        let level2 = cc.sys.localStorage.getItem('level2')
        let level3 = cc.sys.localStorage.getItem('level3')
        this.gameType = 2
        this.overGame.active = true
        this.pauseGame.active = false
        this.lab_gameScore.string = 'Score is ' + this.scoreNum
        if (this.scoreNum >= game.star2Score && this.time == 0) {
            cc.find('Canvas/overGame/Text').getChildByName('success').active = true
        } else cc.find('Canvas/overGame/Text').getChildByName('fail').active = true
        if (this.scoreNum >= this.star1Score && this.scoreNum < this.star2Score) {
            this.starNum = 1
            if (level1 != null) {
                if (this.scoreNum >= level1) {
                    saveGame.saveScore() // 只有挑战成功，保存分数
                    starGroup.creatStar(this.starNum)
                    return
                }
            }
        } else if (this.scoreNum >= this.star2Score && this.scoreNum < this.star3Score) {
            this.starNum = 2
            if (level2 != null) {
                if (this.scoreNum >= level2) {
                    saveGame.saveScore() // 只有挑战成功，保存分数
                    starGroup.creatStar(this.starNum)
                    return
                }
            }
        } else if (this.scoreNum >= this.star3Score) {
            this.starNum = 3
            if (level3 != null) {
                if (this.scoreNum >= level3) {
                    saveGame.saveScore() // 只有挑战成功，保存分数
                    starGroup.creatStar(this.starNum)
                    return
                }
            }
        }
        saveGame.saveScore()
        // cc.sys.localStorage.setItem('level', this.starNum)
        // console.log(this.star)
        // console.log(this.starNum)
        starGroup.creatStar(this.starNum)
    },
    update(dt) {
        this.bgMove()
        var randomNumEnemy = 4
        if (this.gameType == 0) {
            // 游戏中
            this.gameTime++
            if (this.gameTime % 300 == 0) {
                randomNumEnemy = randomNumEnemy + Math.round(this.gameTime / 600)
                if (randomNumEnemy > 20) {
                    randomNumEnemy = 20
                }
                this.randomNUm[0] = this.randomNUm[0] - 2
                this.randomNUm[1] = this.randomNUm[1] - 1
                if (this.randomNUm[0] < 40) {
                    this.randomNUm[0] = 40
                }
                if (this.randomNUm[1] < 75) {
                    this.randomNUm[1] = 75
                }
            }
            this.bulletTime++
            if (this.bulletTime == 8) {
                this.bulletTime = 0
                if (this.gameType == 0) {
                    if (this.bullet_nor == 1) {
                        this.bullet2Time++
                        // 补给有效时间
                        if (this.bullet2Time % 24 == 0)
                            this.bullet_nor = 0
                    }
                    bulletGroup.creatBullet(this.bullet_nor)
                }
            }
            this.enemyTime++
            if (this.enemyTime == 120) {
                this.enemyTime = 0
                // 产生的敌机总数
                var num_random = Math.floor(Math.random() * randomNumEnemy) + 1
                for (let i = 0; i < num_random; i++) {
                    if (this.gameType == 0) { //playing
                        var num = Math.random() * 100
                        if (num < this.randomNUm[0]) {
                            enemyGroup.creatEnemy(1)
                        } else if (num < this.randomNUm[1]) {
                            enemyGroup.creatEnemy(2)
                        } else if (num < this.randomNUm[2]) {
                            enemyGroup.creatEnemy(3)
                        }
                    }
                }
            }
            this.giftTime++
            if (this.giftTime == 100) {
                this.giftTime = 0
                // 产生补给物
                if (this.gameType == 0) { //playing
                    // giftGroup.creatGift(111)
                    var num = Math.random() * 100
                    if (num < this.random_gift_NUm[0]) {
                        giftGroup.creatGift(111)
                    } else if (num < this.random_gift_NUm[1]) {
                        giftGroup.creatGift(112)
                    }
                }
            }
        }
    },
});