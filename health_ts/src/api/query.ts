import API from '../axios'

// 查询学院
export const queryDepartments = function () {
  return API({
    url: '/api/searchDepartments',
    method: 'post'
  })
}

// 查询专业
export const queryMajors = function (dept_name: string) {
  return API({
    url: '/api/searchMajors',
    method: 'post',
    params: {
      dept_name
    }
  })
}

// 查询班级
export const queryClasses = function (major_name: string) {
  return API({
    url: '/api/searchClasses',
    method: 'post',
    params: {
      major_name
    }
  })
}

// 查询用户信息
export const queryUsers = function (dept: string, major: string, classes: string) {
  return API({
    url: '/api/searchUsers',
    method: 'get',
    params: {
      dept,
      major,
      classes
    }
  })
}

// 统计数据
export const queryCountInfo = function (department: string, major: string, classes: string) {
  return API({
    url: '/api/count',
    method: 'post',
    params: {
      department: department === '' ? '全部' : department,
      major: major === '' ? '全部' : major,
      class: classes === '' ? '全部' : classes,
      role: '全部'
    }
  })
}

// 获取管理员列表
export const queryAdmins = function (role_name: string, department: string) {
  return API({
    url: '/api/searchAdmins',
    method: 'post',
    params: {
      role_name,
      department
    }
  })
}

// 获取健康码信息
export const queryHealthCode = function (userInfo: any) {
  return API({
    url: '/api/healthcode',
    method: 'post',
    data: {
      userInfo
    }
  })
}
