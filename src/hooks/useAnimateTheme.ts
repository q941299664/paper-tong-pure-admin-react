import { useCallback, useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useAppStore } from '@/stores'

const isBrowser = typeof window !== 'undefined'

// 注入基础样式
function injectBaseStyles() {
  if (isBrowser) {
    const styleId = 'theme-switch-base-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        html.stop-transition * {
          transition: none !important;
        }
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        ::view-transition-old(root),
        .dark::view-transition-new(root) {
          z-index: 1;
        }
        ::view-transition-new(root),
        .dark::view-transition-old(root) {
          z-index: 9999;
        }
      `
      document.head.appendChild(style)
    }
  }
}

export interface UseAnimateThemeOptions {
  duration?: number
  easing?: string
}

export function useAnimateTheme(options: UseAnimateThemeOptions = {}) {
  const {
    duration = 800,
    easing = 'ease-in-out',
  } = options

  const { isDark, toggleTheme } = useAppStore(
    useShallow(state => ({
      isDark: state.isDark,
      toggleTheme: state.toggleTheme,
    })),
  )

  const [isLoading, setIsLoading] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // 当钩子初始化时注入基础样式
  useEffect(() => {
    injectBaseStyles()
  }, [])

  const animateToggleTheme = useCallback(async () => {
    if (isLoading)
      return

    setIsLoading(true)

    if (
      !triggerRef.current
      || !(document as any).startViewTransition
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleTheme()
      setIsLoading(false)
      return
    }

    const { top, left, width, height } = triggerRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px at ${x}px ${y}px)`,
    ]

    document.documentElement.classList.add('stop-transition')

    const transition = await (document as any).startViewTransition(async () => {
      toggleTheme()
      // 等待一帧以确保DOM已更新
      await new Promise(requestAnimationFrame)
    })

    await transition.ready

    const animation = document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath,
      },
      {
        duration,
        easing,
        pseudoElement: `::view-transition-${isDark ? 'old' : 'new'}(root)`,
      },
    )

    animation.addEventListener('finish', () => {
      // 移除 stop-transition 类
      document.documentElement.classList.remove('stop-transition')
      setIsLoading(false)
    }, { once: true })
  }, [isDark, isLoading, duration, easing, toggleTheme])

  return {
    triggerRef,
    isDark,
    isLoading,
    toggleTheme,
    animateToggleTheme,
  }
}
