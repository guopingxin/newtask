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
    imgdatalist: ['', '', ''],
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
    hostName: Config.imageUrl,
    showcanvas: false,

    //阳性疑点类型
    positivedoubttype: [{
        name: '1',
        value: '患者不是成员本人'
      },
      {
        name: '2',
        value: '不在互助计划期间',
      },
      {
        name: '3',
        value: '等待期'
      },
      {
        name: '4',
        value: '申领人故意编造未曾发生的事故'
      },
      {
        name: '5',
        value: '申领人编造虚假的事故原因'
      },
      {
        name: '6',
        value: '申领人故意制造互助事件',
      },
      {
        name: '7',
        value: '材料虚假'
      },
      {
        name: '8',
        value: '虚报年龄'
      },
      {
        name: '9',
        value: '未如实告知'
      },
      {
        name: '10',
        value: '责任免除'
      },
      {
        name: '11',
        value: '其他阳性信息'
      },
      {
        name: '12',
        value: '无'
      }
    ],

    isshowcheckbox: true, //是否显示复选框
    //问题反馈
    problem: ["正常案件", "健告条款存在漏洞", "不属于互助责任核", "暴力排查,实务不可操作", "不合理追溯", "无限排查", "职责不明", "未收到委托"],

    problemFirst: false,
    spinShow: true,
    doubttext: '',
    imagecell: []

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this
    that.data.listid = options.listId
    that.data.type = options.businessId

    if (options.city != 'undefined') {
      that.setData({
        address: options.province + "-" + options.city,
      })
    } else {
      that.setData({
        address: options.province,
      })
    }
    that.setData({
      // diseaselist: JSON.parse(options.item),
      taskname: app.globalData.userinfor.nickname,
      taskmobile: app.globalData.userinfor.mobile
    })

    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        diseaseupload.reverseGeocoder(demo, res.latitude, res.longitude, res => {
          that.data.picaddress = res.address;
        })
      },
    })

    diseasesurvey.sicktask(res => {
      console.log("res", res);
      if (res.status == 1) {
        that.data.diseaselistmode = res.data
      }

    })

    diseasesurvey.relatedInformation(that.data.listid, res => {
      console.log(res);
      if (res.status == 1) {

        res.data.forEach((item, index) => {

          if (item.picture) {
            if (item.picture.split(",")) {
              that.data.imagecell = item.picture.split(",")
            } else {
              that.data.imagecell.push(item)
            }

            item.imagecell = that.data.imagecell
          }
        })

        that.setData({
          imgdatalist: res.data
        })
      }
    })

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this

    that.data.key = "sickness";
    that.data.doubttext = '';

    diseasesurvey.sicknessinfo(that.data.listid, that, res => {
      that.setData({
        diseaselist: res.data,
        tasklist: res.sickTask,
        spinShow: false
      })

      if (res.data.suspects) {
        var doubt = JSON.parse(res.data.suspects);
        doubt.forEach((item, index) => {
          that.data.doubttext += (',' + item)
        })

        that.setData({
          doubttext: that.data.doubttext.substring(1)
        })
      }



      // that.data.tasklist.forEach((item,index)=>{

      //   that.data.diseaselistmode.forEach((item1,index1)=>{

      //     var diseaselistdata = JSON.parse(item1.data);

      //     if (item.sickness_task_id == item1.id){

      //       diseaselistdata.forEach((item2,index2)=>{

      //       })
      //     }


      //   })
      // })


      // that.setData({
      //   imgdatalist: res.data.data.split(",")  
      // })

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

    // that.data.taskid = app.globalData.userinfor.id


    // pushrepair.taskinfo(that.data.taskid, res => {
    //   that.setData({
    //     taskinfo: res.data
    //   })
    // })


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

    var that = this
    var recordid = e.currentTarget.dataset.recordid;
    var name = e.currentTarget.dataset.name;
    var sickness_task_id = e.currentTarget.dataset.sickness_task_id;
    var reject = e.currentTarget.dataset.reject //任务意见驳回

    diseasesurvey.recordlist(recordid, res => {
      if (res.status == 1) {
        if (res.data.length > 0) {

          wx.navigateTo({
            url: './diseasetask/diseasetask?recordid=' + recordid + '&name=' + name + '&sickness_task_id=' + sickness_task_id + '&reject=' + reject,
          })

        } else {

          wx.navigateTo({
            url: './adddiseasetask/adddiseasetask?title=' + name + '&taskId=' + sickness_task_id + "&id=" + recordid,
          })

        }
      }
    })

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

              console.log("hh", ress);

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

    for (let c of this.data.imgdatalist[index].imagecell) {

      imgArr.push(this.data.hostName + "/uploads/" + c)

    }

    wx.previewImage({
      urls: imgArr,
      current: imgArr[index]
    })
  },

  //预览图片(正上传)
  previewImage1: function(e) {

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

    if (that.data.positivedoubttypeselected.length == 0) {
      wx.showToast({
        title: '请选择阳性疑点!',
        icon: 'none'
      })
      return
    }

    if (!that.data.probleminddex) {
      wx.showToast({
        title: '请选择调查问题反馈!',
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

        if (that.data.tasklist[index].status == 0) {

          that.data.taskfalse = true
          return;
        }

      })

      if (!that.data.taskfalse) {
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
      }
    }

  },

  //输入阳性疑点信息
  positivedoubt: function(e) {

    if (this.data.isshowcheckbox) {
      this.setData({
        isshowcheckbox: false
      })
    } else {
      this.setData({
        isshowcheckbox: true
      })
    }
    // this.data.suspects = e.detail.value;
  },

  //输入调查金额
  inputmoney: function(e) {
    this.data.money = e.detail.value;
  },

  //输入调查整体说明
  inputproblem: function(e) {
    this.data.all_remark = e.detail.value;
  },


  //下一步操作
  nextstep: function() {

    var that = this;

    console.log("hhh")

    for (var item in that.data.tasklist) {

      if (that.data.tasklist[item].status == 0) {

        that.data.taskfalse = true
        wx.showToast({
          title: '请完成全部任务再结案!',
          icon: "none",
          duration: 1500
        })
        return;
      }
    }

    if (!that.data.taskfalse) {
      that.setData({
        first: 3
      })
    }
  },

  //阳性疑点复选框
  checkboxChange(e) {

    var that = this

    that.data.positivedoubttypeselected = [];

    that.data.checkbox = e.detail.value;
    for (var item of that.data.checkbox) {

      for (var i of that.data.positivedoubttype) {

        if (i.name == item) {
          that.data.positivedoubttypeselected.push(i.value);
        }
      }
    }

    console.log(that.data.positivedoubttypeselected);
  },

  //普通选择器(问题反馈))
  bindOrdinaryChange(e) {
    this.setData({
      problemFirst: true,
      probleminddex: e.detail.value
    })
  },

  //打电话
  callphone(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  }
})