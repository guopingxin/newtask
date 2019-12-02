// pages/businessmode/diseasesurvey/addphoto/addphoto.js

var imgId = 0;
var test = getApp().globalData.hostName;
var ckzp;
var imgLength = 0;
var loadLength = 0;

var cameral = getApp().globalData.cameral;
import {
  Personalcenter
} from "../../../mine/personalcenter/personalcentermode.js"
var personalcenter = new Personalcenter();
var utils = require('../../../../utils/util.js');
import { Config } from "../../../../utils/config.js";


Page({

  data: {
    subOver1: true,
    subOver: true,
    firstLoad: 1000,
    systemWidth: '',
    systemHeight: '',
    camStatus: 'normal',
    src: '',
    animation: '',
    flashSecond: false,
    ifClose: false,
    choosedText: '人车合一',
    peoAddCarPath: [],
    frameNumPath: [],
    enviorPath: [],
    checkPthotoPath: [],
    carBrokePath: [],
    oldInjuryPath: [],
    peoAddCarArr: [],
    frameNumArr: [],
    enviorArr: [],
    checkPthotoArr: [],
    carBrokeArr: [],
    oldInjury: [],
    idArc: '',
    photosBlock: [true, false, false, false, false],
    btnGree: ['blueColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor'],
    arr: [1, 2, 3, 4, 5],
    imageArr: [],
    cameraBack: 'back',
    flash: {
      auto: true,
      off: false,
      on: false
    },
    falshContrl: false,
    cameraFlasf: 'auto',
    cameral: cameral,
    imagecell: [],
    showcanvas:false,
    imageswidth:0,
    imageheight:0,
    hosturl: Config.imageUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.data.address = options.address;

    const sys = wx.getSystemInfoSync();
    that.setData({
      cameral: 'width:' + sys.screenWidth + 'px; height:' + (sys.screenHeight-140) + 'px'
    })

    console.log("dddd", sys.screenWidth, sys.screenHeight);

    const date = utils.formatTime1(new Date());

    console.log("fff",date);

    const date1 = utils.formatTime2(new Date());

    console.log("sss",date1);
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  //返回
  backoff: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //前置 后置摄像头
  shiftCamera: function() {
    var cameraTemp = this.data.cameraBack;
    if (cameraTemp == 'front') {
      this.setData({
        cameraBack: 'back'
      })

    } else {
      this.setData({
        cameraBack: 'front'
      })
    }

  },

  //自动，关闭，打开闪光灯(图片)
  switchFlash: function(e) {
    if (!this.data.flashSecond) {
      this.setData({
        subOver1: false,
        falshContrl: true,
        flashSecond: true
      })
    } else {
      this.setData({
        subOver1: true,
        falshContrl: false,
        flashSecond: false
      })
    }
  },

  //自动，关闭，打开闪光灯(文字)
  flashOr: function(e) {
    var that = this
    this.setData({
      falshContrl: false,
      cameraling: false
    })
    var flashId = e.currentTarget.id;
    for (var i in this.data.flash) {

      if (i == flashId) {
        var setFalsh = 'flash.' + i
        that.setData({
          subOver1: true,
          [setFalsh]: true,
          cameraFlasf: i
        })

      } else {
        var setFalsh = 'flash.' + i
        that.setData({
          subOver1: true,
          [setFalsh]: false
        })
      }
    }
  },

  //拍照
  takePhoto() {

    var that = this
  
    wx.showLoading({
      title: '努力生成中...'
    })

    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log("res",res);
        that.data.tempImagePath = res.tempImagePath;

        //压缩图片
        // wx.compressImage({
        //   src: res.tempImagePath,
        //   quality:60,
        //   success:response=>{
        //     console.log("jjj",response);

        //     //获取图片信息
        //     // wx.getImageInfo({
        //     //   src: response.tempFilePath,
        //     //   success:response1=>{
        //     //     console.log(response1);
        //     //   }
        //     // })

        //   }
        // })
      
        that.setData({
          imageswidth: res.width*0.8,
          imageheight: res.height*0.8
        })

        const date = utils.formatTime1(new Date());
        const date1 = utils.formatTime2(new Date());
        const week = utils.getDates(1, date1)
        const ctx = wx.createCanvasContext('myCanvas')

        //将图片src放到cancas内，宽高为图片大小
        ctx.drawImage(res.tempImagePath, 0, 0, res.width, res.height)
        ctx.setFillStyle('white')

        ctx.setFontSize(60) //注意：设置文字大小必须放在填充文字之前，否则不生效
        ctx.fillText(date, 20, 80)

        ctx.beginPath(); //开始一个新的路径
        ctx.setLineWidth(3)  //设置线条的宽度
        ctx.moveTo(170, 30);//路径的起点
        ctx.lineTo(170, 85);//路径的终点
        ctx.setStrokeStyle('yellow');
        ctx.stroke();

        ctx.setFontSize(24)
        ctx.fillText(date1, 180, 50)

        ctx.setFontSize(24)
        ctx.fillText(week[0].week, 180, 80)

        ctx.setFontSize(24)
        ctx.fillText(that.data.address, 25, 120)
        // ctx.strokeText(date, 0, 30)

        setTimeout(function () {
          
          ctx.draw(false, function () {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: (ress) => {

                wx.hideLoading();
                console.log("ress",ress);
                that.data.imagecell.push({
                  id: imgId++,
                  path: ress.tempFilePath
                })

                that.setData({
                  src: ress.tempFilePath,
                  showcanvas:true
                })

                // callback && callback(that)
              },
              fail: (e) => {
                console.log("AAAAAA", e)
              }
            })
          })

        }, 1000)
      }
    })



    // that.setData({
    //   subOver: false,
    //   ifPro: true,
    //   progressPer: 0,
    //   waiting: true
    // })
    // var arcArr = [that, that.data.which]
    // var promiseTemp = new Promise(function(resolve, reject) {
    //   resolve(arcArr);
    // });
    // promiseTemp.then(toTakePhoto).then(canvasToPic).then(loadImg).then(function() {
    //   if (imgLength == loadLength) {
    //     that.setData({
    //       subOver: true,
    //     })
    //   }
    // })
  },


  //提交照片
  tosubmit: function() {
    var that = this

    wx.showLoading({
      title: '正在上传!',
    })

    personalcenter.upFace("/api/auth/upload", that.data.src, res => {
      var jsonStr = res.data;
      jsonStr = jsonStr.replace(" ", "");
      jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
      res.data = JSON.parse(jsonStr);
      if (res.data.status == 1) {
        that.data.fileName = res.data.data.filename
        console.log(that.data.fileName)

        wx.hideLoading();

        wx.showToast({
          title: '图片上传成功!',
          duration:1500
        })

        // that.data.fileNameTemp = that.data.fileNameTemp + ',' + that.data.fileName;
        setTimeout(function(){

          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];   //上一个页面

          prevPage.setData({
            fileNameTemp1: that.data.fileName,
            isTakepic:true
          })

          wx.navigateBack({
            delta: 1
          })
        },1500)
        // callback(that.data.fileNameTemp)

      } else if (res.data.status == -2) {
        wx.hideLoading()
        wx.showModal({
          title: '文件大于2M',
          content: '',
        })
      }
    })


    // that.setData({
    //   submitOver: true
    // })
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // ckzp = {
    //   p1: that.data.peoAddCarPath,
    //   p2: that.data.frameNumPath,
    //   p3: that.data.enviorPath,
    //   p4: that.data.checkPthotoPath,
    //   p5: that.data.carBrokePath,
    //   p6: that.data.oldInjuryPath
    // }
    // var ckzpTemp = JSON.stringify(ckzp)

    // wx.request({
    //   url: test + 'task/survey/schedule',
    //   method: 'POST',
    //   data: {
    //     ckzp: ckzpTemp,
    //     gydz: [],
    //     zfdz: [],
    //     title: '',
    //     content: '',
    //     case_id: that.data.listId,
    //     pick_path: '',
    //     give_path: '',
    //     type: 1
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Cookie': 'PHPSESSID=' + that.data.sessionId
    //   }, // 默认值
    //   success: function(res) {
    //     console.log(res)
    //     var dataType = typeof res.data
    //     console.log(dataType)
    //     if (dataType == 'string') {
    //       var jsonStr = res.data;
    //       jsonStr = jsonStr.replace(" ", "");
    //       var temp
    //       if (typeof jsonStr != 'object') {
    //         jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
    //         temp = JSON.parse(jsonStr);
    //         res.data = temp;
    //       }
    //     }
    //     if (res.data.status == 1) {
    //       wx.showToast({
    //         title: '提交成功',
    //         duration: 500

    //       });
    //       wx.setStorageSync('refreshFlag', true)
    //       setTimeout(function() {
    //         wx.navigateBack({
    //           delta: 1
    //         })
    //       }, 500)
    //       return
    //     } else {
    //       wx.showToast({
    //         title: '提交失败',
    //         duration: 500
    //       });
    //       return
    //     }

    //   },
    //   complete: function() {
    //     // complete
    //     wx.hideNavigationBarLoading() //完成停止加载
    //     wx.stopPullDownRefresh() //停止下拉刷新
    //   }
    // })

  },


  confirmDelete: function() {
    this.setData({
      deleteMODAL: false
    })
  },

})


function toTakePhoto(arcArr) {

  return new Promise((resolve, reject) => {

    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        arcArr[0].setData({
          src: res.tempImagePath
        })
        arcArr[0].setData({
          waiting: false
        })
        imgLength++;
        wx.hideLoading();

        var secondArc = [arcArr[0], arcArr[1], res.tempImagePath] //that,which,初次图片路径
        resolve(secondArc)
      }
    })
  })

}

function canvasToPic(secondArc) {
  return new Promise((resolve, reject) => {
    var printWidth;
    var printHidth;
    var outImageHight;
    var canvasHeight;
    var canvasWidth;
    var dataNow = new Date();
    var year = dataNow.getFullYear();
    var month = dataNow.getMonth() + 1;
    var today = dataNow.getDate();
    var hour = dataNow.getHours() < 10 ? "0" + dataNow.getHours() : dataNow.getHours();
    var minute = dataNow.getMinutes() < 10 ? "0" + dataNow.getMinutes() : dataNow.getMinutes();
    var second = dataNow.getSeconds() < 10 ? "0" + dataNow.getSeconds() : dataNow.getSeconds();
    var timeFont = year + '年' + month + '月' + today + '日' + ' ' + hour + '时' + minute + '分' + second + '秒'
    const mcan = wx.createCanvasContext('myCanvas')
    mcan.save()
    mcan.translate(0, 0)

    console.log("hhhh", secondArc[0]);
    if (secondArc[0].data.camStatus == 'normal') {
      mcan.rotate(0 * Math.PI / 180)
      printWidth = secondArc[0].data.systemWidthNum;
      printHidth = secondArc[0].data.systemHeightNum;
      canvasHeight = secondArc[0].data.systemHeightNum
      outImageHight = secondArc[0].data.systemHeightNum
      if (secondArc[0].data.cameraBack == 'front') {
        mcan.translate(0, 0)
      }
    } else if (secondArc[0].data.camStatus == 'left') {
      printWidth = secondArc[0].data.systemWidthNum;
      printHidth = secondArc[0].data.systemHeightNum;
      outImageHight = secondArc[0].data.systemHeightNum * secondArc[0].data.scaleRata;
      canvasHeight = printWidth * secondArc[0].data.scaleRata;
      mcan.translate(printWidth, 0)
      mcan.scale(secondArc[0].data.scaleRata, secondArc[0].data.scaleRata)
      mcan.rotate(90 * Math.PI / 180)
      mcan.translate(printWidth / 2, printHidth / 2)
      mcan.rotate(180 * Math.PI / 180)
      mcan.translate(-printWidth / 2, -printHidth / 2)
    } else if (secondArc[0].data.camStatus == 'right') {
      mcan.translate(secondArc[0].data.systemWidthNum, 0)
      mcan.scale(1, secondArc[0].data.scaleRata)
      printWidth = secondArc[0].data.systemWidthNum;
      printHidth = secondArc[0].data.systemWidthNum;
      canvasWidth = printWidth;
      canvasHeight = printWidth * secondArc[0].data.scaleRata;
      mcan.rotate(90 * Math.PI / 180)
    }
    (function() {
      mcan.clearRect(0, 0, secondArc[0].data.systemWidthNum, secondArc[0].data.systemHeightNum)

      function clear() {
        mcan.drawImage(secondArc[0].data.src, 0, 0, printWidth, printHidth)
        //mcan.drawImage(res.tempImagePath, 0, 0, 150, 100)       
        mcan.restore()
        mcan.font = "11px 宋体";
        mcan.strokeStyle = '#fff';
        mcan.fillStyle = "rgba(252,255,255,1)";
        mcan.fillText(timeFont, 0, 10);
        mcan.fillText("陕西", 0, 20);
        mcan.fillText("西安", 0, 32); //选择位置 
        mcan.fillText("雁塔区", 80, 32); //选择位置 
        mcan.draw()

        function render() {
          setTimeout(function() {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: canvasWidth,
              height: canvasHeight,
              fileType: 'jpg',
              canvasId: 'myCanvas',
              success: function(res) {
                var tempFile = res.tempFilePath
                var imageObj = {
                  path: tempFile,
                  imgId: imgId++
                }
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(res) {

                  }
                })
                var thirdArc = [secondArc[0], secondArc[1], tempFile, mcan] //that,which,二次图片路径\

                resolve(thirdArc)

              },
              fail: function(res) {}
            })
          }, secondArc[0].data.firstLoad)

        }
        render();
      }
      clear();

    })();

  })
}

function loadImg(thirdArc) {
  return new Promise(function(resolve, reject) {
    thirdArc[3].clearRect(0, 0, thirdArc[0].data.systemWidthNum, thirdArc[0].data.systemHeightNum)


    personalcenter.upFace("/api/auth/upload", thirdArc[2], res => {
      var jsonStr = res.data;
      jsonStr = jsonStr.replace(" ", "");
      jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
      res.data = JSON.parse(jsonStr);
      loadLength++
      if (res.data.status == 1) {

        // if (res.data.status == 1) {
        if (thirdArc[1] == 0) {
          thirdArc[0].data.peoAddCarPath.push(res.data.data.filename)
          thirdArc[0].data.peoAddCarArr.push({
            path: res.data.data.filename,
            imgId: imgId++,
            tag: res.data.data.filename
          })
        } else if (thirdArc[1] == 1) {
          thirdArc[0].data.frameNumPath.push(res.data.data.filename)
          thirdArc[0].data.frameNumArr.push({
            path: res.data.data.filename,
            imgId: imgId++,
            tag: res.data.data.filename
          })
        } else if (thirdArc[1] == 2) {
          thirdArc[0].data.enviorPath.push(res.data.data.filename)
          thirdArc[0].data.enviorArr.push({
            path: res.data.data.filename,
            imgId: imgId++,
            tag: res.data.data.filename
          })
        } else if (thirdArc[1] == 3) {
          thirdArc[0].data.checkPthotoPath.push(res.data.data.filename)
          thirdArc[0].data.checkPthotoArr.push({
            path: res.data.data.filename,
            imgId: imgId++,
            tag: res.data.data.filename
          })
        } else if (thirdArc[1] == 4) {
          thirdArc[0].data.carBrokePath.push(res.data.data.filename)
          thirdArc[0].data.carBrokeArr.push({
            path: res.data.data.filename,
            imgId: imgId++,
            tag: res.data.data.filename
          })
        } else if (thirdArc[1] == 5) {
          thirdArc[0].data.oldInjuryPath.push(res.data.data.filename)
          thirdArc[0].data.oldInjury.push({
            path: res.data.data.filename,
            imgId: imgId++,
            tag: res.data.data.filename
          })
        }
        resolve('ok')

        // }

        // that.data.fileName = res.data.data.filename
        // console.log(that.data.fileName)

        // that.data.fileNameTemp = that.data.fileNameTemp + ',' + that.data.fileName
        // callback(that.data.fileNameTemp)

      } else if (res.data.status == -2) {
        wx.hideLoading()
        wx.showModal({
          title: '文件大于2M',
          content: '',
        })
      }
    })


    // const uploadTask = wx.uploadFile({
    //   url: test + 'task/base/uploads',
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Cookie': 'PHPSESSID=' + thirdArc[0].data.sessionId
    //   },
    //   filePath: thirdArc[2],
    //   name: 'image',
    //   formData: {
    //     address: '',
    //     name: '',
    //     task_name: ''
    //   },
    //   success: function(res) {
    //     var jsonStr = res.data;
    //     jsonStr = jsonStr.replace(" ", "");
    //     if (typeof jsonStr != 'object') {
    //       jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
    //       var jj = JSON.parse(jsonStr);
    //       res.data = jj;
    //       loadLength++

    //     }
    //     if (res.data.status == 1) {
    //       if (thirdArc[1] == 0) {
    //         thirdArc[0].data.peoAddCarPath.push(res.data.file_name)
    //         thirdArc[0].data.peoAddCarArr.push({
    //           path: res.data.file_name,
    //           imgId: imgId++,
    //           tag: res.data.file_name
    //         })
    //       } else if (thirdArc[1] == 1) {
    //         thirdArc[0].data.frameNumPath.push(res.data.file_name)
    //         thirdArc[0].data.frameNumArr.push({
    //           path: res.data.file_name,
    //           imgId: imgId++,
    //           tag: res.data.file_name
    //         })
    //       } else if (thirdArc[1] == 2) {
    //         thirdArc[0].data.enviorPath.push(res.data.file_name)
    //         thirdArc[0].data.enviorArr.push({
    //           path: res.data.file_name,
    //           imgId: imgId++,
    //           tag: res.data.file_name
    //         })
    //       } else if (thirdArc[1] == 3) {
    //         thirdArc[0].data.checkPthotoPath.push(res.data.file_name)
    //         thirdArc[0].data.checkPthotoArr.push({
    //           path: res.data.file_name,
    //           imgId: imgId++,
    //           tag: res.data.file_name
    //         })
    //       } else if (thirdArc[1] == 4) {
    //         thirdArc[0].data.carBrokePath.push(res.data.file_name)
    //         thirdArc[0].data.carBrokeArr.push({
    //           path: res.data.file_name,
    //           imgId: imgId++,
    //           tag: res.data.file_name
    //         })
    //       } else if (thirdArc[1] == 5) {
    //         thirdArc[0].data.oldInjuryPath.push(res.data.file_name)
    //         thirdArc[0].data.oldInjury.push({
    //           path: res.data.file_name,
    //           imgId: imgId++,
    //           tag: res.data.file_name
    //         })
    //       }
    //       resolve('ok')

    //     } else {}
    //   }
    // })

  })
}