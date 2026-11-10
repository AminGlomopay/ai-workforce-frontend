import { FC } from 'react';

interface EmptyOutputProps {
  label: string;
  message: string;
}

export const EmptyOutput: FC<EmptyOutputProps> = ({ label, message }) => (
  <section className='flex flex-col gap-1.5'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <span className='text-muted-foreground/70 rounded-lg border border-dashed px-3 py-2 font-mono text-[10px] tracking-widest uppercase'>
      {message}
    </span>
  </section>
);
