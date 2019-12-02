import {
  Base
} from '../../../utils/base.js'

class Diseasesurvey extends Base {

  //疾病详情
  sicknessinfo(id, that, callback) {
    var params = {
      url: '/api/opt/work/info',
      type: 'GET',
      auth: true,
      data: {
        id: id,
        key: that.data.key,
        type: that.data.type
      },
      sCallback: callback
    }
    this.request(params)
  }


  //图片上传
  sicknessuploads(callback) {
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
  relevant(id, data, callback) {
    var params = {
      url: '/task/sickness/relevant',
      type: 'POST',
      data: {
        id: id,
        data: data
      },
      sCallback: callback
    }
    this.request(params)
  }

  //机构回复
  reply(that, callback) {
    var params = {
      url: '/api/sick/reply',
      type: "POST",
      data: {
        id: that.data.listid,
        suspects: that.data.positivedoubttypeselected,
        give_up: that.data.giveupresult,
        feedback: that.data.problem[that.data.probleminddex],
        all_remark: that.data.all_remark
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

  //系统任务列表
  sicktask(callback) {
    var params = {
      url: '/api/auth/sickTasks',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  //腾讯坐标转地址
  reverseGeocoder(demo, lat, lng, sCallback) {
    demo.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success(res) {
        sCallback && sCallback(res.result)
      },
      fail(error) {
        console.error(error);
      }
    })
  }

  //疾病任务提交
  sickTaskpull(that, callback) {

    var params = {
      url: '/api/sick/task/push',
      type: 'POST',
      data: {
        face_date: that.data.dateTimeArray[0][that.data.dateTime[0]] ? (that.data.dateTimeArray[0][that.data.dateTime[0]] + "-" +
          that.data.dateTimeArray[1][that.data.dateTime[1]] + "-" + that.data.dateTimeArray[2][that.data.dateTime[2]] + " " + that.data.dateTimeArray[3][that.data.dateTime[3]] + ":" + that.data.dateTimeArray[4][that.data.dateTime[4]]) : '',
        face_address: that.data.region[0] ? (that.data.region[0] + '-' + that.data.region[1] + '-' + that.data.region[2]):'',
        task_name: that.data.task_name ? that.data.task_name : '',
        face_relation: that.data.relation[that.data.relationinddex] ? that.data.relation[that.data.relationinddex] : '',
        face_name: that.data.face_name ? that.data.face_name : '',
        face_state: that.data.face_state ? that.data.face_state : '',

        hospital: that.data.hospital ? that.data.hospital : '',
        screen_date: that.data.dateTimeArray[0][that.data.dateTime[0]] ? (that.data.dateTimeArray[0][that.data.dateTime[0]] + "-" + that.data.dateTimeArray[1][that.data.dateTime[1]] + "-" + that.data.dateTimeArray[2][that.data.dateTime[2]] + " " + that.data.dateTimeArray[3][that.data.dateTime[3]] + ":" + that.data.dateTimeArray[4][that.data.dateTime[4]]) : '', 
        screen_type: that.data.investigationtype[that.data.investigationtypeinddex] ? ((that.data.investigationtype[that.data.investigationtypeinddex] == "门诊") ? 1 : ((that.data.investigationtype[that.data.investigationtypeinddex] == "住院") ? 2 : 3)) : '',
        screen_department: that.data.screen_department ? that.data.screen_department : '',
        screen_conclusion: that.data.screen_conclusion ? that.data.screen_conclusion : '',

        id: that.data.id ? that.data.id : '',
        visit_name: that.data.visit_name ? that.data.visit_name : '',
        visit_date: that.data.dateTimeArray[0][that.data.dateTime[0]] ? (that.data.dateTimeArray[0][that.data.dateTime[0]] + "-" + that.data.dateTimeArray[1][that.data.dateTime[1]] + "-" + that.data.dateTimeArray[2][that.data.dateTime[2]] + " " + that.data.dateTimeArray[3][that.data.dateTime[3]] + ":" + that.data.dateTimeArray[4][that.data.dateTime[4]]) : '',
        visit_address: that.data.visit_address ? that.data.visit_address : '',
        is_positive: that.data.positive[that.data.positiveinddex] ? ((that.data.positive[that.data.positiveinddex] == "阳性") ? 1 : 0) : '',
        positive_state: that.data.positive_state ? that.data.positive_state : '',
        visit_conclusion: that.data.visit_conclusion ? that.data.visit_conclusion : '',

        company: that.data.company ? that.data.company : '',
        help_screen_name: that.data.help_screen_name ? that.data.help_screen_name : '',
        help_screen_conclusion: that.data.help_screen_conclusion ? that.data.help_screen_conclusion : '',

        social_security: that.data.social_security ? that.data.social_security : '',
        social_security_screen_conclusion: that.data.social_security_screen_conclusion ? that.data.social_security_screen_conclusion : '',

        medical_org: that.data.medical_org ? that.data.medical_org:'',
        medical_screen: that.data.medical_screen ? that.data.medical_screen : '',
        medical_screen_conclusion: that.data.medical_screen_conclusion ? that.data.medical_screen_conclusion : '',

        accident_address: that.data.accident_address ? that.data.accident_address : '',
        screen_conclusion: that.data.screen_conclusion ? that.data.screen_conclusion : '',

        deal_org: that.data.deal_org ? that.data.deal_org : '',

        image: that.data.pic,
        audio: that.data.audiosrc,
      },
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  //删除记录
  deleteRecord(id, callback) {
    var params = {
      url: '/api/sick/record/' + id + '/delete',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  //获取任务详情列表
  recordlist(id,callback){
    var params = {
      url: "/api/sick/task/" + id +'/record',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  //查看相关资料
  relatedInformation(id, callback){
    var params = {
      url: "/api/sick/" + id + '/data',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

}

export {
  Diseasesurvey
}