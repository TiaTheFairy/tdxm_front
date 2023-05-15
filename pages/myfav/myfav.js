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
        user: 0,
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
