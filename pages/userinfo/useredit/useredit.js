import * as server from '../../../server.js'
var app = getApp()
Page({
  data: {
    editType: "",
    default: "",
    newData: "",
    campusArray: ["石牌校区","番禺校区","珠海校区","深圳校区"],
    disableSave: true
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  cancel(){
    wx.navigateBack({
      delta: 0,
    })
  },
  save(){
    wx.request({
      url: server.default.updateUser,
      method: 'POST',
      data:{
        wxid: app.globalData.wxid,
        username: this.data.editType == 'nickname' ? this.data.newData : '',
        desc: this.data.editType == 'desc' ? this.data.newData : '',
        gender: this.data.editType == 'gender' ? this.data.newData : -1,
        campus: this.data.editType == 'campus' ? this.data.newData : -1,
        birthdya: this.data.editType == 'birthday' ? this.data.newData : [0,0,0],
      },
      success:(res)=>{
        console.log('updated!');
        // this.getOpenerEventChannel.emit('userEdit', this.data.newData)
      }
    })
  },
  doneNick(e){
    this.setData({
      newData: e.detail.value,
      disableSave: false
    })
  },
  doneDesc(e){
    this.setData({
      newData: e.detail.value,
      disableSave: false
    })
  },
  doneGender(e){
    this.setData({
      newData: e.detail.value,
      disableSave: false
    })
  },
  doneBirthday(e){
    var times = [parseInt(e.detail.value.substring(0,4)), parseInt(e.detail.value.substring(5,7)) ,parseInt(e.detail.value.substring(8,10))]
    this.setData({
      default: times,
      newData: times,
      disableSave: false
    })
  },
  doneCampus(e){
    this.setData({
      default: e.detail.value,
      newData: e.detail.value,
      disableSave: false
    })
  },
  onLoad(options) {
    var params = JSON.parse(options.p);
    this.setData({
      editType : params.t,
      default: params.d,
    })
  },
  onReady() {
  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  }
})