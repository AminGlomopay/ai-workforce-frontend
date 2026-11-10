import { FC } from 'react';

interface JsonBlockProps {
  label: string;
  value: unknown;
}

export const JsonBlock: FC<JsonBlockProps> = ({ label, value }) => (
  <section className='flex flex-col gap-1.5'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <pre className='bg-background/60 max-h-64 overflow-auto rounded-lg border p-3 font-mono text-[11px] leading-relaxed'>
      {JSON.stringify(value, null, 2)}
    </pre>
  </section>
);
