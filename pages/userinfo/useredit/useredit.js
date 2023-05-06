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
    // this.getOpenerEventChannel.emit('userEdit', this.data.newData)
  },
  doneNick(e){
    //检查昵称占用情况

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