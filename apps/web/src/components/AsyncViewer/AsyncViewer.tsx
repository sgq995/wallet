import { ReactElement } from 'react';
import AsyncChildrenFilter from './AsyncChildrenFilter';
import AsyncData from './AsyncData';
import AsyncError from './AsyncError';
import AsyncLoading from './AsyncLoading';

interface AsyncChild extends ReactElement {}
type AsyncChildren = AsyncChild | AsyncChild[];

interface AsyncViewerProps {
  isLoading: boolean;
  isError: boolean;
  children: AsyncChildren;
}

export default function AsyncViewer({
  isLoading,
  isError,
  children,
}: AsyncViewerProps) {
  if (isLoading) {
    return (
      <AsyncChildrenFilter type={AsyncLoading}>{children}</AsyncChildrenFilter>
    );
  }

  if (isError) {
    return (
      <AsyncChildrenFilter type={AsyncError}>{children}</AsyncChildrenFilter>
    );
  }

  return <AsyncChildrenFilter type={AsyncData}>{children}</AsyncChildrenFilter>;
}
