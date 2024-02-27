import { CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../constants';

const Body = () => {
  const bodyStyle: CSSProperties = {
    paddingTop: HEADER_HEIGHT,
    paddingLeft: SIDEBAR_WIDTH,
    backgroundColor: '#F5F5F5',
  };

  return (
    <div className="z-0 min-h-screen" style={bodyStyle}>
      <Outlet />
    </div>
  );
};

export default Body;
