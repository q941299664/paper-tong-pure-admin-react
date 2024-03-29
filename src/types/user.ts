export interface LoginData {
  email: string
  password: string
}

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface UserInfo {
  id: string
  username: string
  email?: string
  nickName?: string
  phoneNumber?: string
  headPic?: string
  isAdmin: boolean
  isFrozen: boolean
  role: number[]
  permissions: string[]
  createTime: number
}

export interface LoginRes extends Token {
  userInfo: UserInfo
}

export type UserInfoRes = Omit<UserInfo, 'token'>
