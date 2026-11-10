import { FC, ReactNode } from 'react';

interface WorkflowsPageHeaderProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export const WorkflowsPageHeader: FC<WorkflowsPageHeaderProps> = ({ eyebrow, title, children }) => (
  <header className='mb-6 flex items-end justify-between border-b pb-6'>
    <div>
      <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{eyebrow}</span>
      <h1 className='mt-2 text-3xl font-semibold tracking-tight'>{title}</h1>
    </div>
    {children}
  </header>
);
