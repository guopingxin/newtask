import {Base} from "../../../utils/base.js"

class Checkloss extends Base{

  constructor(){
    super()
  }

  //获取保险公司
  getInsurance(callback) {
    var params = {
      // url: '/task/index/systemInsurance',
      url:'/api/auth/insurance',
      type: 'GET',
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  // 编辑业务
  editBusiness(param, callback) {
    var params = {
      url: '/api/opt/work/edit',
      type: 'POST',
      data: param,
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  // 增加业务
  addBusiness(param, callback) {
    var params = {
      // url: '/task/survey/add',
      url:'/api/opt/work/increase',
      auth:true,
      type: 'POST',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 业务详情
  getBusinessDetail(id, key,that,callback) {
    var params = {
      // url: '/task/survey/info',
      url:'/api/opt/work/info',
      type: 'GET',
      data: {
        id: id,
        key: key,
        type: that.data.businessId
      },
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  // 接单
  businessReceipt(id,key,callback) {
    var params = {
      url: '/api/opt/work/accept',
      type: 'GET',
      data: {
        id: id,
        key:key
      },
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  // 到达现场
  toScene(param, callback) {
    var params = {
      // url: '/task/survey/schedule',
      url:'/api/opt/work/arrive',
      type: 'GET',
      data: param,
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  // 查勘定损---》添加明细
  addDetailed(param, callback) {
    var params = {
      // url: '/task/survey/schedule',
      url:'/api/opt/work/schedule',
      type: 'POST',
      data: param,
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  // 完成结案
  finishCase(param, callback) {
    var params = {
      url: '/api/opt/work/finish',
      type: 'POST',
      data: param,
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  //查勘定损分配作业员
  allot(id, taskid, callback) {
    var params = {
      url: '/task/opt/survey/allot',
      type: 'POST',
      data: {
        id: id,
        task_id: taskid
      },
      sCallback: callback
    }
    this.request(params);
  }

  //查勘定损删除
  delBusiness(param, callback){
    var params = {
      url: '/api/opt/work/remove',
      type: 'GET',
      data: param,
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }

  //查勘定损取消
  cancelBusiness(param, callback){
    var params = {
      url: '/api/opt/work/cancel',
      type: 'POST',
      data: param,
      auth:true,
      sCallback: callback
    }
    this.request(params)
  }


  
}

export {Checkloss}