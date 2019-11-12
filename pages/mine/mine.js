// pages/mine/mine.js
var app = getApp();

import {
  Config
} from '../../utils/config.js';
import {
  Personalcenter
} from './personalcenter/personalcentermode.js';

var personalcenter = new Personalcenter();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      hostName: Config.restUrl
    })

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.setData({
      userinfor: app.globalData.userinfor
    })
  },

  //个人编辑
  personalcenter: function() {
    wx.navigateTo({
      url: './personalcenter/personalcenter',
    })
  },

  //显示退出登录框
  logoutModal: function() {
    this.setData({
      logOut: true
    })
  },

  //退出登录
  logOutL: function() {
    var that = this;
    personalcenter.logOut(res => {
      if (res.status == 1) {
        wx.removeStorageSync('userphone');
        wx.removeStorageSync('userpwd');
        wx.reLaunch({
          url: '../login/login',
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  //取消登录
  cancelModal: function() {
    this.setData({
      logOut: false
    })
  },

  //数据统计
  datastatistics: function() {
    wx.navigateTo({
      url: './datastatistics/datastatistics',
    })
  },

  //微信解绑
  unbindWX: function() {
    var that = this
    wx.showLoading({
      title: '解绑中...',
    })

    personalcenter.unbindWX(res => {

      if (res.status == 1) {
        wx.showToast({
          title: '解绑成功',
        })
        var temp = 'userinfor.openid'
        that.setData({
          [temp]: false
        })

      } else {
        wx.showModal({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading()
    })
  },

  //绑定微信
  bindWX: function() {
    var that = this
    wx.showLoading({
      title: '绑定中...',
    })
    wx.login({
      success: res => {
        personalcenter.bindWX(res.code, response => {
          if (res.status == 1) {

            app.globalData.openid = res.openid;
            wx.showToast({
              title: '绑定成功',
              success: res => {
                setTimeout(function () {
                  wx.navigateTo({
                    url: 'cash/cash'
                  })
                  that.onLoad()
                }, 1000)
              }
            })
            var temp = 'userinfor.openid'
            that.setData({
              [temp]: true
            })

          } else if (res.status == -2) {
            wx.showModal({
              title: '该微信已被绑定到其他帐号',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showModal({
              title: response.msg,
              icon: 'none',
              duration: 2000
            })
          }
          wx.hideLoading()
        })
      }
    })
  },

  //我的钱包
  toCashWithdrawal: function() {
    var that = this
    if (that.data.userinfor.openid) {
      wx.navigateTo({
        url: 'cash/cash'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '微信绑定后才能执行此操作，是否进行微信绑定？',
        success(res) {
          if (res.confirm) {
            that.bindWX()
          } else if (res.cancel) {}
        }
      })
    }
  },

  //修改密码
  tempw:function(){
    wx.navigateTo({
      url: './editpsw/editpsw',
    })
  }

})