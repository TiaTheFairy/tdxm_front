import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    searchInput: '',
    orderBy: 0,
    orderFunctions: ["时间","热度","值度"],
    list: [],
    listEmpty: false,
    highlights: [{postid: 2234, name: 'a', location: 'aa', like: 1, dislike: 2, comments: 3, fav: false},
    {postid: 2235, name: 'b', location: 'bb', like: 2, dislike: 1, comments: 3, fav: false}],
    highlightsEmpty: false,
    swiperIndex: 0
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
      url: '/pages/new/new',
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: server.default.getListIndex,
      method: 'POST',
      data:{
        wxid: app.globalData.wxid,
        keyword: keyword,
        order: order
      },
      success:(res)=>{
        wx.hideLoading();
        if(res.data.list.length == 0){
          this.setData({
            listEmpty: true
          })
        }
        else{
          this.setData({
            list: []
          })
          this.setData({
            listEmpty: false,
            list: res.data.list
          })
        }
      }
    })
  },
  getHighlight(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.getListHighlight,
      method: 'POST',
      data:{},
      success:(res)=>{
        wx.hideLoading()
        if(res.data.list.length == 0){
          this.setData({
            highlightsEmpty: true
          })
        }
        else{
          this.setData({
            highlights: []
          })
          this.setData({
            highlights: res.data.list,
            highlightsEmpty: false
          })
        }
      }
    })
  },
  refresh(){
    this.searchList();
    this.getHighlight();
  },
  onLoad(){
    if(app.globalData.wxid && app.globalData.wxid != -1){
      this.getList();
      this.getHighlight();
    }
  },
  onShow(){
    var getList = setInterval(()=>{
      if(app.globalData.wxid && app.globalData.wxid != -1){
        if(this.data.list.length == 0){
          this.getList();
          clearInterval(getList);
        }
      }
    },500)
  }
})
