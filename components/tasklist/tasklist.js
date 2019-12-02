//任务流案件列表
Component({
  properties: {
    tasklist: Array,
    surveymodeshow: Boolean,
    businessname:String,
    casetype: Array
  },
  data: {
    third: 0 
  },
  methods: {

    todetail: function(e) {

      console.log("rrr",e)
      var that = this
      var listId = e.currentTarget.id;
      var type = e.currentTarget.dataset.type;
      var city = e.currentTarget.dataset.city;
      var province = e.currentTarget.dataset.sick_address
      var datatype = e.currentTarget.dataset.datatype
      var businessId = e.currentTarget.dataset.businessid

      if (datatype == 'survey'){

        wx.navigateTo({
          url: '../businessmode/checkloss/checkloss?listId=' + listId + "&type=" + type + "&businessId=" + businessId,
        })

      } else if (datatype == 'sickness'){

        // var item = e.currentTarget.dataset.item

        wx.navigateTo({
          url: '../businessmode/diseasesurvey/diseasesurvey?listId=' + listId + '&city=' + city + '&province=' + province  + "&businessId=" + businessId,
        })

        // wx.navigateTo({
        //   url: '../businessmode/diseasesurvey/diseasetask/diseasetask?listId=' + listId + '&city=' + city + '&province=' + province + '&item=' + JSON.stringify(item) + "&businessId=" + businessId,
        // })

      } 

      // if(that.properties.businessname == '查勘定损'){

      //   wx.navigateTo({
      //     url: '../businessmode/checkloss/checkloss?listId=' + listId + "&type=" + type,
      //   })

      // } else if (that.properties.businessname == '车辆维修'){

      //   wx.navigateTo({
      //     url: '../businessmode/pushrepair/pushrepair?listId=' + listId,
      //   })
      // } else if (that.properties.businessname == '拖车'){
        
      //   wx.navigateTo({
      //     url: './trailer/trailerDeatail/trailerDeatail?listId=' + listId,
      //   })

      // } else if (that.properties.businessname == '疾病调查'){

      //   wx.navigateTo({
      //     url: '../businessmode/diseasesurvey/diseasesurvey?listId=' + listId + '&city=' + city + '&province=' + province,
      //   })

      // }

      
    },

    selectsurveymode: function(e) {

      var that = this;
      
      that.setData({
        third: e.currentTarget.dataset.index
      })

      this.triggerEvent('onselected', {
        third: e.currentTarget.dataset.index
      })
    }
  }
})