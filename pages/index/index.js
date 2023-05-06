wx-Page({
  data: {
    searchInput: '',
    orderBy: 0,
    orderFunctions: ["时间","热度","值度"],
    list: [{
      name: '暨大1号',
      location: '暨南大学北门北门糖水',
      hot: 1352,
      votes: 950,
      comments: 72,
      fav: false
    },{
      name: '暨大2号',
      location: '暨南大学北门北门糖水',
      hot: 1271,
      votes: 770,
      comments: 41,
      fav: true
    },{
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    }]
  },
  changeOrderFunction(){
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
  }
})
