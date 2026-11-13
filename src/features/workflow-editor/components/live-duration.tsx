import { FC } from 'react';

import { useNow } from '../hooks/use-now';
import { formatDuration } from '../utils/format-duration';

interface LiveDurationProps {
  from: string;
  to: string | null;
}

// Counts up while `to` is unknown, so a running run shows how long it has been going.
export const LiveDuration: FC<LiveDurationProps> = ({ from, to }) => {
  const now = useNow(to === null);

  return <span className='tabular-nums'>{formatDuration((to === null ? now : Date.parse(to)) - Date.parse(from))}</span>;
};
