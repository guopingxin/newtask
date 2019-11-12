// pages/businessmode/pushrepair/pushrepair.js
import { Pushrepair } from './pushrepairmode.js'
var pushrepair = new Pushrepair();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    push:{},
    service:{},
    pushresult: ["未反馈", "推修成功", "推修失败","不确定"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.id = options.listId
    
    that.setData({
      usertype: app.globalData.userinfor.type
    })
    
    pushrepair.pushinfo(that.data.id,res=>{
      console.log(res)
      if (res.status == 1){
        that.setData({
          push: res.push,
          progress: res.schedule
        })

        pushrepair.serviceinfo(res.push.service_id,response=>{
          if (response.status == 1){
            that.setData({
              service: response.service
            })
          }
        })


        pushrepair.taskinfo(res.push.task_id,response=>{
          if (response.status == 1) {
            that.setData({
              task: response.data
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //接单
  submitorder:function(){
    var that = this;
    pushrepair.receive(that.data.id,res=>{

      if(res.status == 1){
        that.onLoad();
      }
      
    })
  },

  //分配作业员
  distribution:function(){

    var that = this
    wx.navigateTo({
      url: './pushdistribution/pushdistribution?id=' + that.data.id,
    })
  }
})