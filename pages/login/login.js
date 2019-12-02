// pages/login/login.js
import {LoginMode} from "./loginmode.js";
var login = new LoginMode();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var ddd = ",9XIcg0RmNR5Z6LxoAlZ2QqgcB3E8URHWDoz7uvOC.mpga";
    ddd = ddd.substring(1,ddd.length);
    console.log("ddd",ddd);
  },

  onShow:function(){
    var that = this;
    that.setData({
      phone: wx.getStorageSync('userphone'),
      psw: wx.getStorageSync('userpwd')
    })
  },

  formSubmit:function(e){
    var that = this;
    that.setData({
      islogin:false
    })
    that.data.phone = e.detail.value.phone;
    that.data.psw = e.detail.value.psw;
    login.login(that,res=>{
      console.log(res)
      if(res.status == 1){
        wx.setStorageSync('userphone', res.data.mobile)
        wx.setStorageSync('userpwd', that.data.psw)
        app.globalData.userinfor = res.data;
        // app.globalData.sessionId = res.data.session_id;
        that.data.islogin = true;
        
        wx.switchTab({
          url: '../home/home',
        })

      }else{
        wx.showToast({
          title: res.msg,
          icon:'none',
          duration:2000
        })
        that.setData({
          islogin: true
        })
      }
    })
  },

  //忘记密码
  toeditPsw:function(){
    wx.navigateTo({
      url: '../mobilePsw/mobilePsw',
    })
  }
})