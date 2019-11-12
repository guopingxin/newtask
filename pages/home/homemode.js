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
  lists(callback) {
    var params = {
      url: '/task/index/lists',
      type: 'GET',
      sCallback: callback
    }
    this.request(params);
  }

  // 订单分类列表
  orderClassify(callback) { 
    var params = {
      url: '/api/index/classify',
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