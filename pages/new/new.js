// index.js
//获取应用实例
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
  }


  // sendBtnClick:function(){
  //   if(this.data.goodsName.length == 0 || this.data.goodsLocation.length == 0 || this.data.goodsPrice.length == 0 || this.data.goodsProfit.length == 0 || this.data.goodsJudge.length == 0){
  //     this.setData({
  //       infoMess:'温馨提示：输入不能为空！',
  //     })
  //   }else{
  //     this.setData({
  //       infoMess:'',
  //       goodsName:'商品服务名称：'+this.data.goodsName,
  //       goodsLocation:'商品服务店铺位置：'+this.data.goodsLocation,
  //       goodsPrice:'商品服务原价及优惠价：'+this.data.goodsPrice,
  //       goodsProfit:'商品服务原价及优惠价：'+this.data.goodsProfit,
  //       goodsJudge:'商品服务评价：'+this.data.goodsJudge
  //     })
  //   }
  // },
})
