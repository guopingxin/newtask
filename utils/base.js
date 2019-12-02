import { Config } from 'config.js'

var app = getApp();

class Base {

  constructor() {

    this.baseRestUrl = Config.restUrl;
  }

  //http请求
  request(params) {

    var that = this;

    // var sessionid = '';
    // if (app.globalData.sessionId) {
    //   sessionid = app.globalData.sessionId
    // }

    wx.request({
      url: this.baseRestUrl + params.url,
      method: params.type,
      header: {
        // 'content-type': 'application/json',
        // 'Cookie': 'PHPSESSID=' + sessionid
        'Accept': 'application/json',
        'Authorization': params.auth ? 'Bearer ' + app.globalData.userinfor.api_token : ''
      },
      data: params.data,
      success: res => {
      
        if (res.data.msg.match('Token已过期或失效')) {
          wx.showModal({
            title: '提示',
            content: 'token过期或已失效，请前往登录页面重新登录',
            success: res => {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              }
            }
          })
        }

        params.sCallback && params.sCallback(res.data)
      },
      fail: res => {
        wx.showToast({
          title: '请求超时',
          icon: 'none'
        })
        params.sCallback && params.sCallback(res.data)
      }
    })
  }

}

export { Base }