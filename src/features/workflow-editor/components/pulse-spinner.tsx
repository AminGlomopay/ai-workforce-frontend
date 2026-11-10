import { FC } from 'react';

export const PulseSpinner: FC = () => (
  <span className='relative flex size-4 items-center justify-center'>
    <span className='absolute inset-0 animate-spin rounded-full border-2 border-white/20 border-t-white' />
    <span className='animate-spin-fast border-primary-soft absolute inset-[3px] rounded-full border border-b-transparent border-l-transparent' />
    <span className='size-1 animate-pulse rounded-full bg-white' />
  </span>
);
