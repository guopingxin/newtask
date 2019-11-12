import {Base} from "../../../utils/base.js"

class Checkloss extends Base{

  constructor(){
    super()
  }

  //获取保险公司
  getInsurance(callback) {
    var params = {
      url: '/task/index/systemInsurance',
      type: 'GET',
      sCallback: callback
    }
    this.request(params)
  }

  // 编辑业务
  editBusiness(param, callback) {
    var params = {
      url: '/task/survey/edit',
      type: 'POST',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 增加业务
  addBusiness(param, callback) {
    var params = {
      url: '/task/survey/add',
      type: 'POST',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 业务详情
  getBusinessDetail(id, callback) {
    var params = {
      url: '/task/survey/info',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 接单
  businessReceipt(id,callback) {
    var params = {
      url: '/task/survey/receive',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 到达现场
  toScene(param, callback) {
    var params = {
      url: '/task/survey/schedule',
      type: 'POST',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 查勘定损---》添加明细
  addDetailed(param, callback) {
    var params = {
      url: '/task/survey/schedule',
      type: 'POST',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 完成结案
  finishCase(param, callback) {
    var params = {
      url: '/task/survey/finish',
      type: 'GET',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  //查勘定损分配作业员
  allot(id, taskid, callback) {
    var params = {
      url: '/task/survey/allot',
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
      url: '/task/survey/delete',
      type: 'GET',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  //查勘定损取消
  cancelBusiness(param, callback){
    var params = {
      url: '/task/survey/cancel',
      type: 'GET',
      data: param,
      sCallback: callback
    }
    this.request(params)
  }


  
}

export {Checkloss}