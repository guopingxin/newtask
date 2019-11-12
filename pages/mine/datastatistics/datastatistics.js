// pages/mine/datastatistics/datastatistics.js
import * as echarts from '../../../components/ec-canvas/echarts.min.js';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    // title: {
    //   // text: '测试下面legend的红色区域不应被裁剪',
    //   left: 'center'
    // },
    // color: ["#9fbeff", '#2f4554'],
    legend: {
      // data: ['A', 'B', 'C'],
      // top: 50,
      // left: 'center',
      // backgroundColor: 'red',
      // z: 100
    },
    grid: {
      containLabel: true,
      left: 0,
      right: 10,
      // borderColor:"#1a65ff"
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      // borderColor: "#1a65ff",
      // axisPointer: {
      //   type: 'cross',
      //   label: {
      //     backgroundColor: '#1a65ff'
      //   }
      // }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周四', '周五', '周六', '周日'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: true,
        inside: true,
        length: 3
      },
      splitNumber: 4,
      axisLabel: {
        rotate: 45,
        interval: 1,
        // padding:4
      },
      min: 1
      // position:bottom,
      // offset:10
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      axisTick: {
        show: false
      },
      splitLine: {     //分割线
        // lineStyle: {
        //   type: 'dotted'
        // }
        show:false
      },
      show: true,
      min: 0,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [{
      // name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 55, 78, 40, 33, 56, 58, 36, 20],
      areaStyle: {},
      itemStyle: {
        normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#92b5ff' // 0% 处的颜色
          }, {
            offset: 0.5, color: '#b5cdff' // 100% 处的颜色
          }, {
            offset: 1, color: '#fff' // 100% 处的颜色
          }]
          ),  //背景渐变色 
          // lineStyle: {        // 系列级个性化折线样式  
          //   width: 3,
          //   type: 'solid',
          //   color: "#4fd6d2"
          // }
        },
        // emphasis: {
        //   color: '#4fd6d2',
        //   lineStyle: {        // 系列级个性化折线样式  
        //     width: 2,
        //     type: 'dotted',
        //     color: "#4fd6d2" //折线的颜色
        //   }
        // }
      },//线条样式  
    },
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    taskCategory: [{ text: '车辆维修', num: 10 }, { text: '车辆维修', num: 10 }, { text: '车辆维修', num: 10 }, { text: '车辆维修', num: 10 }, { text: '车辆维修', num: 10 }],
    chart_date: ['今日', '昨日', '本周', '本月'],
    dataIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {

  },

  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  selecteddate: function (e) {
    var that = this;
    console.log("e")
    that.setData({
      dataIndex: e.currentTarget.dataset.index
    })
  },


})