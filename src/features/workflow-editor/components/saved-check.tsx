import { FC } from 'react';

export const SavedCheck: FC = () => (
  <span className='relative flex size-9 shrink-0 items-center justify-center'>
    <span className='border-primary-soft animate-ring-burst absolute inset-0 rounded-full border' />
    <span className='bg-primary/20 border-primary-soft/50 shadow-primary/60 absolute inset-0 rounded-full border shadow-[0_0_18px]' />
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='text-primary-soft relative size-4 drop-shadow-[0_0_6px_var(--primary-soft)]'>
      <path d='M5 12.5l4.5 4.5L19 7.5' pathLength='1' strokeDasharray='1' className='animate-draw' />
    </svg>
  </span>
);
