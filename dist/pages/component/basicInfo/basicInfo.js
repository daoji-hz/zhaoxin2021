// pages/component/basicInfo/basicInfo.js
let myBehavior = require("../../../utils/dataInit")
Component({
    options: {
      addGlobalClass: true
    },
		behaviors: [myBehavior],
    properties: {
    },
    attached() {
			this.dataInit()
    },
    data: {
        studentIDmsg: '',
        namemsg: '',
        classmsg: '',
        phonemsg: '',
        emailmsg: ''
    },
    methods: {
			getStudentID(e) {
				//console.log(e.detail.value)
				var val = e.detail.value
				if (val.length == 0) {
					this.setData({
						studentIDmsg: '请输入学号'
					})
				} else if (val !== this.data.inUserInfo[0].studentId) {
					if (/^[A-Za-z0-9]{10}$/.test(e.detail.value)) {
						this.setData({
							"inUserInfo[0].studentId": val,
							'studentIDmsg': ''
						})
						this.triggerEvent("checkID", this.data.inUserInfo[0].studentId) //学号检测必须要在index页面进行回调
					} else {
						this.setData({
							'studentIDmsg': '请输入正确的学号',
							'inUserInfo[0].studentID': ''
						})
					}
				}
			},
			getName(e) {
				var val = e.detail.value
				if (val.length == 0) {
					this.setData({
						'namemsg': '请输入姓名'
					})
				} else if (/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)) {
					this.setData({
						'inUserInfo[0].name': val,
						'userInfo[0].name': val,
						'namemsg': ''
					})
					this.triggerEvent('sync', this.data.userInfo) //传递的时候最好直接传递整个数组 避免判断究竟是哪个数据更新
				} else {
					this.setData({
						'inUserInfo[0].name': '',
						'namemsg': '请输入正确的姓名'
					})
				}
			},
			getClass(e) {
				var val = e.detail.value
				if (val.length == 0) {
					this.setData({
						'classmsg': '请输入班级'
					})
				} else if (/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)) {
					this.setData({
						'classmsg': '',
						'inUserInfo[0].class': val,
						'userInfo[0].class': val
					})
					this.triggerEvent('sync', this.data.userInfo)
				} else {
					this.setData({
						'classmsg': '请输入正确的班级',
						'inUserInfo[0].class': ''
					})
				}
			},
			getPhone(e) {
				var val = e.detail.value
				if (val.length == 0) {
					this.setData({
						'phonemsg': '请输入电话号码'
					})
				} else if (/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(e.detail.value)) {
					this.setData({
						'phonemsg': '',
						'inUserInfo[0].telephone': val,
						'userInfo[0].telephone': val
					})
					this.triggerEvent('sync', this.data.userInfo)
				} else {
					this.setData({
						'phonemsg': '请输入正确的电话号码',
						'inUserInfo[0].telephone': ''
					})
				}
			},
			getEmail(e) {
				var val = e.detail.value
				if (val.length == 0) {
					this.setData({
						'emailmsg': '请输入邮箱'
					})
				} else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.detail.value)) {
					this.setData({
						'emailmsg': '',
						'inUserInfo[0].email': val,
						'userInfo[0].email': val
					}) 
					this.triggerEvent('sync', this.data.userInfo)
				} else {
					this.setData({
						'emailmsg': '请输入正确的邮箱',
						'inUserInfo[0].email': ''
					})
				}
			},
			cleanWarn() {
				this.setData({
					'studentIDmsg': '',
					'namemsg': '',
					'classmsg': '',
					'phonemsg': '',
					'emailmsg': ''
				})
			}
    }
})
