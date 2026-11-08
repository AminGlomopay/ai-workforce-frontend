import { FC } from 'react';

export const AgentStatusBar: FC = () => (
  <div className='text-muted-foreground flex justify-between font-mono text-[10px] tracking-widest uppercase'>
    <span className='flex items-center gap-2'>
      <span className='bg-primary-soft size-1.5 rounded-full' />
      Agent online · idle
    </span>
    <span>0 workflows listening</span>
  </div>
);
