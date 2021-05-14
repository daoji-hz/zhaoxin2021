// pages/component/knowledge/knowledge.js
let myBehavior = require("../../../utils/dataInit")
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  behaviors: [myBehavior],
  properties: {

  },
  data: {
    src: "https://git.tiaozhan.com/kongjiale/zhaoxin-2020-fe/raw/master/img/Hi.png",
    writing: true,
    wanting: true,
    _lineCount: 0,
    _wantingLineCount: 0,
    writingVal: '',
    wantingVal: '',
    textareaVal: '',
    wantingTextareaVal: '',
    warningMsg: '',
    warningMsg2: ''
  },
  attached() {
    this.dataInit()
  },
  methods: {
    // 在"已会"部门,虚拟文本和Textarea的转换
    isWriting: function(e) {
      //console.log(e.detail.value)
      var value = e.detail.value
      if (value == '') {
        this.setData({
          "warningMsg": "请输入内容",
          "writingVal": value,
          "userInfo[2].learn": value,
          "writing": !this.data.writing
        })
        this.triggerEvent("sync", this.data.userInfo)
      } else {
        this.setData({
          "warningMsg": '',
          "writingVal": value,
          "userInfo[2].learn": value,
          "writing": !this.data.writing
        })
        this.triggerEvent("sync", this.data.userInfo)
      }
    },
    isLineChange: function(e) {
      //好像有这个函数,textarea就会出现一个默认的height,我也不知道为什么
      //console.log(e.detail.lineCount)
      this.data._lineCount = e.detail.lineCount
    },
    changeType: function() {
      this.setData({
        "textareaVal": this.data.writingVal,
        "writing": !this.data.writing,//这里的writing控制的既是textarea区域的显示,也是输入光标的显示
        "warningMsg": "",
        "wanting": true
      })
    },
    
    //下面是关于"想学"的方法,内容基本上和上面的相同
    isWanting: function(e) {
      var value = e.detail.value
      if (value == '') {
        this.setData({
          "warningMsg2": "请输入内容"
        })
      } else {
        this.setData({
          "warningMsg2": ''
        })
      }
      this.setData({
        "wantingVal": value,
        "userInfo[2].want": value,
        "wanting": !this.data.wanting
      })
      this.triggerEvent("sync", this.data.userInfo)
    },
    wantingLineChange: function(e) {
      this.data._wantingLineCount = e.detail.lineCount
    },
    changeWantingType: function() {
      var textVal = this.data.wantingVal
      this.setData({
        "wantingTextareaVal": textVal,
        "wanting": !this.data.wanting,
        "warningMsg2": '',
        "writing": true
      })
    },
    _dataInit() {
      this.setData({
        "writingVal": this.properties.userInfo[2].learn,
        "wantingVal": this.properties.userInfo[2].want
      })
    }
  }
})