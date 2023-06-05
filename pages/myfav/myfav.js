import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    list: [],
    listEmpty: true
  },
  getList(keyword='', order='time'){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.getListFav,
      method: 'POST',
      data:{
        wxid: app.globalData.wxid,
        keyword: keyword,
        order: order
      },
      success:(res)=>{
        wx.hideLoading()
        if(res.data.list.length == 0){
          this.setData({
            listEmpty: true
          })
        }
        else{
          this.setData({
            listEmpty: false,
            list: res.data.list
          })
        }
      }
    })
  },
  onLoad(){
    this.getList();
  }
})
