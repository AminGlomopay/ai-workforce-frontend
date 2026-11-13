import { FC, useEffect, useEffectEvent, useRef } from 'react';

interface HistoryEndSentinelProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onReached: () => void;
}

// Loads the next page as the bottom of the list scrolls into view.
export const HistoryEndSentinel: FC<HistoryEndSentinelProps> = ({ hasNextPage, isFetchingNextPage, onReached }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onVisible = useEffectEvent(onReached);

  useEffect(() => {
    const element = ref.current;
    if (!element || !hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && onVisible());
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <div ref={ref} className='text-muted-foreground/70 flex items-center gap-3 px-3 py-5 font-mono text-[10px] tracking-widest uppercase'>
      <span className='h-px flex-1 bg-linear-to-r from-transparent to-current/30' />
      {hasNextPage ? (
        <span className='flex animate-pulse items-center gap-2'>
          <span className='bg-primary-soft size-1.5 rounded-full' />
          Loading older runs
        </span>
      ) : (
        'End of history'
      )}
      <span className='h-px flex-1 bg-linear-to-l from-transparent to-current/30' />
    </div>
  );
};
