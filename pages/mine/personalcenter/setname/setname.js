// pages/mine/personalcenter/setname/setname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    noedit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      name:options.name
    })
  },

  backPage: function () {

    wx.navigateBack({
      delta: 1
    })
  },

  deletetext:function(){
    var that = this;
    that.setData({
      name:''
    })
  },

  inputname:function(e){
    var that = this;
    var name = e.detail.value
    if(name != that.data.name){
      that.setData({
        noedit:true
      })
    }else{
      that.setData({
        noedit: false
      })
    }
  },

  setname:function(e){

    if (e.detail.value.name){

      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]     //获取上一个页面信息栈

      prevPage.setData({
        name: e.detail.value.name
      })

      wx.navigateBack({
        delta: 1
      })
      
    }else{
      wx.showToast({
        title: '名字不能为空!',
        icon:"none",
        duration:2000
      })
    }
  }

 
})