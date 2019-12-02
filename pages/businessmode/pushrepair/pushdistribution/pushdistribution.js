// pages/businessmode/pushrepair/pushdistribution/pushdistribution.js
import { Pushrepair } from '../pushrepairmode.js';
var pushrepair = new Pushrepair();
import {Checkloss} from '../../checkloss/checklossmode.js'
var checkloss = new Checkloss();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    that.data.id = options.id;
    that.data.mode = options.mode

    pushrepair.taskslist(res=>{
      if(res.status == 1){
        that.setData({
          taskslist:res.data
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

  //分配作业员
  submitdistribution:function(e){
    var that = this

    if (e.detail.value.radiogroup){

      if (that.data.mode == 'checkloss'){

        var url = "/api/work/allot"
        var key = 'survey'

      }else{

        var url = "/task/push/allot"
      }

      pushrepair.allot(url, that.data.id, e.detail.value.radiogroup,key,res=>{
        if(res.status == 1){
          wx.showToast({
            title: '分配成功!',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function(){
            // wx.navigateBack({
            //   delta:1
            // })
            wx.switchTab({
              url: '/pages/home/home',
            })
          },1000)

          
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500
          })
        }
      })
    }else{
      wx.showToast({
        title: '请选择一个作业员!',
        icon:'none',
        duration:1500
      })
    }
  }
})