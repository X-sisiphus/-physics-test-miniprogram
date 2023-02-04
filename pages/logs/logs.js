// logs.js
var app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    answersList:[],
    questionsList:[],
    items: [
        {value: 'USA', name: 'a.xxx'},
        {value: 'CHN', name: 'b.xxx'},
        {value: 'BRA', name: 'c.xxx'},
        {value: 'JPN', name: 'd.xxx'},
      ]
  },
  send(){
    wx.request({
      url: 'https://springboot-lz20-2957-4-1313283788.sh.run.tcloudbase.com/question/submitAnswer',
    header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
     success(res) {
       console.log(res.data)
     }
    })
  },
 info(){
    var that=this;
     var data1 = app.globalData.data;
    
    this.answersList=[
      ];
    wx.request({
        url: 'https://springboot-lxd3-28335-7-1313283788.sh.run.tcloudbase.com/test/test?testId='+data1,
      header: {
        Authorization:''

        },
        method: 'GET',
       success(res) {
        console.log(res.data.result)
        that.setData({
        questionsList: res.data.result.questionList,
        })
       }
      })
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.currentTarget.dataset.questionskey);
    this.answersList.push(
      {
        "question_id": e.currentTarget.dataset.questionsid,
        "params": e.currentTarget.dataset.questionsparams,
        "answer":e.detail.value
      }
    );
    console.log(this.answersList);
    
  },
  
  bindViewTap() {
    wx.request({
      url: 'https://springboot-lz20-2957-4-1313283788.sh.run.tcloudbase.com/question/submitAnswer',
    method: 'POST',
    data: {
    "testId": 1,
    "studentId": "3020244138",
    "studentName": "fye",
    "answersList": this.answersList
    }
    })
    wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })}, 1000)
  },
  onLoad: function (){
      this.info();
  }
})
