import { FC } from 'react';

export const ProgressScanLine: FC = () => (
  <span className='pointer-events-none absolute inset-x-0 -bottom-px h-px overflow-hidden'>
    <span className='animate-indeterminate via-primary-soft block h-full w-1/4 bg-linear-to-r from-transparent to-transparent shadow-[0_0_8px_var(--primary-soft)]' />
  </span>
);
