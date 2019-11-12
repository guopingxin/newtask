// pages/businessmode/diseasesurvey/diseasesurvey.js
var imgId = 0;
const recorderManager = wx.getRecorderManager();
import {
  Diseasesurvey
} from './diseasesurveymode.js'
var diseasesurvey = new Diseasesurvey();
var app = getApp();
import {
  Pushrepair
} from '../pushrepair/pushrepairmode.js'
var pushrepair = new Pushrepair()
import {
  Personalcenter
} from "../../mine/personalcenter/personalcentermode.js"
var personalcenter = new Personalcenter();
import {
  Config
} from "../../../utils/config.js"

var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: 'OEIBZ-MF2HD-B6U4J-HRVAP-AASNO-CMBEQ'
})

import {
  Diseaseupload
} from './diseaseupload/diseaseuploadmode.js'
var diseaseupload = new Diseaseupload();

var utils = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: 0,
    diseasestep: ['全部任务', '基本信息', '相关资料', '机构回复'],
    diseaselist: [],
    tasklist: [],
    basetitle: ['患者成员信息', '申请人信息'],
    currentTab: 0,
    baselist: ['', '', '', '', '', '', '', '', '', ''],
    imgdatalist: [],
    voicedatalist: ['', ''],
    region: ['陕西省', '西安', '雁塔区'],
    regionvalue: ["", "", ""],
    giveup: true,
    giveupresult: '',
    imagecell: [],
    voiceIsshow: false,
    voicetext: "长按录音",
    fileNameTemp: '',
    isreplyshow: true,
    address: '',
    hostName: Config.restUrl,
    showcanvas: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    that.data.listid = options.listId

    that.setData({
      address: options.province + "-" + options.city
    })

    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        diseaseupload.reverseGeocoder(demo, res.latitude, res.longitude, res => {
          that.data.picaddress = res.address;
        })
      },
    })

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this

    diseasesurvey.sicknessinfo(that.data.listid, res => {
      that.setData({
        diseaselist: res.data,
        tasklist: res.step
      })

      that.setData({
        imgdatalist: res.data.data.split(",")
      })

      // for (let i in that.data.imgdatalist) {
      //     that.data.imagecell.push({
      //       id: imgId++,
      //       path: that.data.imgdatalist[i]
      //     })

      //   console.log("ff", that.data.imgdatalist[i].substring(0, 4));
        
      //   }

      // that.setData({
      //   imagecell: that.data.imagecell
      // })

    })

    that.data.taskid = app.globalData.userinfor.id
    pushrepair.taskinfo(that.data.taskid, res => {
      that.setData({
        taskinfo: res.data
      })
    })


  },

  //顶部选项卡
  selectdiseasestep: function(e) {

    var that = this;
    that.setData({
      first: e.currentTarget.id
    })
  },

  //进入任务
  todetail: function(e) {
    console.log(e);
    var index = e.currentTarget.id;
    var item = e.currentTarget.dataset.item;

    if (index == "0") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "1") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "2") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "3") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "4") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "5") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "6") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    } else if (index == "7") {
      wx.navigateTo({
        url: './diseaseupload/diseaseupload?type=' + index + '&item=' + JSON.stringify(item),
      })
    }

  },

  //基本资料选项卡
  switchnav: function(e) {
    var that = this;

    that.setData({
      currentTab: e.currentTarget.dataset.index
    })


  },

  //选择省市区
  bindRegionChange: function(e) {
    this.setData({
      regionvalue: e.detail.value
    })
  },

  //选择申领是否放弃
  giveup: function() {

    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })

    that.animation = animation
    animation.translateY(300).step()
    that.setData({
      animationData: animation.export(),
      giveup: false,
      isreplyshow: false
    })

    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 400)

  },

  //组件返回 放弃申领
  onselectedgiveup: function(e) {
    var that = this;
    that.data.sure = e.detail.sure
    if (that.data.sure == "1") {
      that.setData({
        giveupresult: '是',
        isreplyshow: true
      })
    } else {
      that.setData({
        giveupresult: '否',
        isreplyshow: true
      })
    }
  },


  //选择照片
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

        that.canvas_uploadimg(0, res.tempFilePaths);


        // for (let i in res.tempFilePaths) {
        //   that.data.imagecell.push({
        //     id: imgId++,
        //     path: res.tempFilePaths[i]
        //   })
        // }
        // 
        // that.setData({
        //   imagecell: that.data.imagecell
        // })


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

        console.log("jjjj", that.data.imagecell)
        that.setData({
          imagecell: that.data.imagecell,
          showcanvas: true
        })
        that.canvas_uploadimg(i + 1, data)
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


        ctx.draw(false, function() {
          wx.canvasToTempFilePath({
            canvasId: 'firstCanvas',
            success: (ress) => {

              console.log("hh",ress);

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

  //预览图片(已上传)
  previewImage: function(e) {

    var imgArr = [];
    var index = e.currentTarget.dataset.index;
    // var imgindex = e.currentTarget.dataset.imgindex

    for (let c of this.data.imgdatalist) {

      imgArr.push(this.data.hostName+"/uploads/"+c)

    }

    wx.previewImage({
      urls: imgArr,
      current: imgArr[index]
    })
  },

  //预览图片(正上传)
  previewImage1: function (e) {

    var imgArr = [];
    var index = e.currentTarget.dataset.index;
    // var imgindex = e.currentTarget.dataset.imgindex

    for (let c of this.data.imagecell) {

      imgArr.push(c.path)

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

  //添加视频
  addVideo: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      compressed: true,
      success(res) {
        console.log(res)
        that.data.fileType = 'video';

        that.setData({
          mediaSrc: res.tempFilePath,
          duration: res.duration,
          mediaSize: res.size,
          fileTypePublic: 3
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    })
  },

  //上传图片
  uploadimage: function() {

    var that = this;
    if (that.data.imagecell) {
      that.uploadimg(0, that)
    }
  },

  //上传图片
  uploadimg: function(i, that) {

    if (i < that.data.imagecell.length) {

      that.upp(that, i, res => {
        that.uploadimg(i + 1, that)
      })

    } else {

      that.data.fileName = that.data.fileNameTemp.substr(1, that.data.fileNameTemp.length);
      diseasesurvey.relevant(that.data.listid, that.data.fileName, res => {
        console.log("res", res)
        if (res.status == 1) {

          wx.showToast({
            title: "相关资料上传成功!",
            icon: "none"
          })

          that.setData({
            imagecell: []
          })

          that.onShow();

        } else {
          wx.showToast({
            title: res.msg,
            icon: "none"
          })
        }
      })

    }
  },

  upp: function(that, i, callback) {

    that.data.mediaSrc = that.data.imagecell[i].path

    // common.uploadDynamic(that).then(function () {
    //   console.log('上传' + i)
    //   console.log(that.data.fileName)
    //   console.log(JSON.stringify(that.data))
    //   that.data.fileNameTemp = that.data.fileNameTemp + ',' + that.data.fileName
    //   callback(that.data.fileNameTemp)
    // })

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
  },

  //机构回复
  reply: function() {

    var that = this
    if (!that.data.suspects) {
      wx.showToast({
        title: '请输入阳性疑点!',
        icon: 'none'
      })
      return
    }

    if (!that.data.regionvalue[0]) {
      wx.showToast({
        title: '请选择省份!',
        icon: 'none'
      })
      return
    }

    if (!that.data.money) {
      wx.showToast({
        title: '请输入调查金额!',
        icon: 'none'
      })
      return
    }

    if (!that.data.giveupresult) {
      wx.showToast({
        title: '请选择是否放弃!',
        icon: 'none'
      })
      return
    }

    if (!that.data.feedback) {
      wx.showToast({
        title: '请输入问题反馈!',
        icon: 'none'
      })
      return
    }

    if (that.data.giveupresult == "是") {
      diseasesurvey.reply(that, res => {
        console.log(res)
        if (res.status == 1) {

          wx.showToast({
            title: '机构回复成功!',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    } else {


      that.data.tasklist.forEach((item, index) => {

        if (item.status == 1) {
          diseasesurvey.reply(that, res => {
            console.log(res)
            if (res.status == 1) {

              wx.showToast({
                title: '机构回复成功!',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })

        } else {

          if (index == 7) {

            diseasesurvey.reply(that, res => {
              console.log(res)
              if (res.status == 1) {

                wx.showToast({
                  title: '机构回复成功!',
                  icon: 'none'
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
          } else {
            wx.showToast({
              title: '请完成全部任务再结案!',
              icon: "none",
              duration: 1500
            })
            return
          }
        }
      })
    }





  },

  //输入阳性疑点信息
  positivedoubt: function(e) {
    this.data.suspects = e.detail.value;
  },

  //输入调查金额
  inputmoney: function(e) {
    this.data.money = e.detail.value;
  },

  //输入问题反馈
  inputproblem: function(e) {
    this.data.feedback = e.detail.value;
  },


  //下一步操作
  nextstep: function() {

    var that = this;

    for (var item in that.data.tasklist) {

      if (that.data.tasklist[item].step == 8) {

        that.setData({
          first: 3
        })

      } else {
        if (that.data.tasklist[item].status == 0) {
          wx.showToast({
            title: '请完成全部任务再结案!',
            icon: "none",
            duration: 1500
          })
          return;
        }
      }
    }
  }
})