import {Base} from '../../../utils/base.js'

class Editpsw extends Base{

  constructor(){
    super();
  }

  //修改密码
  setPassword(that,callback){
    var params = {
      url: '/api/opt/index/changePwd',
      type: 'POST',
      data: {
        old_password: that.data.older,
        password: that.data.new,
        repeat_password: that.data.renew,
      },
      auth:true,
      sCallback: callback
    }
    this.request(params);
  }
}

export{Editpsw}