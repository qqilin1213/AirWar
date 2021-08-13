/*
 * @Author: qqilin1213
 * @Date: 2021-04-06 21:55:16
 * @LastEditors: qqilin1213
 * @LastEditTime: 2021-04-06 21:56:16
 */

'use strict';
const app = require('tcb-admin-node');
const tcb_config = {
  env: 'planegame-6gggl4n18210f8c5'
};
app.init(tcb_config).auth();
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
};