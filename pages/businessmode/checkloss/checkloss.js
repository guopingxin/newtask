// pages/businessmode/checkloss/checkloss.js
import {
  Checkloss
} from "./checklossmode.js"
var checkloss = new Checkloss();
var app = getApp()
import {
  Config
} from '/../../../utils/config.js'
var hostName = Config.restUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isJobNo: false,
    isSurveyTime: false, // 查勘日期(平安有)
    isDispatchedWorkers: true, // 派工人(太平、平安没有)
    isDispatchingTime: true, // 派工时间（太平没有)
    isReportTime: false, // 报案时间(太平有)
    isFixedLossAdd: false, //出险/定损地点(太平、平安有)
    isreportType: false, //案件类型（太平有）
    isRegion: true, // 区域（太平没有）
    isTimeSlot: false, // 派工时间段(平安有)
    isPolicyNo: true, // 保单号(平安、太平没有)
    isPolicyMechanism: true, // 承保机构（平安、太平没有）
    // --------------------------------------------------
    surveyList: [],
    showBottomOperation: false,
    showQrCode: false,
    serviceOperation: false,

    showDetailed: false
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.listId = options.listId
    this.data.service_id = app.globalData.userinfor.service_id;
    this.setData({
      userid: app.globalData.userinfor.id,
      usertype: app.globalData.userinfor.type,
      imgUrl:'http://cdn.feecgo.com/uploads/',
      businessId: options.businessId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getDetails()
  },


  // 查勘定损详情请求
  getDetails() {
    // let key = 'survey'
    // let id = 1
    let steps = []
    let ckzp01 = {
        title: '',
        picture: []
      }, // 人车合一
      ckzp02 = {
        title: '',
        picture: []
      }, //车架号
      ckzp03 = {
        title: '',
        picture: []
      }, // 环境照片
      ckzp04 = {
        title: '',
        picture: []
      }, // 验车照片
      ckzp05 = {
        title: '',
        picture: []
      }, // 车损照片
      ckzp06 = {
        title: '',
        picture: []
      }, // 旧伤确认
      gydz01 = {
        title: '',
        picture: []
      }, // 事故证明
      gydz02 = {
        title: '',
        picture: []
      }, // 索赔申请书
      gydz03 = {
        title: '',
        picture: []
      }, // 行驶证
      gydz04 = {
        title: '',
        picture: []
      }, // 驾驶证
      gydz05 = {
        title: '',
        picture: []
      }, // 查看报告
      gydz06 = {
        title: '',
        picture: []
      }, // 个案签报
      gydz07 = {
        title: '',
        picture: []
      }, // 拒赔材料
      gydz08 = {
        title: '',
        picture: []
      }, // 从民资格证
      gydz09 = {
        title: '',
        picture: []
      }, // 法院判决书
      gydz10 = {
        title: '',
        picture: []
      }, // 调查单证
      zfdz01 = {
        title: '',
        picture: []
      }, // 收款方账户信息
      zfdz02 = {
        title: '',
        picture: []
      } // 收款方身份证明

    this.data.detailed = []

    checkloss.getBusinessDetail(this.data.listId,"survey",this, res => {
      if (res.status == 1) {

        this.setData({
          surveyList: res.data,
          schedule: res.schedule,
        })

        res.schedule.forEach((item, index) => {
          if (item.title.match('到达现场')) {
            this.setData({
              serviceOperation: true
            })
          }

          if (item.title.match('接单') || item.title.match('到达现场') || item.title.match('分配') || item.title.match('完成')) {
            steps.push(item)
            this.setData({
              steps: steps
            })
          }

          // 明细        
          if (item.title.match('人车合一')) {
            ckzp01.title = item.title
            ckzp01.picture.push(item.picture.ckzp)
            
          } else if (item.title.match('车架号')) {

            ckzp02.title = item.title
            ckzp02.picture.push(item.picture.ckzp)
            
          } else if (item.title.match('环境照片')) {
            ckzp03.title = item.title
            ckzp03.picture.push(item.picture.ckzp)
            
          } else if (item.title.match('验车照片')) {
            ckzp04.title = item.title
            ckzp04.picture.push(item.picture.ckzp)
            
          } else if (item.title.match('车损照片')) {
            ckzp05.title = item.title
            ckzp05.picture.push(item.picture.ckzp)
            
          } else if (item.title.match('旧伤确认')) {
            ckzp06.title = item.title
            ckzp06.picture.push(item.picture.ckzp)
            
          } else if (item.title.match('事故证明')) {
            gydz01.title = item.title
            gydz01.picture.push(item.picture.gydz)
            
          } else if (item.title.match('索赔申请书')) {
            gydz02.title = item.title
            gydz02.picture.push(item.picture.gydz)
            
          } else if (item.title.match('行驶证')) {
            gydz03.title = item.title
            gydz03.picture.push(item.picture.gydz)
            
          } else if (item.title.match('驾驶证')) {
            gydz04.title = item.title
            gydz04.picture.push(item.picture.gydz)
            
          } else if (item.title.match('查勘报告')) {
            gydz05.title = item.title
            gydz05.picture.push(item.picture.gydz)
            
          } else if (item.title.match('个案签报')) {
            gydz06.title = item.title
            gydz06.picture.push(item.picture.gydz)
            
          } else if (item.title.match('拒赔材料')) {
            gydz07.title = item.title
            gydz07.picture.push(item.picture.gydz)
            
          } else if (item.title.match('从民资格证')) {
            gydz08.title = item.title
            gydz08.picture.push(item.picture.gydz)
           
          } else if (item.title.match('法院判决书')) {
            gydz09.title = item.title
            gydz09.picture.push(item.picture.gydz)
           
          } else if (item.title.match('调查单证')) {
            gydz10.title = item.title
            gydz10.picture.push(item.picture.gydz)
            
          } else if (item.title.match('收款方账户信息')) {
            zfdz01.title = item.title
            zfdz01.picture.push(item.picture.zfdz)
            
          } else if (item.title.match('收款方身份证明')) {
            zfdz02.title = item.title
            zfdz02.picture.push(item.picture.zfdz)
          }
        })

        this.data.detailed.push(ckzp01, ckzp02, ckzp03, ckzp04, ckzp05, ckzp06, gydz01, gydz02, gydz03, gydz04, gydz05, gydz06, gydz07, gydz08, gydz09, gydz10, zfdz01, zfdz02)

        this.data.detailed.forEach((item, index) => {
          if (item.picture.length !== 0) {
            this.setData({
              showDetailed: true
            })
          }
        })
        this.setData({
          detailed: this.data.detailed
        })

        this.getInsuranceList()
      }
    })
  },

  // 获取保险公司列表
  getInsuranceList() {
    checkloss.getInsurance(res => {
      if (res.status == 1) {
        res.data.forEach((item, index) => {
          if (this.data.surveyList.insurance_id == item.id) {
            this.data.surveyList.insuranceName = item.name
            this.setData({
              surveyList: this.data.surveyList
            })
            if (item.name == '中国平安') {
              this.setData({
                isJobNo: true,
                isSurveyTime: true,
                isDispatchedWorkers: false,

                isDispatchingTime: true,
                isReportTime: false,
                isFixedLossAdd: true,
                isreportType: false,
                isRegion: true,
                isTimeSlot: true,
                isPolicyNo: false,
                isPolicyMechanism: false,
              })
            } else if (item.name == '中国太平') {
              this.setData({
                isJobNo: true,
                isSurveyTime: false,
                isDispatchedWorkers: false,

                isDispatchingTime: false,
                isReportTime: true,
                isFixedLossAdd: true,
                isreportType: true,
                isRegion: false,
                isTimeSlot: false,
                isPolicyNo: false,
                isPolicyMechanism: false,
              })
            } else {
              this.setData({
                isJobNo: false,
                isSurveyTime: false,
                isDispatchedWorkers: true,
                isDispatchingTime: true,
                isReportTime: false,
                isFixedLossAdd: false,
                isreportType: false,
                isRegion: true,
                isTimeSlot: false,
                isPolicyNo: true,
                isPolicyMechanism: true,
              })
            }
          }
        })
      }
    })
  },

  // 接单
  toReceipt() {
    let id = this.data.listId
    checkloss.businessReceipt(id,"survey",res => {
      if (res.status == 1) {
        // let surveyList = this.data.surveyList
        // let string = 'surveyList.status'
        // this.setData({
        //   [string]: 4,
        // })
        this.getDetails();

      } else {
        wx.showToast({
          title: res.msg ? res.msg : '请求超时',
        })
      }
    })
  },

  // 到达现场
  toScene() {
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      title: "到达现场",
      content: app.globalData.operators ? app.globalData.operators : app.globalData.userinfor.nickname,
      // case_id: this.data.listId,
      id: this.data.listId,
      type: 1, // 类型（1：查勘定损，2：维修，3：拖车，4：救援，5：订单，6：代办）
      key:"survey"
    }
    checkloss.toScene(params, res => {
      wx.hideLoading()
      if (res.status == 1) {
        this.getDetails()
      } else {
        wx.showToast({
          title: res.msg ? res.msg : '请求超时',
        })
      }
    })
  },

  // 添加进度
  toAddDetails() {
    wx.navigateTo({
      url: './add-detailed/add-detailed?id=' + this.data.listId,
    })
  },

  // 结案
  toFinishCase() {
    wx.showLoading({
      title: '结案中...',
    })
    let params = {
      id: this.data.listId,
      key:'survey'
    }
    checkloss.finishCase(params, res => {
      wx.hideLoading()
      if (res.status == 1) {
        this.getDetails()
      } else {
        wx.showToast({
          title: res.msg ? res.msg : '请求超时',
        })
      }
    })
  },

  // 去分配作业员
  toAssignmentTask() {

    var that = this
    wx.navigateTo({
      url: '../pushrepair/pushdistribution/pushdistribution?id=' + that.data.listId + '&mode=checkloss',
    })
  },

  // 更多操作
  operation() {
    this.setData({ 
      showBottomOperation: true
    })
  },

  // 操作---》编辑案件
  editEvent() {
    this.setData({
      showBottomOperation: false
    })
    let data = JSON.stringify(this.data.surveyList)

    wx.navigateTo({
      url: './addcheckloss/addcheckloss?data=' + data,
    })
  },

  // 操作---》删除案件
  deleteEvent() {
    wx.showModal({
      title: '提示',
      content: '确定删除该案件吗？',
      success: res => {
        if (res.confirm) {
          let params = {
            id: this.data.listId,
            key:'survey'
          }
          checkloss.delBusiness(params, res => {
            if (res.status == 1) {
              this.setData({
                showBottomOperation: false
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: res.msg ? res.msg : '操作超时',
              })
            }
          })
        }
      }
    })
  },

  // 操作---》取消案件
  cancelEvent() {
    wx.showModal({
      title: '提示',
      content: '确定取消该案件吗？',
      success: res => {
        if (res.confirm) {
          let params = {
            id: this.data.listId,
            key:'survey'
          }
          checkloss.cancelBusiness(params, res => {
            if (res.status == 1) {
              this.setData({
                showBottomOperation: false
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              wx.showToast({
                title: res.msg ? res.msg : '操作超时',
              })
            }
          })
        }
      }
    })
  },

  // 出现二维码格式
  showQrCode() {
    this.generateQrCode()
    this.setData({
      showQrCode: true,
    })
    // this.setData({
    //   showQrCode: true,
    //   erweimaimgUrl: "https://www.feecgo.com/task/evaluate/qr_code/case_id/" + this.data.listId + "/service_id/" + this.data.service_id
    // })
  },



  // 生成评价二维码
  generateQrCode() {

    wx.request({
      url: Config.restUrl + '/api/auth/QRCode',
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.userinfor.api_token
      }, // 默认值
      data: {
        id: this.data.listId
      },
      responseType: 'arraybuffer',
      success: (res) => {
       
        this.setData({
          erweimaimgUrl: wx.arrayBufferToBase64(res.data)
        })
      }
    })
  },


})