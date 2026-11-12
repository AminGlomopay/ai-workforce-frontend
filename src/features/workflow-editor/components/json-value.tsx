import { FC, useState } from 'react';

import { truncateText } from '../utils/json-tree';

import { Button } from '@/shared/components/ui/button';

interface JsonValueProps {
  value: unknown;
}

// Text keeps its line breaks, so a patch or an agent's reply reads as written; long text starts cut short.
export const JsonValue: FC<JsonValueProps> = ({ value }) => {
  const [isFull, setIsFull] = useState(false);
  if (typeof value !== 'string') return <span className='text-primary-soft'>{String(value)}</span>;

  const truncated = truncateText(value);
  const isTruncated = truncated !== value;

  return (
    <span className='flex min-w-0 flex-col items-start'>
      <span className='wrap-anywhere whitespace-pre-wrap'>"{isFull || !isTruncated ? value : `${truncated}…`}"</span>
      {isTruncated && (
        <Button
          variant='link'
          className='text-primary-soft h-auto p-0 font-mono text-[10px] tracking-widest uppercase'
          onClick={() => setIsFull(!isFull)}>
          {isFull ? 'Show less' : `Show all · ${value.length.toLocaleString()} chars`}
        </Button>
      )}
    </span>
  );
};
