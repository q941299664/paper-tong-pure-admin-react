import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { Token } from '@/types/user'

interface TokenState {
  token: Token | null
}

const initTokenState: TokenState = {
  token: null
}

export const useTokenStore = create<TokenState>()(
  immer(
    devtools(
      persist(
        () => ({
          ...initTokenState
        }),
        { name: 'token' }
      ),
      { name: 'token' }
    )
  )
)

export const setToken = (token: Token) => {
  useTokenStore.setState({ token: token })
}
