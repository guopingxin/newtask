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
      // name:"image",
      name:'file',
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
      // url: '/task/index/taskEdit',
      url:'/api/opt/index/modify',
      type: 'POST',
      auth: true,
      data: {
        // id: that.data.id,
        face: that.data.file_name,
        name: that.data.name
      },
      sCallback: callback
    }
    this.request(params);
  }

  //退出登录
  logOut(callback){
    var params = {
      url: '/api/opt/index/logout',
      type: 'GET',
      auth:true,
      sCallback: callback
    }
    this.request(params);
  }

  //微信解绑
  unbindWX(callback){
    var params = {
      url: '/api/opt/index/unbind',
      type: 'POST',
      auth: true,
      sCallback: callback
    }
    this.request(params);
  }

  //微信绑定
  bindWX(code,callback){
    var params = {
      url:'/api/opt/index/bind',
      type:'POST',
      data:{
        js_code:code
      },
      auth:true,
      sCallback: callback
    }
    this.request(params);
  }
}

export {Personalcenter}