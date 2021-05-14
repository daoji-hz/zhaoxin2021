// pages/component/secondary/secondary.js
// 由于主选部门会对意向部门的数组进行筛选,已经实现了实时把选择的意向部门送到index,因此不再需要behavior片段
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    showWarning: Boolean,
    secArr: Array,
    chosedObjects: Object,
    chosedList: Array,
    primary: Number,
    //与data当中的数据作用相同,只是如果要接受传参,必须放到properties里面
    //还有一个问题就是,如果没有把变量设置在data里面,用setData传值的时候还是有效的
  },
  data: {
    src: "https://git.tiaozhan.com/kongjiale/zhaoxin-2020-fe/raw/master/img/heart.png",
    choiceList: ['美工部','技术部','视频部','新媒体部'],
    warningMsg: '',
    color: '#0f0f0f',
  },
  methods: {
    changeSecondary: function(e) {
      var chosedObjects = this.properties.chosedObjects
      var length = Object.keys(chosedObjects).length
      //console.log(chosedObjects == Object) 结果是false??
      var index = e.target.dataset.num
      var addChoice = this.data.choiceList[index]
      var chosedList = this.data.chosedList
      if (length == 0 && this.properties.primary == '') {
        this.setData({
          "showWarning": false,
          'warningMsg': '请返回上一页选择主选部门',
          "chosedList": [],
          "color": 'red'
        })
      } else if (length !== 0) {
        var hasChosed = chosedObjects[0].value
        if (hasChosed !== '' && hasChosed !== addChoice) {
          if (this.data.secArr[index] == 0) {
            chosedList.push(addChoice)
            this.data.chosedList = Array.from(new Set(chosedList))
            if (this.data.chosedList.length < 4) {
              let secondaryIndex = "secArr["+index+"]"
              this.setData({
                "chosedList": this.data.chosedList,
                "showWarning": true,
                [secondaryIndex]: 1
              })
            } 
            //还是会有bug出现,比如已经有红字提醒,有的憨憨还是要再点一下
            else if (this.data.chosedList.length == 4) {
              this.setData({
                "chosedList": [],
                "showWarning": false,
                "warningMsg": '你的选择有误,请从主选部门开始重新选择',
                "color": 'red',
                "secArr": [0,0,0,0]
              })
            }
            this.triggerEvent('chosedList',this.data.chosedList)
          } else if (this.data.secArr[index] == 1) {
            //传过来的chosedList是变化的 并且肯定不是完整的四个部门 所以要用到choiceList数组
            let spliceIndex = this.data.chosedList.indexOf(this.data.choiceList[index])
            chosedList.splice(spliceIndex,1)
            let secondaryIndex = "secArr["+index+"]"
            if (chosedList.length == 0) {      //用数组的长度来判断更好,而不是用空数组判断
              this.setData({
                "chosedList": chosedList,
                "showWarning": false,
                'warningMsg': "若没有意向部门,可跳过选择",
                "color": 'red',
                "secArr": [0,0,0,0]
              })
            } else {
              this.setData({
                "chosedList": chosedList,
                [secondaryIndex]: 0,
                'showWarning': true,
                "warningMsg": ''
              })
            }
            this.triggerEvent('chosedList',this.data.chosedList) //删除的时候数组也发生了变化,也要传过去
          }
        } else if (hasChosed == addChoice) {
          this.setData({
            "warningMsg": '所选意向部门与主选部门重复',
            'showWarning': false,
            'color': 'red'
          })
        }
      } 
        //已存在的用户重新修改意向部门
        else if (length == 0 && this.properties.primary !== '') {
        let primary = this.data.choiceList[parseInt(this.properties.primary)-1]
        let secondary = this.data.choiceList[index]
        if (this.data.secArr[index] == 0 && secondary !== primary) {
          chosedList.push(secondary)
          this.data.chosedList = Array.from(new Set(chosedList))
          if (this.data.chosedList.length < 4) {
            let secondaryIndex = "secArr["+index+"]"
            this.setData({
              "chosedList": this.data.chosedList,
              "showWarning": true,
              [secondaryIndex]: 1
            })
          } 
          else if (this.data.chosedList.length == 4) {
            this.setData({
              "chosedList": [],
              "showWarning": false,
              "warningMsg": '你的选择有误,请从主选部门开始重新选择',
              "color": 'red',
              "secArr": [0,0,0,0]
            })
          }
          this.triggerEvent('chosedList',this.data.chosedList)
        } else if (this.data.secArr[index] == 1) {
          let spliceIndex = this.data.chosedList.indexOf(this.data.choiceList[index])
          chosedList.splice(spliceIndex,1)
          let secondaryIndex = "secArr["+index+"]"
          if (chosedList.length == 0) {      
            this.setData({
              "chosedList": chosedList,
              "showWarning": false,
              'warningMsg': "若没有意向部门,可跳过选择",
              "color": 'red',
              "secArr": [0,0,0,0]
            })
          } else {
            this.setData({
              "chosedList": chosedList,
              [secondaryIndex]: 0,
              'showWarning': true,
              "warningMsg": ''
            })
          }
          this.triggerEvent('chosedList',this.data.chosedList) 
        } else if (this.data.secArr[index] == 0 && secondary == primary) {
          this.setData({
            "warningMsg": '所选意向部门与主选部门重复',
            'showWarning': false,
            'color': 'red'
          })
        }
      }
    }
  }
})
