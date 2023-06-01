import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    searchInput: '',
    orderBy: 0,
    orderFunctions: ["时间","热度","值度"],
    list: [{
      id: 4846411651,
      name: '暨大1号',
      location: '暨南大学北门北门糖水',
      like: 950,
      dislike: 100,
      comments: 10,
      fav: false
    },{
      id: 543453351,
      name: '暨大2号',
      location: '暨南大学北门北门糖水',
      like: 481,
      dislike: 98,
      comments: 3,
      fav: true
    }],
    listEmpty: false
  },
  onInput(e){
    this.setData({
      searchInput: e.detail.value
    })
  },
  clearSearch(){
    this.setData({
      searchInput: ''
    })
  },
  changeOrderFunction(e){
    this.setData({
      orderBy: e.detail.value
    });
  },
  searchList(){
    var orderLists = ["time", "hot", "upvote"]
    this.getList(this.data.searchInput, orderLists[this.data.orderBy]);
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
