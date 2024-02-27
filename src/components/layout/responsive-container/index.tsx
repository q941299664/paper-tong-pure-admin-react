import { useResponsive } from 'ahooks';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { SCREEN_BREAK_POINTS, SIDEBAR_WIDTH } from '../constants';
import type { Breakpoints } from '../constants';

export interface ResponsiveContainerProps {
  children: ReactNode;
}

const ResponsiveContainer = (props: ResponsiveContainerProps) => {
  const { children } = props;
  const [maxWidth, setMaxWidth] = useState('');
  const responsive = useResponsive();
  const breakpointsName = Object.keys(responsive) as Breakpoints[];
  const style = {
    maxWidth: maxWidth,
  };

  useEffect(() => {
    const getMaxWidth = () => {
      return breakpointsName.reduce((result, point, pointIndex) => {
        if (result) return result;
        if (responsive[point]) {
          return `${SCREEN_BREAK_POINTS[point] - SIDEBAR_WIDTH}px`;
        }
        if (pointIndex === breakpointsName.length - 1 && !result) {
          return '100%';
        }
        return '';
      }, '');
    };

    setMaxWidth(getMaxWidth());
  }, [responsive, breakpointsName]);

  return (
    <div className="mx-auto" style={style}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
