import { FC } from 'react';

const CENTER = 140;

export const AuthEmblem: FC = () => (
  <svg viewBox='0 0 280 280' className='animate-in fade-in zoom-in-90 size-64 duration-1000'>
    <defs>
      <radialGradient id='auth-orb' cx='35%' cy='30%'>
        <stop offset='0%' stopColor='white' />
        <stop offset='35%' stopColor='var(--primary-soft)' />
        <stop offset='100%' stopColor='var(--primary)' />
      </radialGradient>
    </defs>
    <circle cx={CENTER} cy={CENTER} r='132' className='fill-primary/5 stroke-primary/25' />
    <circle
      cx={CENTER}
      cy={CENTER}
      r='116'
      fill='none'
      strokeDasharray='1 7'
      className='stroke-primary-soft/50 animate-spin-slow origin-center transform-fill'
    />
    <g className='animate-spin-reverse origin-center transform-fill'>
      <circle cx={CENTER} cy={CENTER} r='92' fill='none' strokeWidth='2' strokeDasharray='90 54.5' className='stroke-primary' />
    </g>
    <g className='origin-center animate-[spin_6s_linear_infinite] transform-fill'>
      <circle cx={CENTER} cy={CENTER} r='104' fill='none' className='stroke-transparent' />
      <circle cx={CENTER + 104} cy={CENTER} r='3' className='fill-foreground drop-shadow-[0_0_6px_var(--primary-soft)]' />
    </g>
    <circle cx={CENTER} cy={CENTER} r='52' className='fill-background stroke-primary/40 drop-shadow-[0_0_24px_var(--primary)]' />
    <circle cx={CENTER} cy={CENTER} r='24' fill='url(#auth-orb)' className='animate-breathe origin-center transform-fill' />
  </svg>
);
