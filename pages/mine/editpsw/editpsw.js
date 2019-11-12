// pages/mine/editpsw/editpsw.js
import {
  Editpsw
} from './editpswmode.js'
var editpsw = new Editpsw();

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

  },

  toEdit: function(e) {

    var that = this;

    console.log(e)

    if (e.detail.value.older.length < 6) {
      wx.showToast({
        title: '原始密码输入不正确!',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (e.detail.value.new.length < 6) {
      wx.showToast({
        title: '新密码不能小于6位!',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (e.detail.value.new != e.detail.value.renew) {
      wx.showToast({
        title: '两次密码不一致!',
        icon: 'none',
        duration: 2000
      })
      return
    }

    that.data.older = e.detail.value.older
    that.data.new = e.detail.value.new
    that.data.renew = e.detail.value.renew

    editpsw.setPassword(that, res => {
      if (res.status == 1) {

        wx.showToast({
          title: '修改成功!',
          icon: "none",
          duration: 1000
        })

        setTimeout(function () {
          wx.reLaunch({
            url: '../../login/login',
          })
        }, 1000)

      } else {

        wx.showToast({
          title: res.data.msg,
          icon: "none",
          duration: 2000
        })
      }
    })
  },
})