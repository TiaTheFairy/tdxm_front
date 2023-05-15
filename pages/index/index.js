Page({
  data: {
    searchInput: '',
    orderBy: 0,
    orderFunctions: ["时间","热度","值度"],
    list: [{
      id: 4846411651,
      name: '暨大1号',
      location: '暨南大学北门北门糖水',
      hot: 1352,
      votes: 950,
      comments: 72,
      fav: false
    },{
      id: 543453351,
      name: '暨大2号',
      location: '暨南大学北门北门糖水',
      hot: 1271,
      votes: 770,
      comments: 41,
      fav: true
    },{
      id: 34524254,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      id: 987789,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      id: 47777515,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      id: 888888999,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
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
  getList(keyword, order){
    wx.request({
      url: '',
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
  onLoad(){
    //this.getList();
  }
})
