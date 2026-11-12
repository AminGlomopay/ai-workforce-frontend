import { FC } from 'react';

import { JsonNode } from './json-node';
import { NodeData } from '../types/workflow-execution.types';
import { toJsonEntries } from '../utils/json-tree';

interface JsonBlockProps {
  label: string;
  value: NodeData;
}

export const JsonBlock: FC<JsonBlockProps> = ({ label, value }) => (
  <section className='flex flex-col gap-1.5'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-widest uppercase'>{label}</span>
    <div className='bg-background/60 max-h-112 overflow-auto rounded-lg border p-2 font-mono text-[11px] leading-relaxed'>
      {toJsonEntries(value).map(([key, child]) => (
        <JsonNode key={key} name={key} value={child} depth={0} />
      ))}
    </div>
  </section>
);
