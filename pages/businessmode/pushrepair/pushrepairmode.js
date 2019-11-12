import {Base} from '../../../utils/base.js'

class Pushrepair extends Base{

  //添加推修案件
  addpushcase(that,callback){
    var params = {
      url: '/task/push/add',
      type: 'POST',
      data: {
        car_no: that.data.carnum,
        recognizee: that.data.username,
        brand_id: that.data.brandId,
        mobile: that.data.phone,
        remark:that.data.beizhu
      },
      sCallback: callback
    }
    this.request(params);
  }

  //推修详情
  pushinfo(id, callback){
    var params = {
      url: '/task/push/info',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //推修服务商信息
  serviceinfo(id,callback){
    var params = {
      url: '/task/index/service_info',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //作业人员信息
  taskinfo(id, callback){
    var params = {
      url: '/task/index/taskInfo',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //推修接单
  receive(id, callback){
    var params = {
      url: '/task/push/receive',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //推修分配作业员
  allot(url,id, taskid, callback){
    var params = {
      url: url,
      type: 'POST',
      data: {
        id: id,
        task_id: taskid
      },
      sCallback: callback
    }
    this.request(params);
  }

  //获取推修分配人员列表
  taskslist(callback){
    var params = {
      url: '/task/base/tasks',
      type: 'GET',
      sCallback: callback
    }
    this.request(params);
  }
}

export { Pushrepair}