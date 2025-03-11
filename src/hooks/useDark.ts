import { useCallback, useEffect, useState } from 'react'

interface UseDarkOptions {
  /** 深色模式的 CSS 类名 */
  darkClass?: string
  /** 浅色模式的 CSS 类名 */
  lightClass?: string
  /** 存储深色模式状态的键名 */
  storageKey?: string
  /** 是否使用系统偏好的深色模式设置作为初始值 */
  usePreferredColorScheme?: boolean
  /** 应用 CSS 类名的元素，默认为 document.documentElement */
  element?: HTMLElement | null
  /** 初始值是否为深色模式 */
  initialValue?: boolean
}

/**
 * 用于在 React 应用中实现深色模式的自定义钩子
 * @param options 配置选项
 * @returns 深色模式状态和控制函数
 */
export function useDark(options: UseDarkOptions = {}) {
  const {
    darkClass = 'dark',
    lightClass = 'light',
    storageKey = 'color-scheme',
    usePreferredColorScheme = true,
    element = typeof document !== 'undefined' ? document.documentElement : null,
    initialValue = false,
  } = options

  // 检测系统偏好的颜色模式
  const prefersDark = useCallback(() => {
    if (typeof window === 'undefined')
      return initialValue
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? initialValue
  }, [initialValue])

  // 从 localStorage 获取保存的值，如果没有则使用系统偏好
  const getInitialValue = useCallback(() => {
    if (typeof window === 'undefined')
      return initialValue

    try {
      const storedValue = localStorage.getItem(storageKey)
      if (storedValue !== null) {
        return JSON.parse(storedValue) === true
      }

      if (usePreferredColorScheme) {
        return prefersDark()
      }
    }
    catch (error) {
      console.error('Error reading from localStorage:', error)
    }

    return initialValue
  }, [storageKey, initialValue, usePreferredColorScheme, prefersDark])

  // 创建状态
  const [isDark, setIsDark] = useState(getInitialValue)

  // 更新 DOM 和本地存储
  useEffect(() => {
    if (!element)
      return

    // 更新 DOM 类名
    if (isDark) {
      element.classList.add(darkClass)
      element.classList.remove(lightClass)
    }
    else {
      element.classList.add(lightClass)
      element.classList.remove(darkClass)
    }

    // 更新 localStorage 中的值
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(isDark))
      }
      catch (error) {
        console.error('Error writing to localStorage:', error)
      }
    }
  }, [isDark, element, darkClass, lightClass, storageKey])

  // 监听系统颜色模式变更
  useEffect(() => {
    if (!usePreferredColorScheme || typeof window === 'undefined')
      return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches)
    }

    // 兼容旧浏览器和新浏览器
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    }
    else {
      // 老版本浏览器的兼容写法
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      }
      else {
        // 老版本浏览器的兼容写法
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [usePreferredColorScheme])

  // 提供函数来切换模式
  const toggle = useCallback(() => setIsDark(prev => !prev), [])
  const enable = useCallback(() => setIsDark(true), [])
  const disable = useCallback(() => setIsDark(false), [])

  return {
    isDark,
    toggle,
    enable,
    disable,
  }
}
