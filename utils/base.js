import { Config } from 'config.js'

var app = getApp();

class Base {

  constructor() {

    this.baseRestUrl = Config.restUrl;
  }

  //http请求
  request(params) {

    var that = this;

    var sessionid = '';

    if (app.globalData.sessionId) {
      sessionid = app.globalData.sessionId
    }

    wx.request({
      url: this.baseRestUrl + params.url,
      method: params.type,
      header: {
        'content-type': 'application/json',
        // 'Cookie': 'PHPSESSID=' + that.data.sessionId
        'Cookie': 'PHPSESSID=' + sessionid
      },
      data: params.data,
      success: res => {
        params.sCallback && params.sCallback(res.data)
      },
      fail: res => {
        params.sCallback && params.sCallback(res.data)
      }
    })
  }

}

export { Base }