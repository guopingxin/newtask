import {Base} from '../../../utils/base.js'

class Cash extends Base{

  constructor(){
    super();
  }

  //获取金豆数量
  gold(callback){
    var params = {
      url: '/api/index/bean',
      type: 'GET',
      auth:true,
      sCallback: callback
    }
    this.request(params);
  }

  //提现
  withdrawal(that, callback){
    var params = {
      url: '/api/index/withdrawal',
      type: 'POST',
      data:{
        bean: that.data.cashNum,
        openid: that.data.openid,
        true_name: that.data.name
      },
      auth:true,
      sCallback: callback
    }
    this.request(params);
  }

  //提现明细
  detail(that,callback){
    var params = {
      url: '/api/index/detail',
      type: 'GET',
      auth:true,
      sCallback: callback
    }
    this.request(params);
  }
}

export{Cash}