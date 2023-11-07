import type { LoginData, UserInfo, UserInfoRes } from '@/types/user'
import { http } from '@/utils'

export async function userLoginApi(data: LoginData): Promise<UserInfo> {
  return http({
    url: '/login',
    method: 'get',
    params: data
  })
}

export async function userInfoApi(): Promise<UserInfoRes> {
  return http({
    url: '/info',
    method: 'get'
  })
}
