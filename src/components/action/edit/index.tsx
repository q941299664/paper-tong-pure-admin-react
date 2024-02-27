import Core from '../core';
import type { CoreProps } from '../core';

export interface EditProps extends CoreProps {}

const Edit = (props: EditProps) => {
  return (
    <Core icon="icon-park-outline:edit" {...props}>
      修改
    </Core>
  );
};

export default Edit;
