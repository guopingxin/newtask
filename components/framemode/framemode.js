//弹框样式
Component({
  properties: {
    giveup: Boolean,
    animationData:Object
  },
  data: {
    sure:''
  },
  methods: {

    cancel: function (e) {
      var that = this;

      var animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })

      that.animation = animation
      animation.translateY(300).step()
      that.setData({
        animationData: animation.export(),

      })

      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          giveup: true
        })
      }.bind(this), 400)

      console.log("ee",e)
      that.triggerEvent('onselected', {
        sure: e.currentTarget.dataset.sure
      })
    },
  }

})