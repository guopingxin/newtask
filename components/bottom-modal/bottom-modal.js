// 底部操作模态框
Component({
  properties: {
    isShow: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  data: {

  },
  methods: {
    closeModal() {
      this.setData({
        isShow: false
      })
    },

    toEdit() {
      this.triggerEvent('editEvent')
    },

    toDelete(){
      this.triggerEvent('deleteEvent')
    },

    toCancel(){
      this.triggerEvent('cancelEvent')
    }
  }
})
