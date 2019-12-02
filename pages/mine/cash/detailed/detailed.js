// 明细
import {Cash} from '../cashmode.js';
var cash = new Cash();

Page({
  data: {
    showRecord: true
  },
  onLoad: function (options) {
    
    var that = this

    cash.detail(that,res=>{
      that.setData({
        details: res.data
      })
      if (res.data.length == 0) {
        that.setData({
          showRecord: false
        })
      } else {
        that.setData({
          showRecord: true
        })
      }
    })
  },

})