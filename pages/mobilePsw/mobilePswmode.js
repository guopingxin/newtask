import {Base} from '../../utils/base.js'

class MobilePswmode extends Base{

  constructor(){
    super();
  }

  //发送短信验证码
  setCode(mobile, callback) {
    var params = {
      // url: '/task/login/getPwd',
      url:'/api/auth/sms',
      type: 'GET',
      data: {
        mobile: mobile
      },
      auth: false,
      sCallback: callback
    }
    this.request(params);
  }

  //忘记密码
  setPwd(that,callback){
    var params = {
      // url: '/task/login/setPwd',
      url:'/api/opt/auth/forget',
      type: 'POST',
      data: {
        mobile: that.data.phoneNum,
        code: that.data.code,
        password: that.data.psw1,
        repeat_password: that.data.psw2
      },
      auth: false,
      sCallback: callback
    }
    this.request(params);
  }
}

export {MobilePswmode}