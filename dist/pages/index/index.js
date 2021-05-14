//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        animation: '',
        isRightArrow: true,
        opacityRightNum: 0,
        opacityLeftNum: 0,
        //给主选部门的用于筛除的数组,里面是已经被选择的意向部门
        anotherList: [],
        _showWarning: true,
        //给意向部门的参数,其中第一个对象是经过主选部门筛除后得到的新对象
        chosedObjects: {},
        chosedList: [],
        showWarning: true,
        secArr: [0,0,0,0],
        //下面是用户相关的数据
        userInfo: [
            {
                id: '',
                studentID: '',
                name: '',
                class: '',
                telephone: '',
                email: ''
            },
            {
                primary: '',
                secondary: []
            },
            {
                learn: '',
                want: ''
            },
            {
                campus: '',
                time_place: ''
            }
        ],
        isRes: false, //判断是否输入过存在的学号
        isNull: true, //判断除学号以外的信息是否被填写
                    //以上两个参数的共同作用 是为了避免改写学号时 因学号不存在造成填写的信息被清空 需要重填 影响用户体验
                    //同时要注意 这两个参数缺一不可 如果只判断是否被赋值会出现 先输入了已存在学号后修改 但是信息没有被清空
        // 用户手动选择产生的面试信息
        detailedMsg: {
            primary: '',
            campus: '',
            date_time_place: {
                date: '',
                time: '',
                place: ''
            },
            fontsize: ''
        },
        // 用户已存在 来自服务器的面试信息
        interview: {
            campus: '',
            date_time: '',
            place: '',
            timeId: '', //二次修改面试信息的时候会用到
            tpId: '' //二次修改面试信息的时候会用到
        }
    },
    onShow: function() {
        this.animation = wx.createAnimation({
          duration: 1300,
          timingFunction: "ease"
        })
        this.show()
    },
    show:function() {
        setTimeout(() => {
            this.animation.opacity(1).step()
            this.setData({
                "animation": this.animation.export(),
            })
        },5600)
    },
    showArrows: function(e) {
        var current = e.detail.current
        //控制箭头显示
        if (current !== 0 && current !==6) {
            this.setData({
                "opacityRightNum": 1,
                "opacityLeftNum": 1,
                "isRightArrow": true
            })
        } else if (current == 0) {
            this.setData({
                "opacityLeftNum": 0,
                "isRightArrow": true
            })
        } else if (current == 6) {
            this.setData({
                "isRightArrow": false
            })
            // 将填写完毕的信息传递给检查页面
            const checkInfo = this.selectComponent("#checkInfo")
            checkInfo.dataInit()

            // 下面修改页面具体信息的显示
            //获取组件的方法只能访问内部属性 无法进行修改
            //checkInfo.data.primaryDepartment = mainDepartment[parseInt(this.data.userInfo[1].primary)-1]
            // 如果是用户已存在 用这种方式传递面试信息
            for (let key in this.data.interview) {
                var empty = this.data.interview[key] == ''
            }
            if (!empty) {
                let date_time = this.data.interview.date_time
                let date = date_time.split(" ")[0]
                let time = date_time.split(" ")[1]
                this.setData({
                    'detailedMsg.date_time_place.date': date,
                    'detailedMsg.date_time_place.time': time,
                    'detailedMsg.date_time_place.place': this.data.interview.place
                })
            }
            // 传递部门、校区等信息
            var mainDepartment = ['美工部','技术部','视频部','新媒体部']
            var campusArr = ['兴庆校区','雁塔校区']
            this.setData({
                'detailedMsg.primary': mainDepartment[parseInt(this.data.userInfo[1].primary)-1],
                'detailedMsg.campus': campusArr[parseInt(this.data.userInfo[3].campus)-1]
            })
            if (this.data.userInfo[1].secondary.length == 3) {
                this.setData({
                    'detailedMsg.fontsize': '18.5rpx'
                })
            } else {
                this.setData({
                    'detailedMsg.fontsize': '26rpx'
                })
            }
            checkInfo.detailedMsgShow()
        }
        //清除部门页面的警告信息
        //以及实现已存在用户修改主选部门对意向部门造成影响
        if (current == 2) {
            this.setData({
                "_showWarning": true,
            })
            let chosedObjects = this.data.chosedObjects
            if (JSON.stringify(chosedObjects) == '{}') {
                this.setData({
                    'anotherList': this.data.userInfo[1].secondary
                })
            }
        }
        if (current == 3) {
            this.setData({
                'showWarning': true
            })
        }
        //控制意向部门的数组显示
        var chosedObjects = this.data.chosedObjects
        if (current == 3 && chosedObjects.length > 0) {
            var list = chosedObjects[1].value
            let secondaryArray = [0,0,0,0]
            //使用arr.indexOf要写完整的内容 不能只写关键字
            //因为每次传过来的意向部门数组不是按照顺序 因此只能一个个检索
            if (list.indexOf("美工部") != -1) {
                secondaryArray[0] = 1
            } else {
                secondaryArray[0] = 0
            }
            if (list.indexOf("技术部") != -1) {
                secondaryArray[1] = 1
            } else {
                secondaryArray[1] = 0
            }
            if (list.indexOf("视频部") != -1) {
                secondaryArray[2] = 1
            } else {
                secondaryArray[2] = 0
            }
            if (list.indexOf("新媒体部") != -1) {
                secondaryArray[3] = 1
            } else {
                secondaryArray[3] = 0
            }
            if (list.length == 0 && this.data.anotherList.length == 0) {
                this.setData({
                    "secArr": [0,0,0,0]
                })
            } else if (list.length !== 0 && this.data.anotherList.length !== 0) {
                //console.log("list"+list)
                this.setData({
                    "chosedList": list,
                    "secArr": secondaryArray,
                    "userInfo[1].secondary": list
                })                
            } else if (list.length == 0 && this.data.anotherList.length !== 0) {
                //console.log("list"+list)
                this.setData({
                    "chosedList": list,
                    "secArr": secondaryArray,
                    "userInfo[1].secondary": list
                })
            }
        } else if (current == 3 && JSON.stringify(chosedObjects) == '{}') {
            this.setData({
                'chosedList': this.data.userInfo[1].secondary
            })
            let secArr = this.data.secArr
            if (!(secArr.indexOf(0) !== -1 || secArr.indexOf(1) !== -1)) {
                let secondaryArray = [0,0,0,0]
                if (this.data.secArr.indexOf("美工部") !== -1) {
                    secondaryArray[0] = 1
                } else {
                    secondaryArray[0] = 0
                }
                if (this.data.secArr.indexOf("技术部") !== -1) {
                    secondaryArray[1] = 1
                } else {
                    secondaryArray[1] = 0
                }
                if (this.data.secArr.indexOf("视频部") !== -1) {
                    secondaryArray[2] = 1
                } else {
                    secondaryArray[2] = 0
                }
                if (this.data.secArr.indexOf("新媒体部") !== -1) {
                    secondaryArray[3] = 1
                } else {
                    secondaryArray[3] = 0
                }
                this.setData({
                    'secArr': secondaryArray
                })
            }
        }
    },
    // 主选部门经过筛除后,要传给意向部门
    Chosed: function(e) {
        this.setData({
            "chosedObjects": e.detail
        })
    },
    // 意向部门经过操作后,要传给主选部门进行筛除
    ChosedList: function(e) {
        //console.log("new"+e.detail)
        this.setData({
            "anotherList": e.detail,
            "userInfo[1].secondary": e.detail
        })
        // 解决出现的所有bug的关键在下面,如果主选界面没有更换主选部门,那么list就不会改变,还是上一次的结果
        // 如何实现List能够感知到意向部门数组的变化,那么就是,在每一次传新的数组过来的时候,先把新数组给List
        // 当更换主选部门时list可能会变,如果不更换部门,那么List就不会变,却能反映出意向部门的变化
        // 至于为什么一开始在bindchange那里用current=2做条件,将新数组赋值给List也会出bug
        // 大概就是因为在current=2时List确实是新数组,但是List赋值给chosedList是在current=3的时候
        if (this.data.chosedObjects.length > 0) {
            var chosedObjects = this.data.chosedObjects
            var value = "chosedObjects["+ 1 + "]value" //向data中某个对象中的某个属性赋值
            this.setData({
                [value]: e.detail
            })
        }
    },
    checkID: function(e) {
        var that = this
        wx.request({
          url: `${app.globalData.api}/api/student/complete`,
          data: {
              sid: e.detail
          },
          success(res) {
            if (res.data.success == 1) {
                //注意回调函数中的this指向
                //console.log(res.data.data)
                //因为''无法发送请求 只好发送JSON.stringify('')
                //为了不影响后续操作要对secondary数组进行处理 即删除其中的''
                let subDepartment = res.data.data.subDepartment
                var a = subDepartment.split(",")
                if (subDepartment.indexOf(JSON.stringify('')) !== -1) {
                    let _index = subDepartment.indexOf("")
                    a.splice(_index,1)
                    that.setData({
                        'userInfo[1].secondary': a,
                        'secArr': a
                    })
                } else {
                    that.setData({
                        'userInfo[1].secondary': a,
                        'secArr': a
                    })
                }
                that.setData({
                    'userInfo[0].id': res.data.data.id,
                    'userInfo[0].studentID': res.data.data.sid,
                    'userInfo[0].name': res.data.data.name,
                    'userInfo[0].class': res.data.data.adClass,
                    'userInfo[0].telephone': res.data.data.phone,
                    'userInfo[0].email': res.data.data.email,
                    'userInfo[1].primary': res.data.data.mainDepartment,
                    //'userInfo[1].secondary': subDepartment.split(","),
                    //'secArr': subDepartment.split(","),
                    'userInfo[2].learn': res.data.data.mastered,
                    'userInfo[2].want': res.data.data.wantLearn,
                    'userInfo[3].campus': res.data.data.campus,
                    'userInfo[3].time_place': res.data.data.timeplaceId,
                    'interview.campus': res.data.data.campus,
                    'interview.date_time': res.data.data['time_place.itime.interviewDatetime'],
                    'interview.place': res.data.data['time_place.place.location'],
                    'interview.timeId': res.data.data['time_place.itime.id'],
                    'interview.tpId': res.data.data.timeplaceId,
                    'isRes': true
                })
                //因为实时更新的数据仅有userInfo(位于properties中)
                //由于写的顺序不大对劲 导致我写完了其他逻辑 才考虑如果该用户已经存在如何把信息同步到其他页面上这个问题
                //而我其他页面用的都是data中的数据 换言之 也就是没有用userInfo的数据
                //因此可以通过下面这种获取组件的方法修改用到的data值
                //或者也可以使用数据监听
                //console.log(that.data.userInfo[1].secondary)
                const basicInfo = that.selectComponent("#basicInfo")
                basicInfo.cleanWarn()
                basicInfo.dataInit()
                const knowledge = that.selectComponent("#knowledge")
                knowledge._dataInit()
                const primary = that.selectComponent("#primary")
                primary._dataInit()
                const interview = that.selectComponent("#interview")
                interview._dataInit()
            } else if (res.data.success != 1 && !that.data.isNull && !that.data.isRes) {
                that.setData({
                    'userInfo[0].id': '',
                    'userInfo[0].studentID': e.detail,
                    'isRes': false,
                    // 按理说用户在填写完信息后 再反过来修改学号 不应该把填完的信息全部清空
                    // 但是这种情况只会出现在 用户第一页基本信息只填写了学号 更改学号会导致其他信息清空
                    // 我觉得如果有这样填的憨憨 不如多填几次把
                    'userInfo[1].primary': '',
                    'userInfo[1].secondary': [],
                    'secArr': [0,0,0,0],
                    'userInfo[2].learn': '',
                    'userInfo[2].want': '',
                    'userInfo[3].campus': '',
                    'userInfo[3].time_place': '',
                    'interview.campus': '',
                    'interview.date_time': '',
                    'interview.place': '',
                    'interview.timeId': '',
                    'interview.tpId': '',
                    'detailedMsg.date_time_place': {}
                })
                const basicInfo = that.selectComponent("#basicInfo")
                basicInfo.dataInit()
                const knowledge = that.selectComponent("#knowledge")
                knowledge._dataInit()
                const primary = that.selectComponent("#primary")
                primary._dataInit()
                const interview = that.selectComponent("#interview")
                interview._dataInit()
            } else if (res.data.success != 1 && (!that.data.isNull && that.data.isRes) || that.data.isNull) {
                that.setData({
                    'userInfo[0].id': '',
                    'userInfo[0].studentID': e.detail,
                    'userInfo[0].name': '',
                    'userInfo[0].class': '',
                    'userInfo[0].telephone': '',
                    'userInfo[0].email': '',
                    'userInfo[1].primary': '',
                    'userInfo[1].secondary': [],
                    'secArr': [0,0,0,0],
                    'userInfo[2].learn': '',
                    'userInfo[2].want': '',
                    'userInfo[3].campus': '',
                    'userInfo[3].time_place': '',
                    'interview.campus': '',
                    'interview.date_time': '',
                    'interview.place': '',
                    'interview.timeId': '',
                    'interview.tpId': '',
                    'detailedMsg.date_time_place': {},
                    'isRes': false
                })
                const basicInfo = that.selectComponent("#basicInfo")
                basicInfo.dataInit()
                const knowledge = that.selectComponent("#knowledge")
                knowledge._dataInit()
                const primary = that.selectComponent("#primary")
                primary._dataInit()
                const interview = that.selectComponent("#interview")
                interview._dataInit()
            }
          }
        })
    },
    sync: function(e) {
        this.setData({
            'userInfo': e.detail
        })
        for (let key in this.data.userInfo[0]) {
            this.setData({
                "isNull": this.data.userInfo[0][key] == null
            })
        }
    },
    //将面试的日期 时间和地点同步到检查页面(这些信息在提交的时候不需要
    //结合上面的current=6对应的代码块看
    //针对已经报名的学生再次修改信息时 要将服务器传来的面试信息全部清空
    syncInterviewMsg: function(e) {
        this.setData({
            'detailedMsg.date_time_place': e.detail,
            'interview.campus': '',
            'interview.date_time': '',
            'interview.place': '',
            'interview.timeId': '',
            'interview.tpId': ''
        })
    }
})
