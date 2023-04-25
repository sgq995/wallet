import { Children, PropsWithChildren } from 'react';

export interface IRepeatProps {
  times: number;
}

export const Repeat: React.FC<PropsWithChildren<IRepeatProps>> = ({
  times,
  children,
}) => {
  return <>{new Array(times).fill(Children.only(children))}</>;
};
