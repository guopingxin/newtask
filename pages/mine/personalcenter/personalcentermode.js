import {
  Config
} from '../../../utils/config.js';

import {
  Base
} from '../../../utils/base.js';


var app = getApp();

class Personalcenter extends Base {



  //头像上传
  upFace(url,imageurl,callback){

    wx.uploadFile({
      url: Config.restUrl + url,
      filePath: imageurl,
      method: 'POST',
      name:"image",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + app.globalData.sessionId
      },
      success:function(res){
        callback && callback(res)
      },
      fail:function(res){
        console.log(res)
        callback && callback(res)
      }
    })
  }

  taskEdit(that, callback){
    var params = {
      url: '/task/index/taskEdit',
      type: 'POST',
      data: {
        id: that.data.id,
        face: that.data.file_name,
        nickname: that.data.name
      },
      sCallback: callback
    }
    this.request(params);
  }

  //退出登录
  logOut(callback){
    var params = {
      url: '/task/index/logOut',
      type: 'POST',
      sCallback: callback
    }
    this.request(params);
  }

  //微信解绑
  unbindWX(callback){
    var params = {
      url: '/task/index/unbind',
      type: 'POST',
      sCallback: callback
    }
    this.request(params);
  }

  //微信绑定
  bindWX(code,callback){
    var params = {
      url:'/task/index/bind',
      type:'POST',
      data:{
        js_code:code
      },
      sCallback: callback
    }
    this.request(params);
  }
}

export {Personalcenter}