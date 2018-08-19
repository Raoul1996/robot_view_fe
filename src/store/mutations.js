import {EXCELLENT, GOOD, QUALIFED, everydayWorkTime} from '../config'

import {calcTime, formatArray} from '../utils'
import {
  USER_LOGIN,
  LOGOUT,
  USER_INFO,
  RECORD_USER_INFO,
  USER_TOKEN,
  USER_FORGET,
  RESET_PASS,
  FILE_NAME,
  NAME_LIST,
  SEND_MAIL,
  EXCEL,
  FLAG, UPDATE_INFO
} from './mutation-types'
import {setStore} from 'src/config/localStorage'
import _ from 'lodash'

export default {
  [LOGOUT](state) {
    state = []
  },
  [FLAG](state, flag) {
    state.flag = flag
  },
  // 存储用户信息
  [USER_INFO](state, info) {
    state.info = info
    setStore('user', info)
  },
  // 存储登陆状态
  [USER_LOGIN](state, bool) {
    state.login = bool
  },
  [UPDATE_INFO](state,bool){
    state.updateInfo  = bool
  },
  // 存储 token
  [USER_TOKEN](state, token) {
    state.token = token
  },
  // 记录用户信息
  [RECORD_USER_INFO](state, info) {
    state.userInfo = info
    state.login = true
  },
  [USER_FORGET](state, bool) {
    state.reset = bool
  },
  [RESET_PASS](state, bool) {
    state.reset = bool
  },
  [EXCEL](state, excel) {
    const trimest = (data) => {
      if (!data || Array.isArray(data) && data.length === 0) return
      if (Array.isArray(data) && data.length > 0) {
        return data.map(item => {
          return trimest(item)
        })
      } else {
        if (data % 1 === 0) return data
        return data && data.replace(/\s+/g, "")
      }
    }
    const maxKey = (obj) => {
      return Math.max(...Object.keys(obj).filter(item => {
        return item % 1 === 0 && item.length > 0
      }))
    }
    excel = trimest(excel)
    let target = ['message', 'attend', 'log', 'abnormal']
    let hash = {}
    target.forEach((item, index) => {
      let cleanExcel = excel[index].filter(sub => {
        if (sub && sub.length > 0) {
          sub.filter(every => every)
        }
        return !!sub
      })
      hash[item] = Object.assign({}, cleanExcel)
      excel[index] = cleanExcel
    })
    for (let i = 0; i < excel.length; i++) {
      // 获取标题并去空格
      hash[target[i]]["title"] = excel[i][0].filter(item => item)[0].replace(/\s+/g, "")
      hash[target[i]]["type"] = target[i]
      // 因为考勤记录表中是undefined
      let fieldIndex = 1
      hash[target[i]]["between"] = excel[i][fieldIndex].filter(item => {
        return !!item
      })
      hash[target[i]]["column"] = excel[i][fieldIndex + 1].filter(item => {
        return !!item
      })
    }
    let realColumnAttend = []
    let realColumnAbnormal = []
    for (let i = 0; i <= hash.attend.column.length; i++) {
      let column = hash.attend.column
      let target = [3, 4, 5, 6]
      if (~target.indexOf(i)) {
        realColumnAttend.push(`标准${column[i]}`)
        realColumnAttend.push(`实际${column[i]}`)
      } else {
        realColumnAttend.push(column[i])
      }
    }
    for (let i = 0; i <= hash.abnormal.column.length; i++) {
      let column = hash.abnormal.column
      let target = [4, 5]
      if (~target.indexOf(i)) {
        realColumnAbnormal.push(`${column[i]}上班`)
        realColumnAbnormal.push(`${column[i]}下班`)
      } else {
        realColumnAbnormal.push(column[i])
      }
    }
    hash.attend.column = realColumnAttend
    hash.abnormal.column = realColumnAbnormal
    hash.attend.record = []
    hash.attend.level = []
    let good = 0, bad = 0, normal = 0, excellent = 0
    hash.abnormal.record = []
    for (let i = 4; i <= maxKey(hash.attend); i++) {
      let records = {}
      hash.attend[i].forEach((item, index) => {
        if (item) {
          if (hash.attend[i][index] % 1 === 0) {
            records = Object.assign({}, records, {[realColumnAttend[index]]: +hash.attend[i][index]})
          } else {
            records = Object.assign({}, records, {[realColumnAttend[index]]: hash.attend[i][index]})
          }
        }
      })
      if (records['工号']) {
        let grade = records['出勤天数(标准/实际)'].split('/')
        records['成绩'] = Math.round(grade[1] / grade[0] * 10000) / 100
        records['应到天数'] = grade[0]
        records['实到天数'] = grade[1]

        if (records['成绩'] >= EXCELLENT) {
          records['考勤等级'] = '优'
          hash.attend.level.push({
            '等级': "优秀",
            "姓名": records["姓名"],
            "工号": records["工号"]
          })
          excellent++
        } else if (records['成绩'] >= GOOD) {
          records['考勤等级'] = '良好'
          hash.attend.level.push({
            '等级': "良好",
            "姓名": records["姓名"],
            "工号": records["工号"]
          })
          good++
        } else if (records['成绩'] >= QUALIFED) {
          records['考勤等级'] = '合格'
          hash.attend.level.push({
            '等级': "合格",
            "姓名": records["姓名"],
            "工号": records["工号"]
          })
          normal++
        } else {
          records['考勤等级'] = '不合格'
          hash.attend.level.push({
            '等级': "不及格",
            "姓名": records["姓名"],
            "工号": records["工号"]
          })
          bad++
        }
        hash.attend.record.push(Object.assign({}, records, {
          "成绩": records['成绩'],
          "应到天数": records['应到天数'],
          "实到天数": records["实到天数"]
        }))
      }
    }
    hash.attend.status = [
      {level: "优秀", count: excellent},
      {level: "良好", count: good},
      {level: "合格", count: normal},
      {level: "不及格", count: bad}
    ]
    const realNameList = hash.attend.level.map(item => {
      return item['姓名']
    })
    const realTimeList = hash.message.column.filter(item => {
      return item % 1 === 0
    }).map(item => {
      return hash.message.between[1].slice(5, 7) + '-' + ('0' + item).slice(-2)
    })
    for (let i = 4; i <= maxKey(hash.abnormal); i++) {
      let records = {}
      hash.abnormal[i].forEach((item, index) => {
        if (hash.abnormal[i][index] % 1 === 0) {
          records = Object.assign({}, records, {[realColumnAbnormal[index]]: +hash.abnormal[i][index]})
        } else {
          records = Object.assign({}, records, {[realColumnAbnormal[index]]: hash.abnormal[i][index]})
        }
      })
      hash.abnormal.record.push(Object.assign({}, records))
      let nameList = []
      let timeList = []
      hash.abnormal.timeRecord = {}
      hash.abnormal.nameRecord = {}
      hash.abnormal.record.forEach(item => {
        const name = item['姓名']

        item["工作时间（分钟）"] = everydayWorkTime - item["合计（分钟）"]
        // 2017-11-24 => 11-24
        item["时间"] = item["日期"].slice(5)
        const time = item["时间"]
        if (!~nameList.indexOf(name)) {
          nameList.push(name)
          hash.abnormal.nameRecord[name] = []
        }
        hash.abnormal.nameRecord[name].push(item)
        if (!~timeList.indexOf(time)) {
          timeList.push(time)
          hash.abnormal.timeRecord[time] = []
        }
        hash.abnormal.timeRecord[time].push(item)
      })
      hash.abnormal.name = nameList
      hash.abnormal.time = timeList
      hash.abnormal.realName = realNameList
      hash.abnormal.realTime = realTimeList
    }
    for (let itemItem in hash.abnormal.timeRecord) {
      let tmp = _.cloneDeep(hash.attend.level)
      const tmpObj = hash.abnormal.timeRecord[itemItem][0]
      hash.abnormal.timeRecord[itemItem].forEach((subRecord) => {
        tmp.forEach((item, i) => {
          if (item["姓名"] === subRecord["姓名"])
            delete tmp[i]
        })
      })
      tmp.forEach(item => {
        hash.abnormal.timeRecord[itemItem].push(Object.assign({}, tmpObj, {
          '姓名': item["姓名"],
          '工号': item["工号"],
          '工作时间（分钟）': 480,
          '缺勤时间（分钟）': 0,
          '迟到时间（分钟）': 0,
          '早退时间（分钟）': 0
        }))
      })
    }
    hash.message.nameList = []
    hash.message.name = []
    for (let i = 4; i <= maxKey(hash.message); i++) {
      hash.message.nameList.push(hash.message[i][1])
      const sum = hash.message[i].filter(item => item === 2).reduce((a, b) => a + b) / 2
      hash.message.name.push({'姓名': hash.message[i][1], '工作天数': sum})
    }
    const sum = []
    const sumKey = ["缺勤时间（分钟）", "工作时间（分钟）", "迟到时间（分钟）"]
    hash.message.name.forEach((obj) => {
      const item = obj['姓名']
      const time = obj['工作天数']
      for (let i = 0; i < sumKey.length; i++) {
        let val = hash.abnormal.nameRecord[item].reduce((prev, curr) => {
          if (curr[sumKey[i]] % 1 !== 0) curr[sumKey[i]] = 0
          return prev + curr[sumKey[i]]
        }, 0)
        if (i === 1) {
          let addon = obj['工作天数'] - hash.abnormal.nameRecord[item].length
          val += addon * 480
        }
        sum.push({[sumKey[i]]: val, name: item, time: val, key: sumKey[i]})
      }
    })
    hash.abnormal.sortedData = {}
    hash.abnormal.name.forEach(name => {
      if (!hash.abnormal.sortedData[name]) hash.abnormal.sortedData[name] = []
      const obj = {}
      sum.forEach(item => {
        if (item.name === name) {
          if (!obj[name]) obj[name] = []
          obj[name].push(item)
        }
      })
      hash.abnormal.sortedData = Object.assign({}, hash.abnormal.sortedData, obj)
    })
    // 由于第三个表中的格式和其他表中的不同，所以进行了修正
    hash.log.between = hash.log[2].filter(item => item)
    hash.log.column = hash.log[3].filter(item => item)
    for (let i = 5; i <= maxKey(hash.log); i += 2) {
      let records = []
      hash.log[i] = hash.log[i].map(item => {
        if (item && item.length && item.length >= 5) {
          const length = item.length
          let res = []
          for (let i = 0; i < length; i += 5) {
            res.push(item.slice(i, i + 5))
          }
          return formatArray(res)
        }
      })
      //  ["工号:", "2", "姓名:", "翁泉源", "部门:", "实验室"] => {工号: "2", 姓名: "翁泉源", 部门: "实验室"}
      const info = hash.log[i - 1].filter(item => item)
      let person = {}
      let data = {}
      for (let i = 0; i < info.length; i += 2) {
        if (info[i]) {
          person[info[i].split(':')[0]] = info[i + 1]
        }
      }
      data = hash.log[i]
      let obj = {}
      for (let i = 0; i < hash.log.column.length; i++) {
        const col = hash.log.column[i]
        const key = hash.log.between[1].slice(5, 7) + '-' + ('0' + col).slice(-2)
        const seek = Object.assign({
          '工作时间（分钟）': 0,
          '迟到时间（分钟）': 0,
          '缺勤时间（分钟）': 0,
          '早退时间（分钟）': 0,
          '时间': key,
          '第一时段上班': undefined,
          '第一时段下班': undefined,
          '第二时段上班': undefined,
          '第二时段下班': undefined
        }, person)
        if (data[i]) {
          const cols = ['第一时段上班', '第一时段下班', '第二时段上班', '第二时段下班']
          data[i].forEach((item, index) => {
              let abnormal = hash.abnormal.nameRecord[person["姓名"]].filter(item => {
                return item['时间'] === key && item['姓名'] === person['姓名']
              })[0] || undefined
              let tmp = {}
              if (abnormal) {
                tmp['迟到时间（分钟）'] = abnormal['迟到时间（分钟）']
                tmp['早退时间（分钟）'] = abnormal['早退时间（分钟）']
                tmp['缺勤时间（分钟）'] = abnormal['缺勤时间（分钟）']
              }
              obj = Object.assign(seek, tmp, obj, {
                [cols[index]]: item,
                '时间': key
              }, calcTime(data[i]))
            }
          )
        } else {
          obj = seek
        }
        records.push(obj)
      }
      hash.log[person["姓名"]] = records
    }
    target.forEach(item => {
      for (let i = 0; i <= maxKey(hash[item]); i++) {
        delete hash[item][i]
      }
    })
    state.excel = hash
    target.forEach(item => {
      state[item] = hash[item]
    })
  },
  [FILE_NAME](state, file) {
    state.file = file
  },
  [NAME_LIST](state, name) {
    state.name = name
  },
  [SEND_MAIL](state, bool) {
    state.mail = bool
  }
}
