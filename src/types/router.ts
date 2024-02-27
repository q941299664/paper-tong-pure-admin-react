import type { ReactNode } from 'react';

export interface MetaObject {
  auth?: boolean;
  title?: string;
  key?: string;
  icon?: string;
  index?: number;
}

export interface Route {
  element?: ReactNode;
  path?: string;
  meta?: MetaObject;
  children?: Route[];
}
