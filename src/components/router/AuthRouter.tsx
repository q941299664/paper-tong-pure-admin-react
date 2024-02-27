import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { rootRoutes } from '@/router/routes';
import { useUserInfoStore } from '@/stores';
import { searchRoute } from '@/utils/route';

const AuthRouter = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const userInfo = useUserInfoStore(state => state.userInfo);

  const route = searchRoute(pathname, rootRoutes);

  if (route.meta?.auth === false) return children;

  if (!userInfo || !userInfo.token) return <Navigate to="/login" replace={true} />;

  return children;
};

export default AuthRouter;
