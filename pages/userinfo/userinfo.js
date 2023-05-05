Page({
  data: {
    nickname: "这是我的昵称",
    desc: "这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介",
    gender: 0,
    birthday: [2002,3,1],
    campus: 2
  },

  back(){
    wx.navigateBack()
  },
  editInfo(e){
    var params = {
      t: e.currentTarget.dataset.word,
      d: 'default'
    };
    switch (params.t) {
      case 'nickname':
        params.d = this.data.nickname;
        break;
      case 'desc':
        params.d = this.data.desc;
        break;
      case 'gender':
        params.d = this.data.gender;
        break;
      case 'birthday':
        params.d = this.data.birthday;
        break;
      case 'campus':
        params.d = this.data.campus;
        break;
      default:
        break;
    }
    let that = this;
    wx.navigateTo({
      url: '/pages/userinfo/useredit/useredit?p=' + JSON.stringify(params),
      // events: {
      //   userEdit(data){
      //     switch (params.t) {
      //       case 'nickname':
      //         that.setData({nickname: data});
      //         break;
      //       case 'desc':
      //         that.setData({desc: data});
      //         break;
      //       case 'gender':
      //         that.setData({gender: data});
      //         break;
      //       case 'birthday':
      //         that.setData({birthday: data});
      //         break;
      //       case 'campus':
      //         that.setData({campus: data});
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      // }
    })
  },
  onLoad(options) {

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