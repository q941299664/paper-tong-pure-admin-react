import { request } from '@/utils/request'

export function loginApi(data: any): Promise<AuthTokens> {
    return request.post('/user/login', data)
  }