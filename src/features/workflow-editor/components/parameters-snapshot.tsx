import { FC } from 'react';

interface ParametersSnapshotProps {
  entries: [label: string, value: string][];
}

export const ParametersSnapshot: FC<ParametersSnapshotProps> = ({ entries }) => (
  <section className='flex flex-col gap-1.5'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>Parameters at run time</span>
    {entries.length ? (
      <dl className='bg-background/60 flex flex-col divide-y rounded-lg border'>
        {entries.map(([label, value]) => (
          <div key={label} className='flex flex-col gap-0.5 px-3 py-2'>
            <dt className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</dt>
            <dd className='font-mono text-[11px] break-all whitespace-pre-wrap'>{value || '—'}</dd>
          </div>
        ))}
      </dl>
    ) : (
      <span className='text-muted-foreground/70 rounded-lg border border-dashed px-3 py-2 font-mono text-[10px] tracking-widest uppercase'>
        No parameters
      </span>
    )}
  </section>
);
