import { FC, ReactNode } from 'react';

interface NodeSettingsHeaderProps {
  icon: ReactNode;
  name: string;
  typeLabel: string;
  status: ReactNode;
}

export const NodeSettingsHeader: FC<NodeSettingsHeaderProps> = ({ icon, name, typeLabel, status }) => (
  <header className='flex flex-col gap-4'>
    <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>Node settings</span>
    <div className='flex items-center gap-3'>
      <span className='bg-secondary flex size-10 shrink-0 items-center justify-center rounded-lg border'>{icon}</span>
      <div className='flex min-w-0 flex-col gap-1'>
        <span className='truncate text-sm font-semibold tracking-tight'>{name}</span>
        <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{typeLabel}</span>
      </div>
    </div>
    <div className='text-muted-foreground flex items-center gap-2 border-y py-2 font-mono text-[10px] tracking-widest uppercase'>{status}</div>
  </header>
);
