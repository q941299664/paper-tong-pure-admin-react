import { AnimatePresence, motion } from 'motion/react'
import { Outlet, useLocation } from 'react-router-dom'

import { AuthGuard } from '@/components/auth-guard'
import { BlankLayout, DefaultLayout } from '@/layouts'
import { getRouteMeta } from '@/router/routeMeta'

export default function Layout() {
  const { pathname } = useLocation()
  const routeMeta = getRouteMeta(pathname)

  const pageTransition = {
    initial: { opacity: 0, x: -16 }, // 进入前状态
    animate: { opacity: 1, x: 0 }, // 进入后状态
    exit: { opacity: 0, x: 16 }, // 退出状态
    transition: { duration: 0.3 }, // 动画时长
  }

  if (!routeMeta?.layout || routeMeta.layout === 'default') {
    return (
      <AuthGuard>
        <DefaultLayout>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              {...pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </DefaultLayout>
      </AuthGuard>

    )
  }

  return (
    <AuthGuard>
      <BlankLayout>
        <Outlet />
      </BlankLayout>
    </AuthGuard>
  )

  // const CurrentLayout = routeMeta?.layout === 'blank' ? BlankLayout : DefaultLayout

  // return (
  //   <AuthGuard>
  //     <CurrentLayout>
  //       <Outlet />
  //     </CurrentLayout>
  //   </AuthGuard>
  // )
}
