module.exports = Behavior({
  properties: {
    userInfo: {
      type: Array,
      //使用监听器监听每次userInfo的变化
      //因为在每个页面都会更改UserInfo的值 但是data中的inUserInfo值并没有得到更改
      //所以调用同步函数sync的时候 每次传过来的都只是当前信息填写好的数组 下一次又会被覆盖
      //暂时没有想到别的方法 只能监听数据的变化然后把UserInfo的值给data中的inUserInfo 做到实时更新
      //使用observer的时候 注意不管值有没有发生变化 其中不需要条件便可执行的语句一定会执行 例如下面的console.log语句
      /*observer: function(newVal,oldVal) {
        this.setData({
          inUserInfo: newVal
        })
        console.log(newVal == oldVal)
        console.log(JSON.stringify(this.data.inUserInfo[1].secondary)) //如果只显示this.data.inUserInfo 会出现[object][object]
      }*/
      // 不用监听器 用this.setData可直接改变properties中的值 进行同步的时候直接传properties中的userInfo即可
      // 使用监听器的时候会出现别的问题 主要是不知道触发监听函数的时机?
    }
  },
  data: {
    inUserInfo: []
  },
  methods: {
    dataInit: function() {
      this.setData({
        inUserInfo: this.properties.userInfo
      })
    }
  }
})