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
  cancel(){
    wx.navigateBack({
      delta: 0,
    })
  },
  save(){
    if(this.data.newData == ''){
      wx.showToast({
        title: '请输入内容',
        icon: 'error'
      })
    }
    else{
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: server.default.updateUser,
        method: 'POST',
        data:{
          wxid: app.globalData.wxid,
          type: this.data.editType,
          changedData: this.data.newData
        },
        success:(res)=>{
          wx.hideLoading()

          let currentPage = getCurrentPages();
          let lastPage = currentPage[currentPage.length - 2];
          switch (this.data.editType) {
            case 'nickname':
              lastPage.setData({nickname: this.data.newData})
              break;
            case 'desc':
              lastPage.setData({desc: this.data.newData})
              break;
            case 'gender':
              lastPage.setData({gender: this.data.newData})
              break;
            case 'birthday':
              lastPage.setData({birthday: this.data.newData})
              break;
            case 'campus':
              lastPage.setData({campus: parseInt(this.data.newData)})
              break;
            default:
              break;
        }
        wx.navigateBack({
          delta: 0,
        })
      }
    })

    }
    

    
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
})