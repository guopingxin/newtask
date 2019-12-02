import {
  Personalcenter
} from "./personalcentermode.js";
import {
  Config
} from '../../../utils/config.js'
var personalcenter = new Personalcenter()

var app = getApp();

// pages/mine/personalcenter/personalcenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showimg: true,
    headimg1: "",
    name1: "昵称",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this

    var userinfor = app.globalData.userinfor;

    if (userinfor.face) {
      that.setData({
        headimg: Config.restUrl + "/uploads/" + userinfor.face
      })
    } else {
      that.setData({
        // headimg: 'https://6661-fanqizhalianmeng-8ygjc-1300247030.tcb.qcloud.la/task/head-portrait.png?sign=97ff61233234ad70e6bf1bbf84f23b75&t=1571122862'
        headimg: "/images/head-portrait.png"
      })
    }

    if (userinfor.nickname) {
      that.setData({
        name: userinfor.nickname
      })
    }

    that.setData({
      userinfor: userinfor
    })

  },



  onShow: function() {

    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 1] //获取本页面信息栈

    if (prevPage.name) {
      that.setData({
        name: prevPage.name
      })
    }
  },

  //选择照片
  chooseimg: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log("rrr", res);
        that.setData({
          headimg: res.tempFilePaths[0],
          headimg1: res.tempFilePaths[0]
        })

      },
      fail: function(res) {
        console.log(res);
      }
    })
  },

  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //设置姓名
  setusername: function() {
    var that = this;
    wx.navigateTo({
      url: './setname/setname?name=' + that.data.name,
    })
  },

  submitinfor: function(e) {

    var that = this;

    // if(that.data.userinfor.face){
    //   that.data.headimg = Config.restUrl + "/uploads/face/" + that.data.userinfor.face
    // }else{

    // }

    that.data.id = that.data.userinfor.id;

    wx.showLoading({
      title: '正在努力上传中...',
    })

    if (that.data.headimg1) {

      //  /task/index/upFace
      personalcenter.upFace("/api/auth/upload",that.data.headimg1, res => {

        console.log("res", res);
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
        res.data = JSON.parse(jsonStr);


        if (res.data.status == 1) {
          that.data.file_name = res.data.data.filename;
          personalcenter.taskEdit(that, res => {
            wx.hideLoading();
            if (res.status == 1) {

              that.data.userinfor.face = 'face/'+that.data.file_name;
              that.data.userinfor.nickname = that.data.name;
              // wx.setStorageSync("userinfor", that.data.userinfor);
              app.globalData.userinfor = that.data.userinfor

              wx.showToast({
                title: '修改成功!',
                duration:1500
              })

              setTimeout(function(){
                wx.navigateBack({
                  delta: 1,
                })
              },1500)   
              
            } else {
              wx.showToast({
                title: res.msg,
                icon: "none",
                duration: 2000
              })
            }
          })
        }
      })

    } else {

      that.data.file_name = '';
      personalcenter.taskEdit(that, res => {
        console.log(res)
        if (res.status == 1) {
          that.data.userinfor.face = that.data.file_name;
          that.data.userinfor.nickname = that.data.name;
          // wx.setStorageSync("userinfor", that.data.userinfor);

          app.globalData.userinfor = that.data.userinfor;

          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          })
        }
      })
    }

  }
})