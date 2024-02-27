import { useLocation, useNavigate } from 'react-router-dom';

import Icon from '@/components/icon';
import { authRoutes } from '@/router/routes';
import { searchRoute } from '@/utils/route';

const Title = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHomePage = ['home', 'dashboard-home'].includes(pathname);
  const canBack = !/.+\/list$/.test(pathname);
  const currentRoute = searchRoute(pathname, authRoutes);

  const back = () => {
    if (canBack) {
      navigate(-1);
    }
  };

  return (
    !isHomePage && (
      <div className="h-[32px] flex justify-center items-center">
        {canBack ? (
          <span className="self-stretch w-[32px] text-xl rounded select-none cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center justify-center">
            <Icon icon="icon-park-outline:left" onClick={() => back()} />
          </span>
        ) : (
          <span className="self-stretch w-[32px] text-xl rounded select-none cursor-pointer flex items-center justify-center">
            {currentRoute.meta?.icon && <Icon icon={currentRoute.meta.icon} />}
          </span>
        )}
        {!!currentRoute.meta?.title && (
          <span className="ml-2 text-lg font-medium">{currentRoute.meta?.title}</span>
        )}
      </div>
    )
  );
};

export default Title;
