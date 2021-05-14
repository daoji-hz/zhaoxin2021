// pages/component/primary/primary.js
let myBehavior = require("../../../utils/dataInit")
Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [myBehavior],
  properties: {
    anotherList: Array,
    showWarning: Boolean
  },
  data: {
    chosedList: ['美工部','技术部','视频部','新媒体部'],
    index: -1,
    warningMsg: '',
    warningMsg2: '',
    color: '#0f0f0f',
    array: [], //用于接收经过筛查后的数组,里面是新的意向部门
  },
  attached() {
    this.dataInit()
  },
  methods: {
    chooseDepartment: function(e) {
      var index = e.target.dataset.num
      var chosedList = this.data.chosedList
      var anotherList = this.properties.anotherList
      //将数组转成字符串,判断两个数组是否相等,可能会出现这样的Bug,一顿操作之后,先选择了意向部门,然后再选择主选部门
      if (chosedList[index] == anotherList.join()) {
          this.setData({
            "index": index,
            "userInfo[1].primary": parseInt(index)+1,
            "showWarning": false,
            "warningMsg": '(所选主选部门与意向部门重复)',
            'warningMsg2': '已将该部门作为主选部门 请重新选择意向部门',
            "color": 'red'
        })
        this.triggerEvent('sync', this.data.userInfo)
      } else {
          this.setData({
            "index": index,
            "userInfo[1].primary": parseInt(index)+1, //不要写成++index,这样会让index的值发生变化;使用parseInt
            "showWarning": true
          })
          this.triggerEvent('sync', this.data.userInfo) //注意这里和上面更改的都是userInfo
        }
      //对数组进行一个浅层拷贝,这样对数组进行增删操作的时候不会对原数组有影响
      //同时,这样的操作也可以实现 每一次都重新给anotherListNew赋值?? 不会出现删除两个的结果
      //会实现这样的效果,应该是每点击一次部门,都会对原来的数组进行一次重新的拷贝,因为原来的数组"从始至终"没有发生过变化
      //所以每次删除,都是对原来数组的一次删除,点击一次当然只能删除一个元素
      //换言之,每次点击得到的效果不同,当然结果也是传过去了的,只是你看不到而已,你看到的只是最后一次点击的结果   
      var anotherListNew = Array.from(anotherList) 
      var hasIndex = anotherListNew.indexOf(chosedList[index])
      if (hasIndex > -1) {
        anotherListNew.splice(hasIndex,1)
        //console.log("new"+anotherListNew)
        this.setData({
          'array': anotherListNew
        })
      } else {
        //console.log("old"+anotherList)
        this.setData({
          "array": anotherList
        })
      }
      var data = [
        {
          id: 1,
          value: this.data.chosedList[index]
        },
        {
          id: 2,
          value: this.data.array
        }
      ]
      this.triggerEvent('hasChosed',data)
    },
    _dataInit() {
      this.setData({
        "index": parseInt(this.properties.userInfo[1].primary)-1
      })
    }
  }
})
