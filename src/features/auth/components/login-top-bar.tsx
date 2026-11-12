import { FC } from 'react';

import { FanOutIcon } from '@/shared/components/public';

export const LoginTopBar: FC = () => (
  <header className='relative flex items-center justify-between px-4'>
    <span className='flex items-center gap-2 font-mono text-xs font-semibold'>
      <FanOutIcon className='text-primary-soft size-4' />
      ai-workforce
    </span>
    <span className='text-muted-foreground flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase'>
      <span className='bg-primary-soft size-1.5 animate-pulse rounded-full' />
      Awaiting sign-in
    </span>
  </header>
);
