import {Base} from '../../../utils/base.js'

class Editpsw extends Base{

  constructor(){
    super();
  }

  //修改密码
  setPassword(that,callback){
    var params = {
      url: '/task/index/setPassword',
      type: 'POST',
      data: {
        oldPassword: that.data.older,
        newPassword: that.data.new,
        repPassword: that.data.renew,
      },
      sCallback: callback
    }
    this.request(params);
  }
}

export{Editpsw}