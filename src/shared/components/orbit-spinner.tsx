import { FC } from 'react';

export const OrbitSpinner: FC = () => (
  <span aria-hidden className='relative size-3.5'>
    <span className='absolute inset-0 rounded-full border border-white/25' />
    <span className='absolute inset-0 animate-spin'>
      <span className='shadow-primary-soft absolute -top-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_6px]' />
    </span>
    <span className='animate-breathe absolute inset-1 rounded-full bg-white/70' />
  </span>
);
