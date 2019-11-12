// pages/mobilePsw/mobilePsw.js
import {
  MobilePswmode
} from './mobilePswmode.js'

var mobilePswmode = new MobilePswmode();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "发送验证码",
    phoneNum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getPhone: function (e) {

    this.setData({
      phoneNum: e.detail.value
    })
  },

  getCode: function (e) {

    var that = this;
    var num = 60
    var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/

    if (regPhone.test(that.data.phoneNum)) {

      mobilePswmode.setCode(that.data.phoneNum, res => {

        if (res.status == 1) {
          wx.showToast({
            title: '验证码已发送!',
            icon: 'none',
            duration: 2000
          })

          that.setData({
            code: num + "s"
          })

          that.data.time = setInterval(function () {
            num--;
            if (num < 1) {
              that.setData({
                code: "发送验证码"
              })
              clearInterval(that.data.time)
            } else {
              that.setData({
                code: num + "s"
              })
            }
          }, 1000)

        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请核对您输入的手机号!',
        icon: 'none',
        duration: 2000
      })
    }

  },


  submitpsw: function (e) {
    var that = this;
    var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/

    if (regPhone.test(e.detail.value.mobile)) {

      if (e.detail.value.code) {

        if (e.detail.value.psw1 && e.detail.value.psw1.length > 5) {

          if (e.detail.value.psw1 == e.detail.value.psw2) {

            that.data.psw2 = e.detail.value.psw2;
            that.data.psw1 = e.detail.value.psw1;
            that.data.mobile = e.detail.value.phoneNum;
            that.data.code = e.detail.value.code;

            mobilePswmode.setPwd(that, res => {

              if (res.status == 1) {
                wx.redirectTo({
                  url: '../login/login',
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else {
            wx.showToast({
              title: '两次密码输入不一致!',
              icon: 'none',
              duration: 2000
            })
          }

        } else {

          wx.showToast({
            title: '密码不能为空!',
            icon: 'none',
            duration: 2000
          })
        }

      } else {

        wx.showToast({
          title: '验证码不能为空!',
          icon: 'none',
          duration: 2000
        })
      }

    } else {
      wx.showToast({
        title: '手机号格式不正确!',
        icon: 'none',
        duration: 2000
      })
    }
  },

 
})