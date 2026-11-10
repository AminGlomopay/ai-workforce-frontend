import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

interface RunPickerProps {
  label: string;
  index: number;
  count: number;
  onChange: (index: number) => void;
}

export const RunPicker: FC<RunPickerProps> = ({ label, index, count, onChange }) => (
  <div className='border-primary-soft/25 bg-primary/5 flex items-center justify-between rounded-lg border p-1'>
    <Button variant='ghost' size='icon-xs' aria-label='Previous run' disabled={index === 0} onClick={() => onChange(index - 1)}>
      <ChevronLeft />
    </Button>
    <span className='text-primary-soft font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <Button variant='ghost' size='icon-xs' aria-label='Next run' disabled={index === count - 1} onClick={() => onChange(index + 1)}>
      <ChevronRight />
    </Button>
  </div>
);
