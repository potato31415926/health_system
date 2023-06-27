import { useId } from 'element-plus'
import API from '../axios'
import { User } from '@/utils/model/user'

// 添加用户
export const insertUser = function (userInfo: any) {
  userInfo.is_punch = '否'
  userInfo.punch_days = 0
  return API({
    url: '/api/insertUser',
    method: 'post',
    data: {
      userInfo
    }
  })
}

// 删除用户（单独删除，批量删除）
export const deleteUsers = function (ids: string[]) {
  return API({
    url: '/api/deleteUsers',
    method: 'get',
    params: {
      ids: ids.toString()
    }
  })
}

// 修改用户信息
export const editUser = function (userInfo: User) {
  userInfo = JSON.stringify(userInfo)
  return API({
    url: '/api/updateUser',
    method: 'post',
    params: {
      userInfo
    }
  })
}

// 管理员修改密码
export const changePassword = function (user_id: string, password: string) {
  return API({
    url: '/api/operate',
    method: 'get',
    params: {
      operator: 'change',
      admin_id: user_id,
      password: password
    }
  })
}

// 删除管理员
export const deleteAdmin = function (user_id: string) {
  return API({
    url: '/api/operate',
    method: 'get',
    params: {
      operator: 'remove',
      admin_id: user_id
    }
  })
}

// 增加管理员
export const insertAdmin = function (adminInfo: any) {
  adminInfo = JSON.stringify(adminInfo)
  return API({
    url: '/api/addAdmin',
    method: 'post',
    params: {
      strJson: adminInfo
    }
  })
}

// 更新数据库中的每日打卡情况
export const updateAfterPunch = function (userInfo: User, selects: any) {
  return API({
    url: '/api/everydaypunch',
    method: 'post',
    params: {
      phone: selects.phone,
      select0: selects.select0,
      select1: selects.select1,
      select2: selects.select2,
      select3: selects.select3,
      select4: selects.select4,
      select5: selects.select5
    },
    data: {
      userInfo
    }
  })
}
