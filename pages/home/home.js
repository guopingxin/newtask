// pages/home/home.js

import {
  HomeMode
} from './homemode.js'
var home = new HomeMode();

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessmodeshow: false,
    businessmodeshow1: false,
    // businessmode: ['全部', '查勘定损', '车辆维修', '拖车', '事故救援', '调查', '人伤', '洗车', '搭电/换胎', '车辆检测', '代办年审', '代办服务', '疾病调查'],
    // businessmode: ['全部', '查勘定损', '疾病调查'],
    businessmode: [],
    frist: 0,
    tasklist: [],
    businessmode1: ['我的业务', '小组业务'],
    second: 0,
    surveymodeshow: false,
    page: 0,
    keywords: '',
    businessname: '全部',
    group_id: '',
    surveymode: ['全部', '查勘', '定损'],
    diseasesurvey: ['全部案件', '进行中', '待审核', '已结案'],
    casetype: [],
    diseaselist: [],
    spinShow:true,
    key:'',  //业务模块的key/订单模块key=order
    type:'',
    page:1,
    limit:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.userinfor = app.globalData.userinfor;
    that.setData({
      userType: that.data.userinfor.type
    }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var that = this;
    that.data.businessmode=["全部"];
    that.data.tasklist=[];

    that.getModule(response=>{

      response.forEach((item,index)=>{
        that.data.businessmode.push(item.name)
        if (item.key =="survey"){
          that.data.surveybusinessId = item.id
        } else if (item.key == "sickness"){
          that.data.sicknessbusinessId = item.id
        }
      })

      that.setData({
        businessmode:that.data.businessmode
      })

      if (that.data.businessname == '全部') {

        home.lists(that, res => {
          if (res.status == 1) {

            // if (res.data.work.push){
            //   if (res.data.work.push.length > 0) {
            //     res.data.work.push.forEach((item, index) => {
            //       item.datatype = "push"
            //       that.data.tasklist.push(item)
            //     })
            //   }
            // }

            if (res.data.work.survey) {
              if (res.data.work.survey.length > 0) {

                res.data.work.survey.forEach((item, index) => {
                  item.datatype = "survey"
                  item.businessId = that.data.surveybusinessId
                  that.data.tasklist.push(item)
                })
              }
            }

            if (res.data.work.sickness) {
              if (res.data.work.sickness.length > 0) {

                that.data.diseaselist = res.data.work.sickness;

                that.data.diseaselist.forEach((item, index) => {

                  var sick_address = "diseaselist[" + index + "].sick_address";
                  var sick_city = "diseaselist[" + index + "].city";
                  var datatype = "diseaselist[" + index + "].datatype"
                  var sicknessbusinessId = "diseaselist[" + index + "].businessId"

                  
                  var address = item.sick_address.split("-")[0];
                  var city = item.sick_address.split("-")[1];

                  that.setData({
                    [sick_address]: address,
                    [sick_city]: city,
                    [datatype]: "sickness",
                    [sicknessbusinessId]: that.data.sicknessbusinessId
                  })
                  that.data.tasklist.push(item)
                })
              }

            }

            // if (res.data.work.rescue){
            //   if (res.data.rescue.length > 0) {
            //     res.data.rescue.forEach((item, index) => {
            //       item.datatype = "rescue"
            //       that.data.tasklist.push(item)
            //     })
            //   }
            // }

            // if (res.data.trailer){
            //   if (res.data.trailer.length > 0) {
            //     res.data.trailer.forEach((item, index) => {
            //       item.datatype = "trailer"
            //       that.data.tasklist.push(item)
            //     })
            //   }
            // }



            // if (res.data.order){
            //   if (res.order.length > 0) {
            //     res.order.forEach((item, index) => {
            //       item.datatype = "order";

            //       that.data.tasklist.push(item)
            //     })
            //   }
            // }


            that.setData({
              spinShow: false,
              tasklist: that.data.tasklist
            })
          }
        })
      } else if (that.data.businessname == '查勘定损') {

        that.data.key = "work";
        that.data.type = "survey"

        home.lists(that, res => {

          if (res.status == 1) {

            if (res.data.data) {
              if (res.data.data.length > 0) {
                res.data.data.forEach((item, index) => {
                  item.datatype = "survey",
                  item.businessId = that.data.surveybusinessId
                  that.data.tasklist.push(item)
                })

                that.setData({
                  tasklist: res.data.data,
                  businessname: '查勘定损',
                  casetype: that.data.surveymode
                })
              } else {

                that.setData({
                  tasklist: res.data.data,
                  businessname: '查勘定损',
                  casetype: that.data.surveymode
                })
              }
            }
          }

        })

        // home.lists(that, res => {
        //   if (res.status == 1) {

        //     res.data.data.forEach((item,index)=>{
        //       item.datatype = "survey"
        //     })
        //     that.setData({
        //       tasklist: res.survey
        //     })
        //   }
        // })



      } else if (that.data.businessname == '车辆维修') {

        home.push(that, res => {
          if (res.status == 1) {
            that.setData({
              tasklist: res.push
            })
          }
        })
      } else if (that.data.businessname == '拖车') {


      } else if (that.data.businessname == '疾病调查') {

        that.data.key = 'work';
        that.data.type = 'sickness';

        home.lists(that, res => {
          if (res.status == 1) {

            that.data.diseaselist = res.data.data;

            res.data.data.forEach((item, index) => {

              var sick_address = "diseaselist[" + index + "].sick_address";
              var sick_city = "diseaselist[" + index + "].city";
              var datatype = "diseaselist[" + index + "].datatype";
              var sicknessbusinessId = "diseaselist[" + index + "].businessId"

              var address = item.sick_address.split("-")[0];
              var city = item.sick_address.split("-")[1];

              that.setData({
                [sick_address]: address,
                [sick_city]: city,
                [datatype]: "sickness",
                [sicknessbusinessId]: that.data.sicknessbusinessId
              })
            })
            that.setData({
              tasklist: that.data.diseaselist,
              businessname: '疾病调查',
              casetype: that.data.diseasesurvey
            })

            console.log(that.data.diseaselist)

          }
        })


        // home.diseasesurvey(that, res => {
        //   if (res.status == 1) {

        //     that.data.diseaselist = res.data;

        //     res.data.forEach((item, index) => {

        //       var sick_address = "diseaselist[" + index + "].sick_address";
        //       var sick_city = "diseaselist[" + index + "].city";
        //       var datatype = "diseaselist[" + index + "].datatype";
        //       var sicknessbusinessId = "diseaselist[" + index + "].sicknessbusinessId"

        //       var address = item.sick_address.split("-")[0];
        //       var city = item.sick_address.split("-")[1];

        //       that.setData({
        //         [sick_address]: address,
        //         [sick_city]: city,
        //         [datatype]: "rescue",
        //         [sicknessbusinessId]: that.data.sicknessbusinessId
        //       })
        //     })

        //     that.setData({
        //       tasklist: that.data.diseaselist,
        //     })

        //     console.log(that.data.diseaselist)

        //   }
        // })
      }
      
    });


  },

  //添加案件
  addcase: function() {
    var that = this;

    console.log(that.data.businessmode[that.data.frist]);

    if (that.data.businessmode[that.data.frist] == '车辆维修') {

      wx.navigateTo({
        url: '../businessmode/pushrepair/addpushcar/addpushcar',
      })

    } else if (that.data.businessmode[that.data.frist] == '查勘定损') {

      wx.navigateTo({
        url: '../businessmode/checkloss/addcheckloss/addcheckloss?businessId='+that.data.surveybusinessId,
      })

    }

  },

  //数据统计
  datastatistics: function() {

    wx.navigateTo({
      url: '../mine/datastatistics/datastatistics',
    })
  },

  //查勘定损类型选择 组件返回
  onselected: function(e) {

    var that = this;
    var index = e.detail.third;
    that.data.total = [];


    if (that.data.businessmode[that.data.frist] == "查勘定损") {

      // for (var item in that.data.tasklist) {
      //   if (index == 1) {
      //     if (that.data.tasklist[item].type == 0) {
      //       that.data.total.push(that.data.tasklist[item])
      //     }
      //   } else if (index == 2) {
      //     if (that.data.tasklist[item].type == 1 || that.data.tasklist[item].type == 2) {
      //       that.data.total.push(that.data.tasklist[item])
      //     }
      //   } else {
      //     that.data.total.push(that.data.tasklist[item])
      //   }
      //   // that.data.total.datatype = 'survey'
      // }
      // that.setData({
      //   tasklist: that.data.total
      // })
      that.data.key = "work"
      that.data.type = "survey"

      home.lists(that, res => {
        if (res.status == 1) {

          for (var item in res.data.data) {

            if (index == 1) {
              if (res.data.data[item].type == 0) {
                that.data.total.push(res.data.data[item])

              }
            } else if (index == 2) {
              if (res.data.data[item].type == 1 || res.data.data[item].type == 2) {
                that.data.total.push(res.data.data[item])
              }
            } else {
              that.data.total.push(res.data.data[item])
            }
            res.data.data[item].datatype = 'survey'
            res.data.data[item].businessId = that.data.surveybusinessId
          }
          that.setData({
            tasklist: that.data.total
          })

        }else{

        }
      })
      

      // home.survey(that, res => {
      //   if (res.status == 1) {

      //     for (var item in res.survey) {
      //       if (index == 1) {
      //         if (res.survey[item].type == 0) {
      //           that.data.total.push(res.survey[item])
      //         }
      //       } else if (index == 2) {
      //         if (res.survey[item].type == 1 || res.survey[item].type == 2) {
      //           that.data.total.push(res.survey[item])
      //         }
      //       } else {
      //         that.data.total.push(res.survey[item])
      //       }
      //       res.survey[item].datatype = 'survey'
      //     }
      //     that.setData({
      //       tasklist: that.data.total
      //     })

      //     console.log("hh", that.data.tasklist)
      //   }
      // })

    } else if (that.data.businessmode[that.data.frist] == "疾病调查") {

      for (var item in that.data.diseaselist) {
        if (index == 0) {

          that.data.total.push(that.data.diseaselist[item])

        } else if (index == 1) {
          if (that.data.diseaselist[item].status < 4) {
            that.data.total.push(that.data.diseaselist[item])
          }
        } else if (index == 2) {
          if (that.data.diseaselist[item].status == 4) {
            that.data.total.push(that.data.diseaselist[item])
          }
        } else {
          if (that.data.diseaselist[item].status == 5) {
            that.data.total.push(that.data.diseaselist[item])
          }
        }

        that.data.diseaselist[item].sicknessbusinessId = that.data.sicknessbusinessId;
      }

      that.setData({
        tasklist: that.data.total,
      })

    }

  },

  //显示/隐藏业务模块
  businessmode: function() {
    var that = this;
    if (that.data.businessmodeshow) {
      that.setData({
        businessmodeshow: false,
        businessmodeshow1: false
      })
    } else {
      that.setData({
        businessmodeshow: true,
        businessmodeshow1: false
      })
    }
  },

  businessmode1: function() {
    var that = this;
    if (that.data.businessmodeshow1) {
      that.setData({
        businessmodeshow1: false,
        businessmodeshow: false
      })
    } else {
      that.setData({
        businessmodeshow1: true,
        businessmodeshow: false
      })
    }
  },

  //选择业务板块
  selectbusiness: function(e) {

    var that = this;
    that.data.tasklist = [];

    if (that.data.businessmode[e.currentTarget.dataset.index] == "查勘定损") {

      that.setData({
        surveymodeshow: true
      })

      that.data.key ="work"
      that.data.type = "survey"

      home.lists(that, res=>{
        
        if(res.status == 1){

          if (res.data.data) {
            if (res.data.data.length > 0) {
              res.data.data.forEach((item, index) => {
                item.datatype = "survey"
                item.businessId = that.data.surveybusinessId
                that.data.tasklist.push(item)
              })

              that.setData({
                tasklist: res.data.data,
                businessname: '查勘定损',
                casetype: that.data.surveymode
              })
            }else{

              that.setData({
                tasklist: res.data.data,
                businessname: '查勘定损',
                casetype: that.data.surveymode
              })
            }
          }
        }
        
      })

      // home.survey(that, res => {

      //   if (res.status == 1) {

      //     res.survey.forEach((item,index)=>{
      //       item.datatype = 'survey'
      //     })

      //     that.setData({
      //       tasklist: res.survey,
      //       businessname: '查勘定损',
      //       casetype: that.data.surveymode
      //     })

      //   }
      // })

    } else if (that.data.businessmode[e.currentTarget.dataset.index] == "车辆维修") {

      that.setData({
        surveymodeshow: false
      })

      home.push(that, res => {

        if (res.status == 1) {

          res.push.forEach((item,index)=>{
            item.datatype = 'push'
          })
          that.setData({
            tasklist: res.push,
            businessname: '车辆维修'
          })
        }
      })

    } else if (that.data.businessmode[e.currentTarget.dataset.index] == "拖车") {

      that.setData({
        surveymodeshow: false
      })

      home.trailer(that, res => {

        if (res.status == 1) {
          that.setData({
            tasklist: res.trailer,
            businessname: '拖车'
          })
        } else {
          that.setData({
            tasklist: [],
            businessname: '拖车'
          })
        }
      })

    } else if (that.data.businessmode[e.currentTarget.dataset.index] == "疾病调查") {

      that.setData({
        surveymodeshow: true
      })

      that.data.key = 'work';
      that.data.type = 'sickness'

      home.lists(that, res => {
        if (res.status == 1) {

          that.data.diseaselist = res.data.data;

          res.data.data.forEach((item, index) => {

            var sick_address = "diseaselist[" + index + "].sick_address";
            var sick_city = "diseaselist[" + index + "].city";
            var datatype = "diseaselist[" + index + "].datatype"
            var sicknessbusinessId = "diseaselist[" + index + "].businessId"


            var address = item.sick_address.split("-")[0];
            var city = item.sick_address.split("-")[1];
            
            that.setData({
              [sick_address]: address,
              [sick_city]: city,
              [datatype]: "sickness",
              [sicknessbusinessId]: that.data.sicknessbusinessId
            })
          })
          that.setData({
            tasklist: that.data.diseaselist,
            businessname: '疾病调查',
            casetype: that.data.diseasesurvey
          })
          
          console.log(that.data.diseaselist)

        }
      })

    } else {
      that.setData({
        surveymodeshow: false
      })

      that.data.key = "";
      that.data.type = ""

      home.lists(that, res => {
        if (res.status == 1) {

          // if (res.data.work.push){
          //   if (res.data.work.push.length > 0) {
          //     res.data.work.push.forEach((item, index) => {
          //       item.datatype = "push"
          //       that.data.tasklist.push(item)
          //     })
          //   }
          // }

          if (res.data.work.survey) {
            if (res.data.work.survey.length > 0) {
              res.data.work.survey.forEach((item, index) => {
                item.datatype = "survey"
                that.data.tasklist.push(item)
              })
            }
          }

          if (res.data.work.sickness) {
            if (res.data.work.sickness.length > 0) {

              that.data.diseaselist = res.data.work.sickness;

              that.data.diseaselist.forEach((item, index) => {

                var sick_address = "diseaselist[" + index + "].sick_address";
                var sick_city = "diseaselist[" + index + "].city";
                var datatype = "diseaselist[" + index + "].datatype";
                var sicknessbusinessId = "diseaselist[" + index + "].businessId"

                var address = item.sick_address.split("-")[0];
                var city = item.sick_address.split("-")[1];

                that.setData({
                  [sick_address]: address,
                  [sick_city]: city,
                  [datatype]: "sickness",
                  [sicknessbusinessId]: that.data.sicknessbusinessId
                })
                that.data.tasklist.push(item)
              })
            }
          }

          that.setData({
            spinShow: false,
            tasklist: that.data.tasklist
          })
        }
      })

      // home.lists(res => {
      //   if (res.status == 1) {

      //     if (res.data.push){
      //       if (res.data.push.length > 0) {

      //         res.data.push.forEach((item, index) => {
      //           item.datatype = "push"
      //           that.data.tasklist.push(item)
      //         })
      //       }
      //     }

      //     if (res.data.survey){
      //       if (res.data.survey.length > 0) {
      //         res.data.survey.forEach((item, index) => {
      //           item.datatype = "survey"
      //           that.data.tasklist.push(item)
      //         })
      //       }
      //     }

      //     if (res.data.rescue){
      //       if (res.data.rescue.length > 0) {
      //         res.data.rescue.forEach((item, index) => {
      //           item.datatype = "rescue"
      //           that.data.tasklist.push(item)
      //         })
      //       }
      //     }

      //     if (res.data.trailer){
      //       if (res.data.trailer.length > 0) {
      //         res.data.trailer.forEach((item, index) => {
      //           item.datatype = "trailer"
      //           that.data.tasklist.push(item)
      //         })
      //       }
      //     }
          
      //     if (res.order){
      //       if (res.order.length > 0) {
      //         res.order.forEach((item, index) => {
      //           item.datatype = "order";

      //           that.data.tasklist.push(item)
      //         })
      //       }
      //     }
        
      //     that.setData({
      //       tasklist: that.data.tasklist
      //     })

      //     console.log(that.data.tasklist)
      //   }
      // })
    }

    that.setData({
      frist: e.currentTarget.dataset.index,
      businessmodeshow: false
    })

  },

  selectbusiness1: function(e) {

    var that = this;
    that.setData({
      second: e.currentTarget.dataset.index,
      businessmodeshow1: false
    })

    if (that.data.businessmode[that.data.frist] == "查勘定损") {

      if (that.data.second == 0) {
        that.data.group_id = ''
      } else {
        that.data.group_id = that.data.userinfor.group_id
      }
      // home.survey(that, res => {
      //   if (res.status == 1) {
          
      //     res.survey.forEach((item,index)=>{
      //       item.datatype = 'survey'
      //     })

      //     that.setData({
      //       tasklist: res.survey
      //     })
      //   }
      // })

      that.data.key = "work"
      that.data.type = "survey"

      home.lists(that, res => {

        if (res.status == 1) {

          if (res.data.data) {
            if (res.data.data.length > 0) {
              res.data.data.forEach((item, index) => {
                item.datatype = "survey"
                item.businessId = that.data.surveybusinessId
                that.data.tasklist.push(item)
              })

              that.setData({
                tasklist: res.data.data,
                businessname: '查勘定损',
                casetype: that.data.surveymode
              })
            } else {

              that.setData({
                tasklist: res.data.data,
                businessname: '查勘定损',
                casetype: that.data.surveymode
              })
            }
          }
        }

      })
    } else if (that.data.businessmode[that.data.frist] == "车辆维修") {

      if (that.data.second == 0) {
        that.data.group_id = ''
      } else {
        that.data.group_id = that.data.userinfor.group_id
      }

      home.push(that, res => {
        if (res.status == 1) {

          res.push.forEach((item,index)=>{
            item.datatype = "push"
          })
          that.setData({
            tasklist: res.push
          })
        }
      })
    } else if (that.data.businessmode[that.data.frist] == "疾病调查") {

      if (that.data.second == 0) {
        that.data.group_id = ''
      } else {
        that.data.group_id = that.data.userinfor.group_id
      }

      // home.diseasesurvey(that, res => {
      //   if (res.status == 1) {

      //     that.data.diseaselist = res.data;

      //     res.data.forEach((item, index) => {

      //       var sick_address = "diseaselist[" + index + "].sick_address";
      //       var sick_city = "diseaselist[" + index + "].city";
      //       var datatype = "diseaselist[" + index + "].datatype"

      //       var address = item.sick_address.split("-")[0];
      //       var city = item.sick_address.split("-")[1];
            
      //       that.setData({
      //         [sick_address]: address,
      //         [sick_city]: city,
      //         [datatype]:"rescue"
      //       })
      //     })

      //     that.setData({
      //       tasklist: that.data.diseaselist,
      //     })

      //     console.log(that.data.diseaselist)

      //   }
      // })

      that.data.key = 'work';
      that.data.type = 'sickness'

      home.lists(that, res => {
        if (res.status == 1) {

          that.data.diseaselist = res.data.data;

          res.data.data.forEach((item, index) => {

            var sick_address = "diseaselist[" + index + "].sick_address";
            var sick_city = "diseaselist[" + index + "].city";
            var datatype = "diseaselist[" + index + "].datatype"
            var sicknessbusinessId = "diseaselist[" + index + "].businessId"


            var address = item.sick_address.split("-")[0];
            var city = item.sick_address.split("-")[1];

            that.setData({
              [sick_address]: address,
              [sick_city]: city,
              [datatype]: "sickness",
              [sicknessbusinessId]: that.data.sicknessbusinessId
            })
          })
          that.setData({
            tasklist: that.data.diseaselist,
            businessname: '疾病调查',
            casetype: that.data.diseasesurvey
          })

          console.log(that.data.diseaselist)

        }
      })
    }else{

      home.lists(that, res => {
        if (res.status == 1) {

          // if (res.data.work.push){
          //   if (res.data.work.push.length > 0) {
          //     res.data.work.push.forEach((item, index) => {
          //       item.datatype = "push"
          //       that.data.tasklist.push(item)
          //     })
          //   }
          // }

          if (res.data.work.survey) {
            if (res.data.work.survey.length > 0) {

              res.data.work.survey.forEach((item, index) => {
                item.datatype = "survey"
                item.businessId = that.data.surveybusinessId
                that.data.tasklist.push(item)
              })
            }
          }

          if (res.data.work.sickness) {
            if (res.data.work.sickness.length > 0) {

              that.data.diseaselist = res.data.work.sickness;

              that.data.diseaselist.forEach((item, index) => {

                var sick_address = "diseaselist[" + index + "].sick_address";
                var sick_city = "diseaselist[" + index + "].city";
                var datatype = "diseaselist[" + index + "].datatype";
                var sicknessbusinessId = "diseaselist[" + index + "].businessId"

                var address = item.sick_address.split("-")[0];
                var city = item.sick_address.split("-")[1];

                that.setData({
                  [sick_address]: address,
                  [sick_city]: city,
                  [datatype]: "sickness",
                  [sicknessbusinessId]: that.data.sicknessbusinessId
                })
                that.data.tasklist.push(item)
              })
            }
          }

          // if (res.data.work.rescue){
          //   if (res.data.rescue.length > 0) {
          //     res.data.rescue.forEach((item, index) => {
          //       item.datatype = "rescue"
          //       that.data.tasklist.push(item)
          //     })
          //   }
          // }

          // if (res.data.trailer){
          //   if (res.data.trailer.length > 0) {
          //     res.data.trailer.forEach((item, index) => {
          //       item.datatype = "trailer"
          //       that.data.tasklist.push(item)
          //     })
          //   }
          // }



          // if (res.data.order){
          //   if (res.order.length > 0) {
          //     res.order.forEach((item, index) => {
          //       item.datatype = "order";

          //       that.data.tasklist.push(item)
          //     })
          //   }
          // }


          that.setData({
            spinShow: false,
            tasklist: that.data.tasklist
          })
        }
      })

      // home.lists(res => {
      //   if (res.status == 1) {

      //     if (res.data.push.length > 0) {

      //       res.data.push.forEach((item, index) => {
      //         item.datatype = "push"
      //         that.data.tasklist.push(item)
      //       })
      //     }
      //     if (res.data.survey.length > 0) {
      //       res.data.survey.forEach((item, index) => {
      //         item.datatype = "survey"
      //         that.data.tasklist.push(item)
      //       })
      //     }

      //     if (res.data.rescue.length > 0) {
      //       res.data.rescue.forEach((item, index) => {
      //         item.datatype = "rescue"
      //         that.data.tasklist.push(item)
      //       })
      //     }

      //     if (res.data.trailer.length > 0) {
      //       res.data.trailer.forEach((item, index) => {
      //         item.datatype = "trailer"
      //         that.data.tasklist.push(item)
      //       })
      //     }

      //     if (res.order.length > 0) {
      //       res.order.forEach((item, index) => {
      //         item.datatype = "order";

      //         that.data.tasklist.push(item)
      //       })
      //     }

      //     that.setData({
      //       tasklist: that.data.tasklist
      //     })

      //     console.log(that.data.tasklist)
      //   }
      // })
    }
  },

  //用户模块
  getModule(callback){
    var that = this
    home.getUserModule(res=>{
      console.log(res)
      if(res.status == 1){
        callback && callback(res.data)
      }
    })
  }
})