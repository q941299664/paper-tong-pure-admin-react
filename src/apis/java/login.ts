import { getLoginParams, javaRequest, setJavaToken } from './request'

/**
 * Java后端登录接口
 * 使用固定的登录参数进行登录，并存储返回的token
 * @returns 包含用户信息和token的Promise
 */
export function javaLoginApi(): Promise<{
  userInfo: any
  token: string
}> {
  // 使用固定的登录参数
  const data = getLoginParams()

  return javaRequest.post('/user/login', data).then((response) => {
    // 存储token用于后续请求
    if (response.data && response.data.token) {
      setJavaToken(response.data.token)
    }
    return response.data
  })
}

/**
 * 获取Java后端用户信息
 * 使用存储的token获取当前登录用户的详细信息
 * @returns 用户信息的Promise
 */
export function getJavaUserInfo(): Promise<any> {
  return javaRequest.get('/user/info')
}
