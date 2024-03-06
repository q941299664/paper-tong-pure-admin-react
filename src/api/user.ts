import type { LoginData, UserInfo, UserInfoRes } from '@/types/user'
import { http } from '@/utils/http'

export const userLoginApi = (data: LoginData): Promise<UserInfo> => {
  return http({
    url: '/login',
    method: 'get',
    params: data
  })
}

export const userInfoApi = (): Promise<UserInfoRes> => {
  return http({
    url: '/info',
    method: 'get'
  })
}
