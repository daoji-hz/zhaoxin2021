// pages/component/checkInfo/checkInfo.js
let myBehavior = require("../../../utils/dataInit")
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [myBehavior],
  properties: {
    detailedMsg: Object
  },
  data: {
    _detailedMsg: {},
    isShowLearnText: false,
    isShowWantText: false,
    requestData: [],
    requestSecondary: '',
  },
  attached() {
    this.dataInit()
  },
  methods: {
    detailedMsgShow() {
      this.setData({
        '_detailedMsg': this.properties.detailedMsg   //前面的key加引号和不加引号有什么区别?
      })
    },
    // 下面的方法是控制border的转换 使用户能够看到完整的信息 但是没有修改功能
    showLearnText() {
      if (!this.data.isShowWantText) {
        this.setData({
          'isShowLearnText': !this.data.isShowLearnText
        })
      }
    },
    backText() {
      this.setData({
        'isShowLearnText': !this.data.isShowLearnText
      })
    },
    showWantText() {
      if (!this.data.isShowLearnText) {
        this.setData({
          'isShowWantText': !this.data.isShowWantText
        })
      }
    },
    backWantText() {
      this.setData({
        'isShowWantText': !this.data.isShowWantText
      })
    },
    //提交信息
    sendRequest() {
      wx.showToast({
        title: '提交中',
        icon: 'loading',
        duration: 1500
      })
      let subDepartment = this.data.inUserInfo[1].secondary
      if (subDepartment.length == 0) {
        this.setData({
          'requestSecondary': JSON.stringify(''),
        })
      } else {
        this.setData({
          'requestSecondary': subDepartment.join(",")
        })
      }
      this.setData({
        'requestData.sid': this.data.inUserInfo[0].studentID,
        'requestData.name': this.data.inUserInfo[0].name,
        'requestData.adClass': this.data.inUserInfo[0].class,
        'requestData.phone': this.data.inUserInfo[0].telephone,
        'requestData.email': this.data.inUserInfo[0].email,
        'requestData.mainDepartment': this.data.inUserInfo[1].primary,
        'requestData.subDepartment': this.data.requestSecondary,
        'requestData.mastered': this.data.inUserInfo[2].learn,
        'requestData.wantLearn': this.data.inUserInfo[2].want,
        'requestData.campus': this.data.inUserInfo[3].campus,
        'requestData.timeplaceId': this.data.inUserInfo[3].time_place,
      })
      if (this.data.inUserInfo[0].id !== '') {
        wx.request({
          url: `${app.globalData.api}/api/student/update`,
          data: JSON.stringify(this.data.requestData),
          header: { 'content-type': 'application/json' },
          method: 'PUT',
          dataType: 'json',
          responseType: 'text',
          success(res) {
            if (res.data.success == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
            } else if (res.data.success == 0 && res.data.errMsg == '参数有误') {
              wx.showToast({
                title: '请检查信息是否遗漏\r\n意向部门可为空', //似乎只有真机上有效果
                icon: 'none',
                duration: 2500
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.errMsg
              })
            }
          }
        })
      } else {
        wx.request({
          url: `${app.globalData.api}/api/student`,
          data: JSON.stringify(this.data.requestData),
          header: { 'content-type': 'application/json' },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success(res) {
            if (res.data.success == 1) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
            } else if (res.data.success == 0 && res.data.errMsg == '参数有误') {
              wx.showToast({
                title: '请检查信息是否遗漏\r\n意向部门可为空', //似乎只有真机上有效果
                icon: 'none',
                duration: 2500
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.errMsg
              })
            }
          }
        })
      }
    }
  }
})
