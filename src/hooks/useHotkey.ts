import hotkeys from 'hotkeys-js'
import { useCallback, useEffect } from 'react'

interface HotkeyParams {
  hotkey: string
  callback: () => void
}

function useHotkey({ hotkey, callback }: HotkeyParams) {
  const cb = useCallback(callback, [callback])
  useEffect(() => {
    hotkeys(hotkey, cb)
    return () => {
      hotkeys.unbind(hotkey, cb)
    }
  }, [hotkey, cb])
}

export default useHotkey
