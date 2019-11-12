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

    //明细列表
    detailedlist:[]
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
      imgUrl: hostName + '/uploads/work/'
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
    checkloss.getBusinessDetail(this.data.listId, res => {
      if (res.status == 1) {

        for (var index in res.schedule){
          if (res.schedule[index].title == "人车合一") {
            this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))

            console.log(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          }

          if (res.schedule[index].title == "车架号") {

            console.log(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
            this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          }

          // if (item.title == "环境照片") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }
          // if (item.title == "验车照片") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }

          // if (item.title == "车损照片") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }

          // if (item.title == "旧伤照片") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }

          // if (item.title == "事故证明") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }

          // if (item.title == "索赔申请书") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }

          // if (item.title == "行驶证") {
          //   this.data.detailedlist.push(JSON.stringify(Object.assign({}, res.schedule.splice(index, 1))))
          // }

          // if (item.title == "驾驶证") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "查勘报告") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "个案签报") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "拒赔材料") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "从业资格证") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "法院判决书") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "调查单证") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }

          // if (item.title == "收款方账户信息") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }


          // if (item.title == "收款方身份证明") {
          //   this.data.detailedlist.push(Object.assign({}, res.schedule.splice(index, 1)))
          // }
        }

        console.log("hh", this.data.detailedlist, res.schedule)

        this.setData({
          surveyList: res.survey,
          schedule: res.schedule,
          detailedlist: this.data.detailedlist
        })
        res.schedule.forEach((item, index) => {
          if (item.title.match('到达现场')) {
            this.setData({
              serviceOperation: true
            })
          }
        })
        this.getInsuranceList()
      }
    })
  },

  // 获取保险公司列表
  getInsuranceList() {
    checkloss.getInsurance(res => {
      if (res.status == 1) {
        res.insurance.forEach((item, index) => {
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
    checkloss.businessReceipt(id, res => {
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
      case_id: this.data.listId,
      type: 1 // 类型（1：查勘定损，2：维修，3：拖车，4：救援，5：订单，6：代办）
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
      id: this.data.listId
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
            id: this.data.listId
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
  cancelEvent(){
    wx.showModal({
      title: '提示',
      content: '确定取消该案件吗？',
      success: res => {
        if (res.confirm) {
          let params = {
            id: this.data.listId
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
    // this.generateQrCode()
    this.setData({
      showQrCode: true,
      erweimaimgUrl: "https://www.feecgo.com/task/evaluate/qr_code/case_id/" + this.data.listId + "/service_id/" + this.data.service_id
    })
  },



  // 生成评价二维码
  generateQrCode() {
    wx.request({
      url: Config.restUrl + '/api/work/QRCode',
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.userInfo.api_token
      }, // 默认值
      data: {
        id: this.data.listId
      },
      responseType: 'arraybuffer',
      success: (res) => {
        this.setData({
          imgUrl: wx.arrayBufferToBase64(res.data)
        })
      }
    })
  },


})