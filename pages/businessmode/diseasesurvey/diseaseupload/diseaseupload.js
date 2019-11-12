// pages/businessmode/diseasesurvey/diseaseupload/diseaseupload.js
var imgId = 0;
var utils = require('../../../../utils/util.js');
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'OEIBZ-MF2HD-B6U4J-HRVAP-AASNO-CMBEQ'
})
import {
  Diseaseupload
} from './diseaseuploadmode.js'
var diseaseupload = new Diseaseupload();

import { Diseasesurvey } from '../diseasesurveymode.js'
var diseasesurvey = new Diseasesurvey();

import {
  Personalcenter
} from "../../../mine/personalcenter/personalcentermode.js"
var personalcenter = new Personalcenter();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagecell: [],
    fileNameTemp:'',
    showcanvas:false,
    isInput:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    var type = options.type;
    // that.data.type1 = options.type;  
    that.data.item = JSON.parse(options.item);

    that.setData({
      type: type
    })

    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        diseaseupload.reverseGeocoder(demo, res.latitude, res.longitude, res => {
          that.data.address = res.address;
        })
      },
    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  //选择照片
  chooseimg: function() {
    var that = this

    wx.getLocation({
      type: "gcj02",
      success: function(res) {

      },
    })
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        console.log("ee", res)

        var tempPicLength = res.tempFilePaths.length;

        if (tempPicLength + that.data.imagecell.length > 9) {
          res.tempFilePaths = res.tempFilePaths.slice(0, 9 - that.data.imagecell.length)
        }

        console.log(res.tempFilePaths)

        that.uploadimg(0, res.tempFilePaths)


      },
      fail: function(res) {

      }
    })
  },

  //删除照片
  deleteimg: function(e) {

    var that = this;
    for (var item in that.data.imagecell) {
      if (that.data.imagecell[item].id == e.currentTarget.id) {
        that.data.imagecell.splice(item, 1)
        that.setData({
          imagecell: that.data.imagecell
        })
        break
      }
    }
  },

  //预览图片 
  previewImage: function(e) {

    var imgArr = [];
    var index = e.currentTarget.dataset.index;
    // var imgindex = e.currentTarget.dataset.imgindex

    console.log("hhh", this.data.imagecell)

    for (let c of this.data.imagecell) {

      console.log(c);
      imgArr.push(c.path)

    }

    wx.previewImage({
      urls: imgArr,
      current: imgArr[index]
    })
  },

  //画布递归
  uploadimg(i, data) {
    var that = this;
    if (i < data.length) {
      that.getImage(i, data, res => {
        that.setData({
          imagecell: that.data.imagecell,
          showcanvas:true
        })
        that.uploadimg(i + 1, data)
      })
    }
  },


  //画布递归
  getImage(i, data,callback) {

    var that = this;
    //获取图片详细信息
    wx.getImageInfo({
      src: data[i],
      success: (response) => {

        let date = utils.formatTime(new Date());
        let ctx = wx.createCanvasContext('firstCanvas')

        that.setData({
          canvasHeight: response.height,
          canvasWidth: response.width
        })

        //将图片src放到cancas内，宽高为图片大小
        ctx.drawImage(data[i], 0, 0, response.width, response.height)
        //将声明的时间放入canvas
        ctx.setFontSize(50) //注意：设置文字大小必须放在填充文字之前，否则不生效
        ctx.setFillStyle('blue')
        ctx.fillText(date, 20, 80)
        ctx.fillText(that.data.address, 20, 160)
        // ctx.strokeText(date, 0, 30)


        ctx.draw(false, function() {
          wx.canvasToTempFilePath({
            canvasId: 'firstCanvas',
            success: (ress) => {

              that.data.imagecell.push({
                id: imgId++,
                path: ress.tempFilePath
              })

              callback && callback(that)

            },
            fail: (e) => {
              console.log(e)
            }
          })
        })
      }
    })

  },


  //内容输入框
  inputtext:function(e){
    this.data.content = e.detail.value;

    if(this.data.content.length ==0){

      this.setData({
        // type:this.data.type1,
        isInput:true
      })
    }else{
      this.setData({
        // type:-1,
        isInput:false
      })
    }
  },

  //补全资料提交
  subinfor:function(e){
    console.log("eee",e);
    var that = this;
    that.data.id = that.data.item.sickness_id;
    that.data.step = that.data.item.step;

    if (that.data.imagecell) {
      that.sub_uploadimg(0, that)
    }else{
      that.data.pic = '';
      diseasesurvey.finish(that, res => {
        console.log("jjj", res);
      })
    }
    
  },

  //补全资料递归
  sub_uploadimg(i,that){

    if (i < that.data.imagecell.length) {

      that.sub_upp(that, i, res => {
        that.sub_uploadimg(i + 1, that)
      })

    } else {
      that.data.pic = that.data.fileNameTemp.substr(1, that.data.fileNameTemp.length);
      
      diseasesurvey.finish(that,res=>{
        if(res.status == 1){
          wx.showToast({
            title: '资料提交成功!',
            icon:"none",
            duration:1500
          })

          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },1500)
        }else{
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500
          })

        }
      })
    }
  },

  //图片上传
  sub_upp(that, i, callback){

    that.data.mediaSrc = that.data.imagecell[i].path

    personalcenter.upFace("/task/sickness/uploads", that.data.mediaSrc, res => {
      var jsonStr = res.data;
      jsonStr = jsonStr.replace(" ", "");
      jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
      res.data = JSON.parse(jsonStr);
      if (res.data.status == 1) {
        that.data.fileName = res.data.file_name
        console.log(that.data.fileName)

        that.data.fileNameTemp = that.data.fileNameTemp + ',' + that.data.fileName
        callback(that.data.fileNameTemp)

      } else if (res.data.status == -2) {
        wx.hideLoading()
        wx.showModal({
          title: '文件大于2M',
          content: '',
        })
      }
    })

  }

})