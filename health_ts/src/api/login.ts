import API from '../axios'

// 用户登录
export const userLogin = function (user_name: string, user_id: string, person_id: string) {
  return API({
    url: '/api/login',
    method: 'post',
    params: {
      user_name,
      user_id,
      person_id
    }
  })
}

// 管理员登录
export const adminLogin = function (user_id: string, password: string) {
  return API({
    url: '/api/login',
    method: 'get',
    params: {
      user_id,
      password
    }
  })
}
