import { FC, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { JsonValue } from './json-value';
import { JSON_EXPANDED_DEPTH } from '../constants/workflow-editor.constants';
import { isJsonContainer, toJsonEntries, toJsonPreview } from '../utils/json-tree';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

interface JsonNodeProps {
  name: string;
  value: unknown;
  depth: number;
}

// Children render only once expanded, so a long list of large items costs one row per item.
export const JsonNode: FC<JsonNodeProps> = ({ name, value, depth }) => {
  const [isExpanded, setIsExpanded] = useState(depth < JSON_EXPANDED_DEPTH);

  if (!isJsonContainer(value))
    return (
      <div className='flex gap-2 py-0.5 pr-1 pl-5.5'>
        <span className='text-primary-soft/80 shrink-0'>{name}</span>
        <JsonValue value={value} />
      </div>
    );

  return (
    <div>
      <Button
        variant='ghost'
        aria-expanded={isExpanded}
        className='h-auto w-full justify-start gap-1.5 rounded-sm px-1 py-0.5 text-[11px] font-normal'
        onClick={() => setIsExpanded(!isExpanded)}>
        <ChevronRight className={cn('text-muted-foreground size-3 transition-transform', isExpanded && 'rotate-90')} />
        <span className='text-primary-soft/80'>{name}</span>
        <span className='text-muted-foreground min-w-0 truncate'>{isExpanded && !Array.isArray(value) ? '' : toJsonPreview(value)}</span>
      </Button>
      {isExpanded && (
        <div className='border-primary-soft/15 ml-2.5 border-l pl-1'>
          {toJsonEntries(value).map(([key, child]) => (
            <JsonNode key={key} name={key} value={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
