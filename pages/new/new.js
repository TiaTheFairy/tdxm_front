// index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    infoMess:'',
    goodsName:'',
    goodsLocation:'',
    goodsPrice: '',
    goodsProfit:'',
    goodsJudgeInput:''
  },

  goodsNameInput:function(e){
    this.setData({
        goodsName:e.detail.value
    })
  },
  goodsLocationInput:function(e){
    this.setData({
        goodsLocation:e.detail.value
    })
  },
  goodsPriceInput:function(e){
    this.setData({
        goodsPrice:e.detail.value
    })
  },
  goodsProfitInput:function(e){
    this.setData({
        goodsProfit:e.detail.value
    })
  },
  goodsJudgeInput:function(e){
    this.setData({
        goodsJudge:e.detail.value
    })
  },

  sendBtnClick:function(){
    if(this.data.goodsName.length == 0 || this.data.goodsLocation.length == 0 || this.data.goodsPrice.length == 0 || this.data.goodsProfit.length == 0 || this.data.goodsJudge.length == 0){
      this.setData({
        infoMess:'温馨提示：输入不能为空！',
      })
    }else{
      this.setData({
        infoMess:'',
        goodsName:'商品服务名称：'+this.data.goodsName,
        goodsLocation:'商品服务店铺位置：'+this.data.goodsLocation,
        goodsPrice:'商品服务原价及优惠价：'+this.data.goodsPrice,
        goodsProfit:'商品服务原价及优惠价：'+this.data.goodsProfit,
        goodsJudge:'商品服务评价：'+this.data.goodsJudge
      })
    }
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
  }
})
