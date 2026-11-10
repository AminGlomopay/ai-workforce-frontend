import { FC } from 'react';

export const ButtonSheen: FC = () => (
  <span aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]'>
    <span className='animate-sheen absolute inset-y-0 -left-1/2 w-1/2 -skew-x-20 bg-linear-to-r from-transparent via-white/50 to-transparent' />
  </span>
);
