import { Children, ComponentType, ReactElement } from 'react';

interface AsyncChildFilterProps {
  children: ReactElement | ReactElement[];
  type: ComponentType;
}

export default function AsyncChildrenFilter({ children, type }: AsyncChildFilterProps) {
  return (
    <>
      {Children.map(children, (child) => {
        if (child.type === type) {
          return child;
        }
      })}
    </>
  );
}
