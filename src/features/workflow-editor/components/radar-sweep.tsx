import { FC } from 'react';
import { History } from 'lucide-react';

const SIZE = 224;
const CENTER = SIZE / 2;
const RING_RADII = [38, 70, 104];

export const RadarSweep: FC = () => (
  <div className='relative flex items-center justify-center' style={{ width: SIZE, height: SIZE }}>
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className='absolute inset-0' aria-hidden>
      {RING_RADII.map((radius) => (
        <circle key={radius} cx={CENTER} cy={CENTER} r={radius} className='stroke-primary-soft/20 fill-none' strokeDasharray='2 4' />
      ))}
      <line x1={CENTER} y1={0} x2={CENTER} y2={SIZE} className='stroke-primary-soft/10' />
      <line x1={0} y1={CENTER} x2={SIZE} y2={CENTER} className='stroke-primary-soft/10' />
    </svg>
    <span className='absolute inset-2 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_72%,var(--primary-soft))] opacity-30 [animation-duration:4s]' />
    <span className='bg-primary/30 animate-breathe absolute size-20 rounded-full blur-xl' />
    <span className='bg-background border-primary-soft/40 shadow-primary/50 relative flex size-14 items-center justify-center rounded-full border shadow-[0_0_28px]'>
      <History className='text-primary-soft size-6 drop-shadow-[0_0_10px_var(--primary)]' />
    </span>
  </div>
);
