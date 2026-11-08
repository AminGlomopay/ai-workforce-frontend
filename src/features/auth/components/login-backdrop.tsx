import { FC } from 'react';

export const LoginBackdrop: FC = () => (
  <div aria-hidden className='pointer-events-none absolute inset-0'>
    <div className='animate-aurora bg-primary/25 absolute top-1/4 left-1/3 size-[36rem] rounded-full blur-[120px]' />
    <div className='animate-scan via-primary-soft/40 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent' />
  </div>
);
