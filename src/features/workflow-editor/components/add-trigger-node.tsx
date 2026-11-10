import { FC } from 'react';
import { Plus } from 'lucide-react';

export const AddTriggerNode: FC = () => (
  <div className='animate-in fade-in zoom-in-90 fill-mode-both flex flex-col items-center duration-700'>
    <div className='relative flex size-40 items-center justify-center'>
      <span className='border-primary-soft/25 animate-spin-slow absolute inset-0 rounded-full border border-dashed' />
      <span className='animate-spin-reverse border-t-primary/60 border-r-primary/60 absolute inset-5 rounded-full border-2 border-transparent' />
      <span className='bg-primary/30 animate-breathe absolute inset-10 rounded-3xl blur-2xl' />
      <div className='border-primary-soft/50 bg-background/80 shadow-primary/40 relative flex size-20 items-center justify-center rounded-2xl border border-dashed shadow-[0_0_32px]'>
        <Plus className='text-primary-soft size-7 drop-shadow-[0_0_8px_var(--primary)]' />
      </div>
    </div>
    <span className='mt-3 text-sm font-medium'>Add first step</span>
    <span className='text-muted-foreground mt-1.5 font-mono text-[10px] tracking-widest uppercase'>Every workflow starts with a trigger</span>
  </div>
);
