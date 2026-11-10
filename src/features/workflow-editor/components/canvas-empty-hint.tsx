import { FC } from 'react';
import { MousePointer2 } from 'lucide-react';

export const CanvasEmptyHint: FC = () => (
  <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center'>
    <div className='relative flex size-28 items-center justify-center'>
      <span className='border-primary-soft/40 animate-spin-slow absolute inset-0 rounded-full border border-dashed' />
      <span className='bg-primary/20 animate-breathe absolute inset-6 rounded-full blur-md' />
      <MousePointer2 className='text-primary-soft relative size-6 drop-shadow-[0_0_10px_var(--primary)]' />
    </div>
    <span className='text-primary-soft mt-6 font-mono text-[10px] tracking-widest uppercase'>Canvas empty</span>
    <p className='text-muted-foreground mt-2 max-w-xs text-sm'>Drag a trigger from the palette to start the workflow.</p>
  </div>
);
