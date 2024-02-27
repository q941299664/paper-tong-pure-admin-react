import Core from '../core';
import type { CoreProps } from '../core';

export interface SwitchProps extends CoreProps {}

const Switch = (props: SwitchProps) => {
  return (
    <Core icon="icon-park-outline:switch" {...props}>
      切换
    </Core>
  );
};

export default Switch;
