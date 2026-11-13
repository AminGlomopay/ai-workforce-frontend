import { useEffect, useState } from 'react';

import { LIVE_CLOCK_INTERVAL } from '../constants/workflow-editor.constants';

// Ticks only while something on screen is still running; otherwise holds the time it last ticked.
export const useNow = (isLive: boolean): number => {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => setNow(Date.now()), LIVE_CLOCK_INTERVAL);
    return () => clearInterval(interval);
  }, [isLive]);

  return now;
};
