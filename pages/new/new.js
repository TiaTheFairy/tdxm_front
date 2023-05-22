import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    name: '',
    location: '',
    oldprice: '',
    newprice: '',
    desc: ''
  },
  setupInputName(e){
    this.setData({
      name: e.detail.value
    })
  },
  setupInputLocation(e){
    this.setData({
      location: e.detail.value
    })
  },
  setupInputOldprice(e){
    this.setData({
      oldprice: e.detail.value
    })
  },
  setupInputNewprice(e){
    this.setData({
      newprice: e.detail.value
    })
  },
  setupInputDesc(e){
    this.setData({
      desc: e.detail.value
    })
  },
  confirmButton(){
    console.log(this.data.name, this.data.location, this.data.oldprice, this.data.newprice, this.data.desc);
    wx.request({
      url: server.default.createPost,
      method: 'POST',
      data:{
        name: this.data.name,
        location: this.data.location,
        oldprice: this.data.oldprice,
        newprice: this.data.newprice,
        desc: this.data.desc,
        postID: app.globalData.wxid
      }
    })
  }
})
