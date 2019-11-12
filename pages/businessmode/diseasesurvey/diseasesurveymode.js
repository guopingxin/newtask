import {Base} from '../../../utils/base.js'

class Diseasesurvey extends Base{

  //疾病详情
  sicknessinfo(id, callback) {
    var params = {
      url: '/task/sickness/info',
      type: 'GET',
      data: {
        id:id
      },
      sCallback: callback
    }
    this.request(params)
  }


  //图片上传
  sicknessuploads(callback){
    var params = {
      url: '/task/sickness/info',
      type: 'GET',
      data: {
        id: id
      },
      sCallback: callback
    }
    this.request(params)
  }

  //相关资料上传
  relevant(id,data,callback){
    var params = {
      url: '/task/sickness/relevant',
      type: 'POST',
      data: {
        id: id,
        data:data
      },
      sCallback: callback
    }
    this.request(params)
  }

  //机构回复
  reply(that, callback){
    var params = {
      url:'/task/sickness/reply',
      type:"POST",
      data: {
        id: that.data.listid,
        suspects:that.data.suspects,
        province: that.data.regionvalue[0],
        money: that.data.money,
        give_up: that.data.giveupresult,
        feedback: that.data.feedback
      },
      sCallback: callback
    }
    this.request(params)
  }

  //疾病调查资料上传
  finish(that, callback) {
    var params = {
      url: '/task/sickness/finish',
      type: 'POST',
      data: {
        id: that.data.id,
        step: that.data.step,
        pic: that.data.pic
      },
      sCallback: callback
    }
    this.request(params)
  }
}

export {Diseasesurvey}