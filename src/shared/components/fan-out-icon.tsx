import { FC, SVGProps } from 'react';

export const FanOutIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox='0 0 16 16' fill='none' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' {...props}>
    <circle cx='3' cy='8' r='1.75' fill='currentColor' stroke='none' />
    <path d='M5 8h3M8 8l5-4.5M8 8l5 4.5' />
  </svg>
);
