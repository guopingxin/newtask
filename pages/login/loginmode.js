import {
  Base
} from '../../utils/base.js';

class LoginMode extends Base {

  constructor() {
    super();
  }

  login(that, callback) {
    var params = {
      // url: '/task/login/index',
      url:'/api/opt/auth/login',
      type: 'POST',
      data: {
        mobile: that.data.phone,
        password: that.data.psw
      },
      auth: false,
      sCallback: callback
    }
    this.request(params);
  }
}

export {LoginMode}