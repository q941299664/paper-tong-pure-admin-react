import type { LoginData, LoginRes, UserInfoRes } from '@/types/user'
import { http } from '@/utils/http'

export const userLoginApi = (data: LoginData): Promise<LoginRes> => {
  return http({
    url: '/user/admin/login',
    method: 'post',
    data
  })
}

export const userInfoApi = (): Promise<UserInfoRes> => {
  return http({
    url: '/info',
    method: 'get'
  })
}
