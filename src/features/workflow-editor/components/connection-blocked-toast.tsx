import { FC } from 'react';
import { Unplug } from 'lucide-react';

interface ConnectionBlockedToastProps {
  reason: string;
}

export const ConnectionBlockedToast: FC<ConnectionBlockedToastProps> = ({ reason }) => (
  <div className='bg-popover/85 border-destructive/40 shadow-destructive/20 relative flex w-(--width) items-center gap-3.5 overflow-hidden rounded-xl border px-5 py-4 shadow-[0_0_40px] backdrop-blur-xl'>
    <span className='animate-sweep via-destructive/15 pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent to-transparent' />
    <span className='bg-destructive/15 border-destructive/40 flex size-9 shrink-0 items-center justify-center rounded-full border'>
      <Unplug className='text-destructive size-4' />
    </span>
    <div className='flex flex-col gap-1'>
      <span className='text-destructive font-mono text-[10px] tracking-widest uppercase'>Connection blocked</span>
      <span className='text-sm leading-snug'>{reason}</span>
    </div>
  </div>
);
