import {
  Base
} from '../../utils/base.js'

class HomeMode extends Base {

  constructor() {
    super();
  }

  //查勘定损
  survey(that, callback) {
    var params = {
      url: '/task/survey/index',
      type: 'POST',
      data: {
        page: that.data.page,
        group_id: that.data.group_id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //车辆推修
  push(that, callback) {
    var params = {
      url: '/task/push/index',
      type: 'POST',
      data: {
        page: that.data.page,
        group_id: that.data.group_id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //拖车
  trailer(that, callback) {
    var params = {
      url: '/task/trailer/index',
      type: 'POST',
      data: {
        page: that.data.page,
        group_id: that.data.group_id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //疾病调查
  diseasesurvey(that, callback) {
    var params = {
      url: '/task/sickness/index',
      type: 'POST',
      data: {
        page: that.data.page,
        group_id: that.data.group_id
      },
      sCallback: callback
    }
    this.request(params);
  }

  //所有案件列表
  lists(that,callback) {

    var params = {
      // url: '/task/index/lists',
      url:'/api/opt/work/lists',
      type: 'GET',
      auth:true,
      data:{
        key:that.data.key,
        type:that.data.type,
        page:that.data.page,
        limit:that.data.limit,
        group_id: that.data.type =='survey'?that.data.group_id:''  
      },
      sCallback: callback
    }
    this.request(params);
  }

  // 订单分类列表
  orderClassify(callback) { 
    var params = {
      url: '/api/auth/classify',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 获取用户模块
  getUserModule(callback){
    var params = {
      url: '/api/auth/modules',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }
}

export {
  HomeMode
}