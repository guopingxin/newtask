import {Base} from '../../../utils/base.js'

class Cash extends Base{

  constructor(){
    super();
  }

  //获取金豆数量
  gold(callback){
    var params = {
      url: '/task/index/gold',
      type: 'POST',
      sCallback: callback
    }
    this.request(params);
  }

  //提现
  withdrawal(that, callback){
    var params = {
      url: '/task/index/withdrawal',
      type: 'POST',
      data:{
        bean: that.data.cashNum,
        openid: that.data.openid,
        true_name: that.data.name
      },
      sCallback: callback
    }
    this.request(params);
  }

  //提现明细
  detail(that,callback){
    var params = {
      url: '/task/index/detail',
      type: 'GET',
      data: {
        page:that.data.page
      },
      sCallback: callback
    }
    this.request(params);
  }
}

export{Cash}