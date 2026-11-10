import { FC, ReactNode } from 'react';

interface WorkflowsPageHeaderProps {
  children: ReactNode;
}

export const WorkflowsPageHeader: FC<WorkflowsPageHeaderProps> = ({ children }) => (
  <header className='mb-6 flex items-end justify-between border-b pb-6'>
    <div>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>Event-driven agents</span>
      <h1 className='mt-2 text-3xl font-semibold tracking-tight'>Workflows</h1>
    </div>
    {children}
  </header>
);
