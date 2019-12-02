// pages/businessmode/diseasesurvey/adddiseasetask/adddiseasetask.js
var imgId = 0;
var paizhaoimgId = 0;
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
const recorderManager = wx.getRecorderManager();

import {
  Personalcenter
} from "../../../mine/personalcenter/personalcentermode.js"
var personalcenter = new Personalcenter();
import {
  Config
} from "../../../../utils/config.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //第一类样式成员变量
    leftarrow: true,
    dateTime: null,
    dateTimeArray: null,
    sendTimeFirst: false, //面访时间
    region: ['', '', ''], //面访地址
    relation: ["本人","配偶", '父母', '子女','兄妹'], //面访关系
    relationFirst: false, //成员关系
    positive: ["阳性", "非阳性"], //阳性
    positiveFirst: false,
    imagecell: [],
    paizhaoimagecell: [],

    //第二类样式成员变量
    investigationtype: ["门诊", "住院", "门诊及医院"], //排查类型
    investigationtypeFirst: false,

    showcanvas: false,
    voicetext: "长按录音",
    fileNameTemp: '',
    sub_voice: '',
    hosturl: Config.imageUrl,
    audioarray:'',
    audiosrc:'' //提交语音

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
      title: options.title,
      taskId: options.taskId,
      id: options.id
    })

    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        diseasesurvey.reverseGeocoder(demo, res.latitude, res.longitude, res => {
          that.data.picaddress = res.address;
        })
      },
    })

  },

  onShow: function() {

    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 1] //获取本页面信息栈

    if (prevPage.data.fileNameTemp1 && prevPage.data.isTakepic) {

      prevPage.data.isTakepic = false

      that.data.paizhaoimagecell.push({
        id: paizhaoimgId++,
        path: prevPage.data.fileNameTemp1,
        type: "camera"
      })

      that.data.fileNameTemp = that.data.fileNameTemp + ',' + prevPage.data.fileNameTemp1

      that.setData({
        paizhaoimagecell: that.data.paizhaoimagecell,
      })
    }

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

    if (that.data.leftarrow) {
      that.setData({
        leftarrow: false
      })
    } else {
      that.setData({
        leftarrow: true
      })
    }

  },


  //选择照片方式
  chooseimg: function() {
    var that = this

    wx.showActionSheet({
      itemList: ['打开相册', '拍照'],
      itemColor: '#1a65ff',
      success: res => {
        if (res.tapIndex === 0) {
          // this.data.selectName = 'album'
          this.tukupic();
        } else if (res.tapIndex === 1) {
          this.camerapic();
        }

      }
    })

  },

  //照相机拍照
  camerapic() {

    var that = this
    wx.navigateTo({
      url: '../addphoto/addphoto?address=' + that.data.picaddress,
    })
  },

  //图库选择
  tukupic() {

    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function(res) {

        var tempPicLength = res.tempFilePaths.length;

        console.log("HHHH", res)
        if (tempPicLength + that.data.imagecell.length > 9) {
          res.tempFilePaths = res.tempFilePaths.slice(0, 9 - that.data.imagecell.length)
        }

        that.setData({
          showcanvas: false
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
    } else {

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

        setTimeout(function() {
          wx.showLoading({
            title: '努力生成中...'
          })

          ctx.draw(false, function() {
            wx.canvasToTempFilePath({
              canvasId: 'firstCanvas',
              success: (ress) => {

                that.data.imagecell.push({
                  id: imgId++,
                  path: ress.tempFilePath,
                  type: "tuku"
                })

                callback && callback(that)
              },
              fail: (e) => {
                console.log("AAAAAA", e)
              }
            })
          })

        }, 500)

      }
    })

  },

  //删除照片
  deleteimg: function(e) {

    var that = this;

    if (e.currentTarget.dataset.type == 'paizhaoimagecell') {
      for (var item in that.data.paizhaoimagecell) {
        if (that.data.paizhaoimagecell[item].id == e.currentTarget.id) {
          that.data.paizhaoimagecell.splice(item, 1)
          that.setData({
            paizhaoimagecell: that.data.paizhaoimagecell
          })
          break
        }
      }
    } else {
      for (var item in that.data.imagecell) {
        if (that.data.imagecell[item].id == e.currentTarget.id) {
          that.data.imagecell.splice(item, 1)
          that.setData({
            imagecell: that.data.imagecell
          })
          break
        }
      }
    }

  },

  //预览图片 
  previewImage: function(e) {

    var imgArr = [];
    var previewImagecell = [];
    var index = e.currentTarget.dataset.index;

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 1] //获取本页面信息栈

    prevPage.data.isTakepic = false

    this.data.previewImagecell = this.data.imagecell.concat(this.data.paizhaoimagecell) //数组对象相加

    // a = a.concat(b)

    console.log("hhh", this.data.previewImagecell)

    for (let c of this.data.previewImagecell) {

      console.log(c);
      if (c.type == 'camera') {
        imgArr.push(Config.imageUrl + "/uploads/" + c.path)
      } else {
        imgArr.push(c.path)
      }

    }

    wx.previewImage({
      urls: imgArr,
      current: imgArr[index]
    })
  },

  //语音模块显示
  openvoice: function() {
    var that = this;
    
    that.setData({
      voiceIsshow: true
    })
  },

  //开始录音
  startvoice: function() {
    var that = this;

    wx.showLoading({
      title: '开始录音...',
    })

    that.setData({
      voicetext: '松开结束录音',
      bg: '#eee'
    })
    const options = {
      duration: 60000,
      format: "mp3",
      frameSize: 50
    }
    recorderManager.start(options);
  },

  //结束录音
  endvoice: function() {
    var that = this;

    wx.hideLoading();

    that.setData({
      voicetext: '长按录音',
      bg: 'white'
    })

    recorderManager.stop();
    recorderManager.onStop(res => {
      console.log("hhhhh", res);
      if (res.duration <= 1000) {
        wx.showToast({
          title: '录音时长太短,请重新录音!',
          icon: "none",
          duration: 2000
        })
        return
      }
      that.data.voiceSrc = res.tempFilePath
    })
  },

  //输入框输入
  bindinput(e) {
    var that = this;
    if (e.currentTarget.dataset.type == 'visit_name') {
      that.data.visit_name = e.detail.value
    } else if (e.currentTarget.dataset.type == 'visit_address') {
      that.data.visit_address = e.detail.value
    } else if (e.currentTarget.dataset.type == 'positive_state') {
      that.data.positive_state = e.detail.value
    } else if (e.currentTarget.dataset.type == 'visit_conclusion') {
      that.data.visit_conclusion = e.detail.value
    } else if (e.currentTarget.dataset.type == 'task_name') {
      that.data.task_name = e.detail.value
    } else if (e.currentTarget.dataset.type == 'face_name') {
      that.data.face_name = e.detail.value
    } else if (e.currentTarget.dataset.type == 'face_state') {
      that.data.face_state = e.detail.value
    } else if (e.currentTarget.dataset.type == 'hospital') {
      that.data.hospital = e.detail.value
    } else if (e.currentTarget.dataset.type == 'company') {
      that.data.company = e.detail.value
    } else if (e.currentTarget.dataset.type == 'screen_conclusion') {
      that.data.screen_conclusion = e.detail.value
    } else if (e.currentTarget.dataset.type == 'help_screen_name') {
      that.data.help_screen_name = e.detail.value
    } else if (e.currentTarget.dataset.type == 'help_screen_conclusion') {
      that.data.help_screen_conclusion = e.detail.value
    } else if (e.currentTarget.dataset.type == 'social_security') {
      that.data.social_security = e.detail.value
    } else if (e.currentTarget.dataset.type == 'social_security_screen_conclusion') {
      that.data.social_security_screen_conclusion = e.detail.value
    } else if (e.currentTarget.dataset.type == 'medical_org') {
      that.data.medical_org = e.detail.value
    } else if (e.currentTarget.dataset.type == 'medical_screen_conclusion') {
      that.data.medical_screen_conclusion = e.detail.value
    } else if (e.currentTarget.dataset.type == 'accident_address') {
      that.data.accident_address = e.detail.value
    } else if (e.currentTarget.dataset.type == 'deal_org') {
      that.data.deal_org = e.detail.value
    } else if (e.currentTarget.dataset.type == 'screen_department') {
      that.data.screen_department = e.detail.value
    }
  },


  //语音上传
  uploadvoice() {

    var that = this
    if (that.data.voiceSrc) {
      wx.showToast({
        title: '正在努力上传录音,请稍等...!',
        icon: "none",
        duration: 1500
      })
      personalcenter.upFace("/api/auth/upload", that.data.voiceSrc, res => {
        console.log("语音:", res);
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
        res.data = JSON.parse(jsonStr);
        if (res.data.status == 1) {
          that.data.sub_voice = res.data.data.filename;

          that.data.audioarray = that.data.audioarray + "," + that.data.sub_voice

          wx.showToast({
            title: '上传成功！',
            duration: 1000
          })
          console.log("GGG", that.data.sub_voice)
        }
      })
    } else {
      wx.showToast({
        title: '没有录音文件!',
        duration: 1500
      })
    }
  },

  //提交任务
  addsure() {
    var that = this;

    wx.showLoading({
      title: '正在添加',
    })

    if (that.data.audioarray) {
      that.data.audiosrc = that.data.audioarray.substring(1, that.data.audioarray.length)
    }

    if (that.data.paizhaoimagecell.length > 0) {

      if (that.data.imagecell.length > 0) {

        that.sub_uploadimg(0, that)
      } else {

        that.data.pic = that.data.fileNameTemp.substr(1, that.data.fileNameTemp.length);

        diseasesurvey.sickTaskpull(that, res => {

          wx.hideLoading();

          if (res.status == 1) {

            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            })

            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)

          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            })
          }

        })
      }


    } else {
      if (that.data.imagecell.length > 0) {

        that.sub_uploadimg(0, that)
      } else {
        that.data.pic = '';

        diseasesurvey.sickTaskpull(that, res => {

          wx.hideLoading()
          if (res.status == 1) {

            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            })

            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)

          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 1500
            })
          }

        })
      }

    }

  },


  //调查材料图片递归
  sub_uploadimg(i, that) {

    if (i < that.data.imagecell.length) {

      that.sub_upp(that, i, res => {
        that.sub_uploadimg(i + 1, that)
      })

    } else {


      that.data.pic = that.data.fileNameTemp.substr(1, that.data.fileNameTemp.length);

      console.log("pic", that.data.pic, that.data.fileNameTemp);

      diseasesurvey.sickTaskpull(that, res => {

        wx.hideLoading();
        if (res.status == 1) {

          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500
          })

          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)

        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 1500
          })
        }

      })
    }
  },

  //调查材料图片递归
  sub_upp(that, i, callback) {

    that.data.mediaSrc = that.data.imagecell[i].path

    personalcenter.upFace("/api/auth/upload", that.data.mediaSrc, res => {
      var jsonStr = res.data;
      jsonStr = jsonStr.replace(" ", "");
      jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
      res.data = JSON.parse(jsonStr);
      if (res.data.status == 1) {
        that.data.fileName = res.data.data.filename
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

  },



})