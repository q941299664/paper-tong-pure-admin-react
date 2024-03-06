import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { UserInfo } from '@/types/user'

interface UserInfoState {
  userInfo: UserInfo | null
}

const initUserInfoState: UserInfoState = {
  userInfo: null
}

export const useUserInfoStore = create<UserInfoState>()(
  immer(
    devtools(
      persist(
        () => ({
          ...initUserInfoState
        }),
        { name: 'userInfo' }
      ),
      { name: 'userInfo' }
    )
  )
)

export const setUserInfo = (info: UserInfo) => {
  useUserInfoStore.setState({ userInfo: info })
}
