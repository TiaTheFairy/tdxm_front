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
  gotoNew(){
    wx.navigateTo({
      url: '../new/new',
    })
  },
  gotoTop(){
    wx.pageScrollTo({
      duration: 250,
      scrollTop:0
    })
  },
  searchList(){
    var orderLists = ["time", "hot", "upvote"]
    this.getList(this.data.searchInput, orderLists[this.data.orderBy]);
  },
  getList(keyword='', order='time'){
    wx.request({
      url: server.default.getListIndex,
      method: 'POST',
      data:{
        keyword: keyword,
        order: order
      },
      success:(res)=>{
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
  getHighlight(){
    wx.request({
      url: server.default.getListHighlight,
      method: 'POST',
      data:{},
      success:(res)=>{
        if(res.data.list.length == 0){
          this.getList();
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
    if(!app.globalData.wxid || app.globalData.wxid == -1){
      // wx.navigateTo({
      //   url: '/pages/wxconnect/wxconnect',
      // })
    }
    else{
       //this.getHighlight();
    }
  }
})
