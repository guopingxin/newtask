// pages/businessmode/diseasesurvey/diseasetask/diseasetask.js
var imgId = 0;
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'OEIBZ-MF2HD-B6U4J-HRVAP-AASNO-CMBEQ'
})
import dateTimePicker from '../../../../utils/dateTimePicker.js'
var utils = require('../../../../utils/util.js');
import {
  Diseasesurvey
} from '../diseasesurveymode.js'

var diseasesurvey = new Diseasesurvey();

import {Config} from "../../../../utils/config.js"

const myAudio = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //第一类样式成员变量
    dateTime: null,
    dateTimeArray: null,
    sendTimeFirst: false, //面访时间
    region: ['', '', ''], //面访地址
    relation: ["配偶", '父子', '母子'], //面访关系
    relationFirst: false, //成员关系
    positive: ["阳性", "非阳性"], //阳性
    positiveFirst: false,
    imagecell: [],
    

    //第二类样式成员变量
    investigationtype: ["门诊", "住院", "门诊及医院"], //排查类型
    investigationtypeFirst: false,

    showcanvas: false,
    isdetail:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear)
    console.log(obj)

    that.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      // title:(JSON.parse(options.item)).name,
      // taskId: (JSON.parse(options.item)).sickness_task_id,
      // tasklist: (JSON.parse(options.item)).taskRecord,
      reject: options.reject,
      hosturl: Config.imageUrl,
      title:options.name,
      recordid: options.recordid,
      taskId:options.sickness_task_id   //添加记录里的每一项id
    })

    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        diseasesurvey.reverseGeocoder(demo, res.latitude, res.longitude, res => {
          that.data.picaddress = res.address;
        })
      },
    })

  },

  onShow:function(){

    var that = this;
    that.data.key ="sickness"
    console.log("that.data.recordid", that.data.recordid);
    diseasesurvey.recordlist(that.data.recordid,res=>{
      if (res.status == 1){
        console.log(res)
        that.setData({
          tasklist: res.data,
          
        })  
        }
    })


    // diseasesurvey.sicknessinfo(that.data.id,that,res=>{
    //   if(res.status == 1){
        
    //     for(var item in res.sickTask){
          
    //       if (res.sickTask[item].id == that.data.recordid){
    //         that.setData({
    //           title: res.sickTask[item].name,
    //           taskId: res.sickTask[item].sickness_task_id,
    //           recordeid: res.sickTask[item].id,
    //           tasklist: res.sickTask[item].taskRecord,
    //         })
    //       }
    //     }
        
    //   }
    // })
  },


  //时间选择器(年-月-日 时-分-秒) 改变列
  changeDateTimeColumn(e) {
    console.log(e)
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray

    arr[e.detail.column] = e.detail.value
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr,
      sendTimeFirst: true
    })
  },

  //时间选择器
  changedateTime(e) {
    console.log(e)
    this.setData({
      dateTime: e.detail.value,
      sendTimeFirst: true
    })
  },

  //省市区选择
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  //普通选择器
  bindOrdinaryChange: function(e) {
    console.log(e);
    if (e.currentTarget.dataset.item == 'relation') {
      this.setData({
        relationFirst: true,
        relationinddex: e.detail.value
      })
    } else if (e.currentTarget.dataset.item == 'positive') {
      this.setData({
        positiveFirst: true,
        positiveinddex: e.detail.value
      })
    } else if (e.currentTarget.dataset.item == 'investigationtype') {
      this.setData({
        investigationtypeFirst: true,
        investigationtypeinddex: e.detail.value
      })
    }

  },

  toEdit: function(e) {
    var that = this;
    var recordindex = e.currentTarget.dataset.index;
    

    if (!that.data.isdetail) {

      var sicknessdata = e.currentTarget.dataset.sicknessdata;
      sicknessdata = JSON.parse(sicknessdata)

      console.log("fff", sicknessdata)

      that.setData({
        isdetail:true,
        sicknessdata: sicknessdata,
        recordindex: recordindex
      })
    } else {
      that.setData({
        isdetail: false
      })
    }

  },

  chooseimg: function() {
    var that = this

    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        var tempPicLength = res.tempFilePaths.length;
        if (tempPicLength + that.data.imagecell.length > 9) {
          res.tempFilePaths = res.tempFilePaths.slice(0, 9 - that.data.imagecell.length)
        }

        that.setData({
          showcanvas:false
        })

        that.canvas_uploadimg(0, res.tempFilePaths);

      },
      fail: function(res) {

      }
    })
  },

  //画布递归
  canvas_uploadimg: function(i, data) {
    var that = this;
    if (i < data.length) {
      that.getImage(i, data, res => {
        that.canvas_uploadimg(i + 1, data)
      })
    }else{

      wx.hideLoading();
      that.setData({
        imagecell: that.data.imagecell,
        showcanvas: true
      })

    }
  },

  //画布递归
  getImage(i, data, callback) {

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
        ctx.fillText(that.data.picaddress, 20, 160)
        // ctx.strokeText(date, 0, 30)

        setTimeout(function(){  
          wx.showLoading({
            title: '努力生成中...'
          })

          ctx.draw(false, function () {
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
                console.log("AAAAAA", e)
              }
            })
          })

        },500)
        
      }
    })

  },

  //删除照片
  deleteimg: function (e) {

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
  previewImage: function (e) {

    var imgArr = [];
    var index = e.currentTarget.dataset.index;
    // var imgindex = e.currentTarget.dataset.imgindex

    console.log("hhh", this.data.sicknessdata.image)

    for (let c of this.data.sicknessdata.image) {

      console.log(c);
      imgArr.push( Config.imageUrl+"/uploads/"+c.path)

    }

    wx.previewImage({
      urls: imgArr,
      current: imgArr[index]
    })
  },

  //添加记录
  addRecord(){
    wx.navigateTo({
      url: '../adddiseasetask/adddiseasetask?title='+this.data.title+'&taskId='+this.data.taskId+"&id="+this.data.recordid,
    })
  },

  //删除记录
  detelerecord(e){
    var that = this;
    var id = e.currentTarget.dataset.taskid;
    diseasesurvey.deleteRecord(id,res=>{
      if (res.status == 1){
        wx.showToast({
          title: '删除成功!',
          duration: 1000
        })

        that.data.tasklist.forEach((item,index)=>{
          if(id == item.id){
            that.data.tasklist.splice(index,1)
          }
        })

        that.setData({
          tasklist:that.data.tasklist
        })

      }else{
        wx.showToast({
          title: res.msg,
          icon:'none',
          duration: 1000
        })
      }
      
    })
  },

  //播放语音
  playvoice(e){

    
    myAudio.src = Config.imageUrl + "/uploads/" + e.currentTarget.dataset.voicesrc;
    console.log("ggg", myAudio.src)
    myAudio.play();

  }

})