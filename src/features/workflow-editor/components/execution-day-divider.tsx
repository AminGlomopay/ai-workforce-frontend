import { FC } from 'react';

interface ExecutionDayDividerProps {
  label: string;
}

export const ExecutionDayDivider: FC<ExecutionDayDividerProps> = ({ label }) => (
  <div className='text-muted-foreground/80 flex items-center gap-3 px-3 pt-4 pb-2 font-mono text-[10px] tracking-widest uppercase'>
    {label}
    <span className='from-border h-px flex-1 bg-linear-to-r to-transparent' />
  </div>
);
