/**
 * 考勤系统配置文件
 * 所有变量名自注释，修改配置项之后请重新编译打包
 * @type {string}
 */
/* 后台地址 */
import {baseUrl} from './env'
// 优秀分数
let EXCELLENT = 95
// 良好分数
let GOOD = 90
// 及格分数
let QUALIFED = 85
// 每天工作时间（分钟）
const everydayWorkTime = 480
// 默认加载时间 300 ms
const LOADING = 300
// 超时时间 10s
const TIMEOUT = 10000
// 开发环境配置
if (process.env.NODE_ENV === 'development') {
  // EXCELLENT = 50
  // GOOD = 30
  // QUALIFED = 20
}
// 总览页面 table 字段
const _totalTableField = ['姓名', '所属部门', '成绩', '应到天数', '实到天数', '请假(天)', '旷工(天)', {
  prop: '标准早退',
  label: '早退天数'
}, {
  prop: '标准迟到',
  label: '迟到天数'
}, '标准工作时数', '实际工作时数', '考勤等级']
// 个人考勤 table 字段
const _personalTableField = ["工号", "姓名", "时间", "第一时段上班", "第一时段下班", "第二时段上班", "第二时段下班", "迟到时间（分钟）", "早退时间（分钟）", "缺勤时间（分钟）"]
const _abnormalTableField = ["工号", "姓名", "时间", "第一时段上班", "第一时段下班", "第二时段上班", "第二时段下班", "工作时间（分钟）"]
// 个人统计 字段
const _dailyTableField = ["工号", "时间", "所属部门", "姓名", "第一时段上班", "第一时段下班", "第二时段上班", "第二时段下班", "迟到时间（分钟）", "早退时间（分钟）", "缺勤时间（分钟）", "工作时间（分钟）"]
// 等级统计 table 字段
const _levelTableField = ["姓名", "等级"]
// 文件分析配置项
const config = {
  // 总览页面
  all: {
    // table 配置
    tableConfig: _totalTableField.map(item => {
      if (typeof item === 'string') {
        return {prop: item, label: item, sortable: true}
      } else {
        return Object.assign({}, item, {sortable: true})
      }
    }),
    // 默认排序
    defaultSort: {prop: '成绩', order: 'descending'},
    // 图表默认行列
    columns: ['成绩', '应到天数', '实到天数', '姓名'],
    // 图表设置
    chartSettings: {
      // 纵轴
      metrics: ['成绩'],
      // 横轴
      dimension: ['姓名'],
      // 是否显示每个条目的 label
      label: {
        normal: {show: true, position: "top"}
      }
    },
    // 标志参考线
    markLine: {
      data: [{name: '考勤合格', yAxis: QUALIFED},
        {name: '考勤良好', yAxis: GOOD},
        {name: '考勤优秀', yAxis: EXCELLENT}]
    },
    // 标志范围
    markArea: {
      data: [
        [
          {
            name: '不及格',
            yAxis: QUALIFED
          },
          {
            yAxis: 0
          }
        ]
      ]
    }
  },
  person: {
    tableConfig: _personalTableField.map(item => {
      if (typeof item === 'string') {
        return {prop: item, label: item, sortable: true}
      } else {
        return Object.assign({}, item, {sortable: true})
      }
    }),
    defaultSort: {prop: '时间', order: 'ascending'},
    columns: ['工作时间（分钟）', '缺勤时间（分钟）', '迟到时间（分钟）'],
    chartSettings: {
      metrics: [ '缺勤时间（分钟）', '迟到时间（分钟）'],
      dimension: ['时间'],
      label: {
        normal: {show: true, position: "top"}
      }
    },
    columnsSum: ['time', 'key', '迟到时间（分钟）'],
    chartSettingsSum: {
      metrics: 'time',
      dimension: 'key',
      label: {
        normal: {show: true, position: "top"}
      }
    }
  },
  abnormal: {
    tableConfig: _abnormalTableField.map(item => {
      if (typeof item === 'string') {
        return {prop: item, label: item, sortable: true}
      } else {
        return Object.assign({}, item, {sortable: true})
      }
    }),
    defaultSort: {prop: '时间', order: 'ascending'},
    columns: ['工作时间（分钟）', '缺勤时间（分钟）', '迟到时间（分钟）'],
    chartSettings: {
      metrics: ['工作时间（分钟）'],
      dimension: ['时间'],
      label: {
        normal: {show: true, position: "top"}
      }
    },
    columnsSum: ['time', 'key', '迟到时间（分钟）'],
    chartSettingsSum: {
      metrics: 'time',
      dimension: 'key',
      label: {
        normal: {show: true, position: "top"}
      }
    }
  },
  daily: {
    tableConfig: _dailyTableField.map(item => {
      if (typeof item === 'string') {
        return {prop: item, label: item, sortable: true}
      } else {
        return Object.assign({}, item, {sortable: true})
      }
    }),
    defaultSort: {prop: '时间', order: 'ascending'},
    columns: ['工作时间（分钟）', '缺勤时间（分钟）', '迟到时间（分钟）'],
    chartSettings: {
      metrics: ['工作时间（分钟）', '缺勤时间（分钟）', '迟到时间（分钟）'],
      dimension: ['姓名'],
      dataEmpty: true,
      label: {
        normal: {show: true, position: "right"}
      },
      // legendName: {
      //   '工作时间（分钟）': ''
      // }
    }
  },
  level: {
    tableConfig: _levelTableField.map((item) => {
      if (typeof item === 'string') {
        return {prop: item, label: item}
      } else {
        return Object.assign({}, item)
      }
    }),
    defaultSort: {prop: '成绩', order: 'descending'},
    columns: ['level', 'count'],
    chartSettings: {
      metrics: 'count',
      dimension: 'level'
    }
  },
  every: {
    tableConfig: _personalTableField.map(item => {
      if (typeof item === 'string') {
        return {prop: item, label: item, sortable: true}
      } else {
        return Object.assign({}, item, {sortable: true})
      }
    }),
    defaultSort: {prop: '时间', order: 'ascending'},
    columns: ['time', 'key', '迟到时间（分钟）'],
    chartSettings: {
      metrics: 'time',
      dimension: 'key',
      label: {
        normal: {show: true, position: "top"}
      }
    }
  },
}

export {baseUrl, EXCELLENT, GOOD, QUALIFED, LOADING, config, everydayWorkTime, TIMEOUT}
