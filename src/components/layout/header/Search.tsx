import { useBoolean } from 'ahooks'

import Icon from '@/components/icon'
import useHotkey from '@/hooks/useHotkey'
import { isMacOS, isWindows } from '@/utils'

import SearchContent from './SearchContent'

function Search() {
  const [open, { setTrue, setFalse }] = useBoolean(false)

  const hotkeyTip = isMacOS ? '⌘ + K' : isWindows ? 'Ctrl + K' : ''
  const hotkey = isMacOS ? 'command+k' : isWindows ? 'ctrl+k' : ''

  const handleClick = () => {
    setTrue()
  }

  useHotkey({
    hotkey,
    callback: handleClick
  })

  return (
    <>
      <div
        className="flex items-center px-12 h-[32px] space-x-2 text-gray-400 bg-gray-400/5 hover:bg-gray-600/5 rounded"
        onClick={handleClick}
      >
        <Icon icon="icon-park-outline:search" />
        <span className="text-sm">搜索</span>
        <span className="text-sm text-gray-300">{hotkeyTip}</span>
      </div>
      <SearchContent open={open} setFalse={setFalse} />
    </>
  )
}

export default Search
