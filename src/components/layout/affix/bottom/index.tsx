import { Affix } from 'antd';
import classnames from 'classnames';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import type { ReactNode } from 'react';

import type { LayoutAffixRef } from '../types.ts';
import { useLayoutDashboardAffix } from '../useLayoutDashboardAffix';

export interface AffixBottomProps {
  children: ReactNode;
  onHeightChange?: (height: number) => void;
}

const AffixBottom = forwardRef<LayoutAffixRef, AffixBottomProps>((props, ref) => {
  const { children, onHeightChange } = props;

  const { affixed, affixRef, wrapperRef, updatePosition, size, onChange } =
    useLayoutDashboardAffix();

  useImperativeHandle(ref, () => {
    return {
      updatePosition,
    };
  });

  useEffect(() => {
    if (size?.height && size.height > 0 && onHeightChange) {
      onHeightChange(size.height);
    }
  }, [size, onHeightChange]);

  const wrapperClassnames = classnames('border-gray-200', {
    'bg-white border-t': affixed,
  });

  const wrapperStyle = {
    boxShadow: affixed ? '0px -5px 10px rgba(209 213 219 / 0.1)' : 'none',
  };

  return (
    <Affix ref={affixRef} offsetBottom={0} onChange={onChange}>
      <div ref={wrapperRef} className={wrapperClassnames} style={wrapperStyle}>
        <div className="px-6 py-4">{children}</div>
      </div>
    </Affix>
  );
});

export default AffixBottom;
