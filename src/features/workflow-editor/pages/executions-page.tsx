import { FC } from 'react';
import { Outlet, useParams } from '@tanstack/react-router';

import { ExecutionsSidebar } from '../components/executions-sidebar';
import { ExecutionsTopBar } from '../components/executions-top-bar';

export const ExecutionsPage: FC = () => {
  const { workflowId } = useParams({ from: '/_authenticated/workflows/$workflowId' });

  return (
    <div className='flex h-dvh flex-col'>
      <ExecutionsTopBar workflowId={workflowId} />
      <div className='flex min-h-0 flex-1'>
        <ExecutionsSidebar workflowId={workflowId} />
        <main className='relative flex min-w-0 flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
