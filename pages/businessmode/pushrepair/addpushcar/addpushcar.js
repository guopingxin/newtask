// pages/businessmode/pushrepair/addpushcar/addpushcar.js
import { Pushrepair} from '../pushrepairmode.js'
var pushrepair = new Pushrepair();

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

  onShow:function(){

    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 1] //获取本页面信息栈

    if (prevPage.data.temp) {

      that.setData({
        brandId: prevPage.data.temp.seriesId,
        carmode: prevPage.data.temp.seriesName
      })
    }
  },

  //添加推修
  addpushcase: function(e) {

    var that = this;
    var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
    var reCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
    that.data.username = e.detail.value.username;
    that.data.phone = e.detail.value.phone;
    that.data.carnum = e.detail.value.carnum;
    // that.data.carmode = e.detail.value.carmode;
    that.data.beizhu = e.detail.value.beizhu;

    if (that.data.username) {
      if (that.data.phone && regPhone.test(that.data.phone)) {
        if (that.data.carnum && reCar.test(that.data.carnum)) {
          if (that.data.carmode) {
            pushrepair.addpushcase(that,res=>{
              if (res.status == 1){
                wx.showToast({
                  title: '添加成功!',
                })

                setTimeout(function(){
                  wx.navigateBack({
                    delta:1
                  })
                },3000)

              }else{
                wx.showToast({
                  title: res.msg,
                  icon:'none',
                  duration:1500
                })
              }
            })


          } else {
            wx.showToast({
              title: '车型不能为空!',
              icon: 'none',
              duration: 1500
            })
          }
        } else {
          wx.showToast({
            title: '车牌号输入不正确!',
            icon: 'none',
            duration: 1500
          })
        }
      } else {
        wx.showToast({
          title: '联系电话输入不正确!',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '联系人不能为空!',
        icon: 'none',
        duration: 1500
      })
    }
  },

  //选择车型
  onselectedcar:function(){
    wx.navigateTo({
      url: './addbrand/addbrand',
    })
  }

})

