import type { MenuProps } from 'antd'

import { Button, Dropdown, Menu } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'

import { Icon } from '@/components/icon'
import { LOCALES } from '@/constants/app'
import { useAppStore } from '@/stores'

export default function LangSelect() {
  const { i18n } = useTranslation()

  const { currentLocale, setLocale } = useAppStore(
    useShallow(state => ({
      currentLocale: state.currentLocale,
      setLocale: state.setLocale,
    })),
  )

  const selectedKeys = useMemo(() => [currentLocale], [currentLocale])

  const menuItems = useMemo(() =>
    Object.entries(LOCALES).map(([key, value]) => ({
      key,
      label: value.label,
    })), [])

  const handleClick: MenuProps['onClick'] = (e) => {
    const key = String(e.key)
    setLocale(key)
    i18n.changeLanguage(key)
  }

  return (
    <Dropdown
      dropdownRender={() => (
        <Menu
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={handleClick}
        />
      )}
      placement="bottom"
    >
      <div className="w-10">
        <Button
          type="text"
          block
          icon={(
            <Icon
              icon="icon-park-outline:translate"
              className="text-base dark:text-theme-dark text-theme"
            />
          )}
        />
      </div>
    </Dropdown>
  )
};
