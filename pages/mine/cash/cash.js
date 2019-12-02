// 提现
var globalList = getApp().globalData;

import {Cash} from './cashmode.js'
var cash = new Cash();

var app = getApp();
Page({
  data: {
    btnTrigger: false,
    // 两个input框的值
    name: '',
    cashNum: '',
    withdrawalLoding: false,
    showSuccess: false, // 是否显示提现成功页面
    cashData: null
  },
  onLoad: function(options) {
    
    var that = this;
    that.data.openid = app.globalData.userinfor.openid

    cash.gold(res=>{
      that.setData({
        // 我的余额
        cashData: res.data.gold
      })
    })
  },

  // 全部提现
  onAllCashTap: function(e) {
    this.setData({
      cashNum: parseInt(this.data.cashData)
    })

    this.checkVal()
  },
  // input框中的name
  getName: function(e) {
    this.setData({
      name: e.detail.value
    })
    this.checkVal()
  },
  // input框中的提现金额
  getNumber: function(e) {
    let value = this.validateNumber(e.detail.value)
    this.setData({
      cashNum: value
    })
    this.checkVal()
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  // 查看input中是否有值
  checkVal: function(e) {
    if (this.data.name !== '' && this.data.cashNum !== '') {
      this.setData({
        btnTrigger: true
      })
    } else {
      this.setData({
        btnTrigger: false
      })
    }
  },
  // 提现
  onCashTap: function(e) {
    var that = this
    that.setData({
      withdrawalLoding: true,
      btnTrigger: false
    })

    cash.withdrawal(that,res=>{
      if (res.status == 1) {
        that.setData({
          showSuccess: true
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500,
          success: res => {
            setTimeout(function () {
              //要延时执行的代码
              that.setData({
                name: '',
                cashNum: '',
                withdrawalLoding: false
              });
              that.onLoad()
            }, 1500)
          }
        })
      }
    })
  },
  // 提现明细
  toCashDetails: function(e) {
    wx.navigateTo({
      url: 'detailed/detailed',
    })
  },
  // 提现成功返回到个人中心页面
  goBackMine: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  // 提现成功后进入继续提现页面
  goCash: function(e) {
    this.setData({
      showSuccess: false,
      name: '',
      cashNum: '',
      withdrawalLoding: false
    })
    this.onLoad()
  }
})