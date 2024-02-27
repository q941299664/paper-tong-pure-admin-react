import Core from '../core';
import type { CoreProps } from '../core';

export interface SubmitProps extends CoreProps {}

const Submit = (props: SubmitProps) => {
  return (
    <Core icon="icon-park-outline:search" htmlType="submit" {...props}>
      查询
    </Core>
  );
};

export default Submit;
