import { useResponsive, useSize } from 'ahooks';
import type { MenuProps } from 'antd';
import qs from 'qs';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ActionCore, ActionDelete } from '@/components/action';
import ActionDropdown from '@/components/action/dropdown';
import DividerGroup from '@/components/divider-group';
import { Fold, FoldCollapsed, FoldDefault } from '@/components/fold';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '1',
  },
  {
    key: '2',
    label: '2',
  },
  {
    key: '3',
    label: '3',
  },
];

const Upload = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate('/dashboard/index', { state: { bridge: '123456' } })
  // }, 3000)
  const query = new URLSearchParams(search);
  const bridgeID = query.get('bridge');
  console.log(query);
  console.log(bridgeID);
  const divRef = useRef<HTMLDivElement>(null);
  const size = useSize(divRef);
  const responsive = useResponsive();

  const handleClick = () => {
    console.log('click');
  };

  const handleChange = (val: boolean) => {
    console.log(val);
  };

  return (
    <div className="flex flex-col items-center gap-10 m-10">
      <DividerGroup>
        {/*<ActionCore>123</ActionCore>*/}
        <ActionCore>456</ActionCore>
        <ActionCore>789</ActionCore>
      </DividerGroup>
      {/*<ActionDropdown menu={{ items }}></ActionDropdown>*/}
      <Fold onChange={handleChange}>
        <FoldDefault>FoldDefault</FoldDefault>
        <FoldCollapsed>FoldCollapsed</FoldCollapsed>
      </Fold>
      {/*<ActionDelete confirmOkText="ok" />*/}
      {/*<ActionCore confirm confirmTitle="12345" onClick={handleClick}>*/}
      {/*  12345*/}
      {/*</ActionCore>*/}
      <div>{JSON.stringify(responsive)}</div>
      <div ref={divRef} className="w-20 h-20 border border-red-500"></div>
      <div>width: {size?.width}</div>
      <div>height: {size?.height}</div>
    </div>
  );
};

export default Upload;
