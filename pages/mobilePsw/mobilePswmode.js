import {Base} from '../../utils/base.js'

class MobilePswmode extends Base{

  constructor(){
    super();
  }

  //发送短信验证码
  setCode(mobile, callback) {
    var params = {
      url: '/task/login/getPwd',
      type: 'POST',
      data: {
        mobile: mobile
      },
      sCallback: callback
    }
    this.request(params);
  }

  //忘记密码
  setPwd(that,callback){
    var params = {
      url: '/task/login/setPwd',
      type: 'POST',
      data: {
        mobile: that.data.phoneNum,
        code: that.data.code,
        password: that.data.psw1,
        passwords: that.data.psw2
      },
      sCallback: callback
    }
    this.request(params);
  }
}

export {MobilePswmode}