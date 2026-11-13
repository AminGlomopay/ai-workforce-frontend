import { FC, ReactNode } from 'react';

interface NodeSettingsHeaderProps {
  eyebrow: string;
  icon: ReactNode;
  title: ReactNode;
  typeLabel: string;
  status: ReactNode;
}

export const NodeSettingsHeader: FC<NodeSettingsHeaderProps> = ({ eyebrow, icon, title, typeLabel, status }) => (
  <header className='flex flex-col gap-4'>
    <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>{eyebrow}</span>
    <div className='flex items-center gap-3'>
      <span className='bg-secondary flex size-10 shrink-0 items-center justify-center rounded-lg border'>{icon}</span>
      <div className='flex min-w-0 flex-col gap-1'>
        {title}
        <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{typeLabel}</span>
      </div>
    </div>
    <div className='text-muted-foreground flex items-center gap-2 border-y py-2 font-mono text-[10px] tracking-widest uppercase'>{status}</div>
  </header>
);
