import type { ReactNode } from 'react';

import { DisplayName } from './constants';

export interface CollapsedProps {
  children: ReactNode;
}

const Collapsed = (props: CollapsedProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

Collapsed.displayName = DisplayName.Collapsed;

export default Collapsed;
