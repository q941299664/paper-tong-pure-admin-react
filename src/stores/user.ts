import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { UserInfo } from '@/types/user'

interface userInfoState {
  userInfo: UserInfo | null
  setUserInfo: (info: UserInfo) => void
}

export const useUserInfoStore = create<userInfoState>()(
  persist(
    immer(set => ({
      userInfo: null,
      setUserInfo: (info: UserInfo) => {
        set(state => {
          state.userInfo = info
        })
      }
    })),
    { name: 'userInfo' }
  )
)
