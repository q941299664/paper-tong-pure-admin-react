import type { ReactNode } from 'react';

interface GroupProps {
  children: ReactNode;
}

const Group = (props: GroupProps) => {
  const { children } = props;
  return <div className="flex flex-row p-2">{children}</div>;
};

export default Group;
