// pages/component/interview/interview.js
let myBehavior = require("../../../utils/dataInit")
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [myBehavior],
  properties: {
    interview: Object
  },
  data: {
    src: "data:image/png;base64,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",
    faceImg: 'https://git.tiaozhan.com/kongjiale/zhaoxin-2020-fe/raw/master/img/face.png',
    campusArray: ['兴庆校区', '雁塔校区'],
    //把index的初始值设为空和设置一个具体数字是不一样的 若index=-1那么选择器下标就会从-1开始
    index: '',
    choiceMsg: ['校区','日期','时间','地点'],
    dateArray: [],
    dateIndex: '',
    timeArray: [],
    timeIndex: '',
    timeId: '',
    placeArray: [],
    placeIndex: '',
    //tpId: '',
    date_time_place: {
      date: '',
      time: '',
      place: ''
    },
    //只要用户输对了学号 不要出现第一次输是新学号而没提交之前第二次输是已存在用户 那么这个参数就没啥用
    //就是为了清空之前的选择 而只显示用户已存在的报名信息
    isEmpty: false,
    //判断是否为已经报名的学生
    hasSignUp: false
  },
  attached() {
    this.dataInit()
  },
  methods: {
    campusChange: function(e) {
      if (this.data.index !== '') {
        //调用this.data.index的值 是还没有被修改的值
        //判断是否修改校区 若校区修改则清空选择
        let diffCampus = this.data.index == e.detail.value
        if (!diffCampus) {
          this.setData({
            'dateArray': [],
            'dateIndex': '',
            'timeArray': [],
            'timeIndex': '',
            'placeArray': [],
            'placeIndex': '',
            'date_time_place.date': '',
            'date_time_place.time': '',
            'date_time_place.place': '',
            "userInfo[3].time_place": ''
          })
          // checkInfo界面显示的信息 控制校区和其他信息是分开的
          // 因此需要在更换校区时清空原来的选择 并且要传递过去(针对已报名的学生修改信息
          this.triggerEvent('syncInterviewMsg', this.data.date_time_place)
          wx.showLoading({
            title: '日期加载中'
          })
        }
      } else {
        wx.showLoading({
          title: '日期加载中'
        })
      }
      var campusIndex = parseInt(e.detail.value) + 1
      this.setData({
        'index': e.detail.value,
        'inUserInfo[3].campus': campusIndex,
        'userInfo[3].campus': campusIndex,
      })
      this.triggerEvent("sync", this.data.userInfo)
      var that = this //回调函数中的this指向
      wx.request({
        url: `${app.globalData.api}/api/tp/getDate`,
        data: {
          "campus": this.data.inUserInfo[3].campus
        },
        success(res) {
          setTimeout(() => {
            wx.hideLoading()
            if (res.data.success == 1) {
              if (res.data.data.length != 0) {
                that.setData({
                  'dateArray': res.data.data
                })
              } else {
                if (that.data.hasSignUp) {
                  wx.showModal({
                    title: '提示',
                    content: '当前选择下没有其他空余的面试时间或地点。若保持您原来的选择，请直接退出；若仍要更改选择，请联系社团负责人',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '当前选择下没有空余的面试时间或地点，请重新进行选择或者联系社团负责人',
                    success: function(res) {
                      that.setData({
                        'index': '',
                        'inUserInfo[3].campus': '',
                        'userInfo[3].campus': '',
                      })
                    }
                  })
                }
              }
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.errMsg
              })
            }
          },1000)
        }
      })
    },
    dateChange: function(e) {
      // 憨憨行为：针对已经报名过的学生二次修改信息 更改日期后再次更改为原来的日期
      // 这种情况下所请求的时间是可选择的时间 也就是说该生原来的面试时间是获取不到的
      // 个人认为没有必要解决 拒绝反复横跳！
      // 0 == '' true
      // 0 === '' false
      if (this.data.dateIndex !== '') {
        let isDateChange = this.data.dateIndex == e.detail.value
        if (!isDateChange) {
          this.setData({
            'timeArray': [],
            'timeIndex': '',
            'placeArray': [],
            'placeIndex': '',
            'date_time_place.time': '',
            'date_time_place.place': '',
            "userInfo[3].time_place": ''
          })
          // 若已经报名的学生修改信息 即使选择框已经清空
          // 憨憨行为：只选择了日期就点了提交 其实是可以提交上的 因为tpId的信息没有清空
          // 因此需要将userInfo中的tpId清空 ↓
          this.triggerEvent("sync", this.data.userInfo)
          wx.showLoading({
            title: '时间加载中'
          })
        }
      } else {
        wx.showLoading({
          title: '时间加载中'
        })
      }
      var that = this
      this.setData({
        'dateIndex': e.detail.value,
        'date_time_place.date': this.data.dateArray[e.detail.value].interviewDate
      })
      this.triggerEvent('syncInterviewMsg', this.data.date_time_place)
      wx.request({
        url: `${app.globalData.api}/api/tp/getTime`,
        data: {
          "campus": this.data.inUserInfo[3].campus,
          "date": this.data.dateArray[this.data.dateIndex].interviewDate
        },
        success(res) {
          setTimeout(() => {
            wx.hideLoading()
            if (res.data.success == 1) {
              if (res.data.data.length != 0) {
                that.setData({
                  "timeArray": res.data.data
                })
              } else {
                if (that.data.hasSignUp) {
                  wx.showModal({
                    title: '提示',
                    content: '当前选择下没有其他空余的面试时间或地点。若保持您原来的选择，请直接退出；若仍要更改选择，请联系社团负责人',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '当前选择下没有空余的面试时间或地点，请重新进行选择或者联系社团负责人',
                    success: function(res) {
                      that.setData({
                        'dateIndex': '',
                        'date_time_place.date': '',
                        'timeArray': [],
                        'timeIndex': '',
                        'placeArray': [],
                        'placeIndex': ''
                      })
                    }
                  })
                }
              }
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.errMsg
              })
            }
          },1000)
        }
      })
    },
    timeChange(e) {
      if (this.data.timeIndex !== '') {
        let isTimeChange = this.data.timeIndex == e.detail.value
        if (!isTimeChange) {
          this.setData({
            'placeArray': [],
            'placeIndex': '',
            'date_time_place.place': '',
            "userInfo[3].time_place": ''
          }),
          this.triggerEvent("sync", this.data.userInfo)
          wx.showLoading({
            title: '地点加载中'
          })
        }
      } else {
        wx.showLoading({
          title: '地点加载中'
        })
      }
      var that = this
      this.setData({
        "timeIndex": e.detail.value,
        "timeId": this.data.timeArray[e.detail.value].timeId,
        'date_time_place.time': this.data.timeArray[e.detail.value].interviewTime
      })
      this.triggerEvent('syncInterviewMsg', this.data.date_time_place)
      wx.request({
        url: `${app.globalData.api}/api/tp/getPlace`,
        data: {
          "campus": this.data.inUserInfo[3].campus,
          "timeId": this.data.timeId
        },
        success(res) {
          setTimeout(() => {
            wx.hideLoading()
            if (res.data.success == 1) {
              if (res.data.data.length != 0) {
                that.setData({
                  "placeArray": res.data.data
                })
              } else {
                if (that.data.hasSignUp) {
                  wx.showModal({
                    title: '提示',
                    content: '当前选择下没有其他空余的面试时间或地点。若保持您原来的选择，请直接退出；若仍要更改选择，请联系社团负责人',
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '当前选择下没有空余的面试时间或地点，请重新进行选择或者联系社团负责人',
                    success: function(res) {
                      that.setData({
                        "timeIndex": '',
                        "timeId": '',
                        'date_time_place.time': '',
                        'placeArray': [],
                        'placeIndex': ''
                      })
                    }
                  })
                }
              }
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.errMsg
              })
            }
          },1000)
        }
      })
    },
    placeChange(e) {
      this.setData({
        "placeIndex": e.detail.value,
        "userInfo[3].time_place": this.data.placeArray[e.detail.value].tpId,
        'date_time_place.place': this.data.placeArray[e.detail.value]['place.location']
      })
      this.triggerEvent("sync", this.data.userInfo)
      this.triggerEvent("syncInterviewMsg", this.data.date_time_place)
    },
    // 对于已经存在的用户 实现显示其报名日期地点等信息
    _dataInit() {
      for (let key in this.properties.interview) {
        var empty = this.properties.interview[key] == ''
      }
      if (!empty) {
        this.setData({
          'index': '',
          'dateArray': [],
          'dateIndex': '',
          'timeArray': [],
          'timeIndex': '',
          'placeArray': [],
          'placeIndex': '',
          'isEmpty': true
        })
        var date_time = this.properties.interview['date_time']
        // 将yyyy-mm-dd hh:mm:ss 进行拆分
        var date = date_time.split(" ")[0]
        var time = date_time.split(" ")[1]
        // 向数组中传递一个对象变量
        var a = {}
        a.interviewDate = date
        this.data.dateArray.push(a)
        var b = {}
        b.timeId = this.properties.interview.timeId
        b.interviewTime = time
        this.data.timeArray.push(b)
        var c = {}
        c.tpId = this.properties.interview.tpId
        c['place.location'] = this.properties.interview.place
        this.data.placeArray.push(c)
        if (this.data.isEmpty) {
          this.setData({
            'index': parseInt(this.properties.interview.campus)-1,
            'dateArray': this.data.dateArray,
            'timeArray': this.data.timeArray,
            'placeArray': this.data.placeArray,
            'date_time_place.date': date,
            'date_time_place.time': time,
            'date_time_place.place': this.properties.interview.place,
            'hasSignUp': true,
          })
          this.getDateList(this.properties.interview.campus)
          this.getTimeList(this.properties.interview.campus, date)
          this.getPlaceList(this.properties.interview.campus, this.properties.interview.timeId)
        }
      } else {
        this.setData({
          'index': '',
          'dateArray': [],
          'dateIndex': '',
          'timeArray': [],
          'timeIndex': '',
          'placeArray': [],
          'placeIndex': '',
          'date_time_place.date': '',
          'date_time_place.time': '',
          'date_time_place.place': '',
          'hasSignUp': false
        })
      }
    },
    // 提前请求数据 为了避免二次修改的时候还要从校区开始选择
    // 我太难了
    getDateList(value) {
      var that = this
      wx.request({
        url: `${app.globalData.api}/api/tp/getDate`,
        data: {
          "campus": value
        },
        success(res) {
          if (res.data.success == 1) {
            if (res.data.data.length != 0) {
              let dateArr = []
              let re = /(\d{1,3})+(?:\.\d+)?/g
              let nowDate_ = that.data.dateArray[0].interviewDate.match(re)
              let nowDate = +nowDate_.join('')
              let date_index = 0
              let flag = -1
              for (let i = 0; i < res.data.data.length; i++) {
                let date_ = res.data.data[i].interviewDate.match(re)
                let date = +date_.join('')
                if (nowDate <= date) {
                  dateArr.push(that.data.dateArray[0])
                  date_index = i
                  if (nowDate == date) {
                    flag = 0
                  } else {
                    flag = 1
                  }
                  break;
                } else {
                  dateArr.push(res.data.data[i])
                }
              }
              if (flag == -1) {
                dateArr.push(that.data.dateArray[0])
                date_index = res.data.data.length
              } else if (flag == 1) {
                for (let j = date_index; j < res.data.data.length; j++) {
                  dateArr.push(res.data.data[j])
                }
              } else {
                for (let j = date_index+1; j < res.data.data.length; j++) {
                  dateArr.push(res.data.data[j])
                } 
              }
              that.setData({
                'dateArray': dateArr,
                'dateIndex': date_index,
                'inUserInfo[3].campus': value,
              })
            } else {
              that.setData({
                'dateIndex': 0
              })
            }
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.errMsg
            })
          }
        }
      })
    },
    getTimeList(Campus, Date) {
      var that = this
      wx.request({
        url: `${app.globalData.api}/api/tp/getTime`,
        data: {
          "campus": Campus,
          "date": Date
        },
        success(res) {
          if (res.data.success == 1) {
            let timeArr = []
            let re = /(\d{1,3})+(?:\.\d+)?/g
            let nowTime_ = that.data.timeArray[0].interviewTime.match(re)
            let nowTime = +nowTime_.join('')
            let time_index = 0
            let flag = -1
            if (res.data.data.length != 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                let time_ = res.data.data[i].interviewTime.match(re)
                let time = +time_.join('')
                if (nowTime <= time) {
                  timeArr.push(that.data.timeArray[0])
                  time_index = i
                  if (nowTime == time) {
                    flag = 0
                  } else {
                    flag = 1
                  }
                  break;
                } else {
                  timeArr.push(res.data.data[i])
                }
              }
              if (flag == -1) {
                timeArr.push(that.data.timeArray[0])
                time_index = res.data.data.length
              } else if (flag == 1) {
                for (let j = time_index; j < res.data.data.length; j++) {
                  timeArr.push(res.data.data[j])
                }
              } else {
                for (let j = time_index+1; j < res.data.data.length; j++) {
                  timeArr.push(res.data.data[j])
                }
              }
              that.setData({
                "timeArray": timeArr,
                'timeIndex': time_index,
                'timeId': timeArr[time_index].timeId
              })
            } else {
              that.setData({
                'timeIndex': 0
              })
            }
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.errMsg
            })
          }
        }
      })
    },
    getPlaceList(Campus, TimeId) {
      var that = this
      wx.request({
        url: `${app.globalData.api}/api/tp/getPlace`,
        data: {
          "campus": Campus,
          "timeId": TimeId
        },
        success(res) {
          if (res.data.success == 1) {
            if (res.data.data.length != 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                //if (res.data.data[i]['place.location'] != that.data.placeArray[0]['place.location']) {
                  that.data.placeArray.push(res.data.data[i])
                //}
              }
              that.setData({
                "placeArray": that.data.placeArray,
                'placeIndex': 0
              })
            } else {
              that.setData({
                'placeIndex': 0
              })
            }
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
})