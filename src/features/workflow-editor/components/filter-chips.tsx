import { FC } from 'react';

import { cn } from '@/shared/utils/cn';

interface FilterChipsProps {
  label: string;
  options: Record<string, { label: string }>;
  value: string;
  onChange: (value: string) => void;
}

export const FilterChips: FC<FilterChipsProps> = ({ label, options, value, onChange }) => (
  <div role='radiogroup' aria-label={label} className='flex flex-col gap-1.5'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <div className='flex flex-wrap gap-1'>
      {Object.entries(options).map(([option, { label: optionLabel }]) => (
        <button
          key={option}
          type='button'
          role='radio'
          aria-checked={option === value}
          onClick={() => onChange(option)}
          className={cn(
            'rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase transition-all',
            option === value
              ? 'border-primary-soft/60 bg-primary/20 text-foreground shadow-primary/40 shadow-[0_0_12px]'
              : 'text-muted-foreground hover:border-primary-soft/30 hover:text-foreground',
          )}>
          {optionLabel}
        </button>
      ))}
    </div>
  </div>
);
