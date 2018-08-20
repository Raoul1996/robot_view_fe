/**
 * 考勤系统文案配置文件
 * @type {{username: string, password: string, shortPass: string, longPass: string, email: string, emailError: string, mobile: string, mobileError: string, confirm: string, confirmError: string, captcha: string}}
 */
export const validator = {
  username: "请输入用户名",
  password: "请输入密码",
  shortPass: "密码需要大于6位",
  longPass: "密码需要小于20位",
  email: "请输入邮箱地址",
  emailError: "请输入正确的邮件地址",
  mobile: "请输入手机号",
  mobileError: "请输入正确的手机号",
  confirm: "请再次输入密码",
  confirmError: "两次密码输入不一致",
  captcha: "请填写验证码"
}
export const message = {
  error: {
    submitError: {
      showClose: true,
      type: 'error',
      message: '填写不符合规范'
    }
  },
  info: {
    login: {
      showClose: true,
      type: 'info',
      message: '请登录'
    },
    register: {
      showClose: true,
      type: 'info',
      message: '请注册'
    }
  },
  success: {
    login: {
      type: 'success',
      showClose: true,
      message: '登录成功'
    },
    register: {
      type: 'success',
      showClose: true,
      message: '注册成功'
    },
    profile:{
      type: 'success',
      showClose: true,
      message: '信息修改成功'
    }
  }
}
export const content = {
  login: {
    title: "欢迎",
    submit: "登录",
    forget: "忘记密码？",
    register: "创建用户"
  },
  register: {
    title: "欢迎新同学",
    submit: "注册用户"
  },
  forget: {
    title: "忘记密码",
    submit: "确定",
    send: "发送邮件"
  },
  upload: {
    title: "文件上传",
    help: "将Excel文件拖到此处，或",
    tip: "只能上传Excel文件，且不超过10MB"
  },
  analysis: {
    title: '表格分析',
    loading: {
      text: "数据分析中，请稍候...",
      icon: "el-icon-loading"
    },
    navigator: {
      title: "文件分析",
      group: [
        {
          title: '考勤信息', key: '分组1',
          item: [{
            title: "考勤信息总览", key: 'all'
          }, {
            title: "异常考勤信息", key: 'abnormal'
          }, {
            title: "个人考勤信息", key: 'person'
          }, {
            title: "轨迹图",key: 'orbit'
          }]
        },
        {
          title: '统计信息', key: '分组2',
          item: [{
            title: "等级统计", key: 'level'
          }, {
            title: "每日统计", key: 'daily'
          }, {
            title: "个人统计", key: 'every'
          }]
        }
      ]
    },
    all: {
      title: '考勤信息总览',
      chartsTitle: '总览图表',
      tableTitle: '总览表格'
    },
    person: {
      title: '个人考勤信息'
    },
    level: {
      title: '等级统计',
      chartsTitle: '考勤等级统计图表',
      tableTitle: '考勤等级统计表格'
    }
  },
  profile:{
    title:'用户中心',
    name:'姓名',
    email:'邮箱',
    edit:"编辑个人资料",
    update:"个人信息修改"
  },
  formLayout:[
    {label:'原用户名',type:'input', model:'username'},
    {label:'原密码',type:'input',model:'password'},
    {label:'新用户名',type:'password',model:'newusername'},
    {label:'新密码',type:'password',model:'newpass'},
    ]
}
export const label = {
  oldName:'原用户名',
  newName:'新用户名',
  username: "用户名",
  password: "密码",
  newPass: "新密码",
  oldPass: "原密码",
  email: "邮箱地址",
  mobile: "手机号码",
  confirm: "确认密码",
  captcha: "验证码"
}
export const placeholder = {
  username: "请输入用户名",
  password: "请输入密码",
  newPass: "请输入新密码",
  oldPass: "请输入旧密码",
  email: "请输入邮箱地址",
  mobile: "请输入手机号码",
  confirm: "请再次输入密码",
  captcha: "请输入验证码",
  select: "请选择"
}
