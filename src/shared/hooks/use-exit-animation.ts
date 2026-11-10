import { AnimationEvent, useState } from 'react';

// index.css turns animations off under reduced motion, so no animationend would ever arrive.
const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Keeps the last value mounted while its exit animation plays, then lets it unmount.
export const useExitAnimation = <T>(value: T | undefined) => {
  const [lastValue, setLastValue] = useState(value);
  if (value !== undefined && value !== lastValue) setLastValue(value);
  const isExiting = value === undefined && lastValue !== undefined;
  if (isExiting && PREFERS_REDUCED_MOTION) setLastValue(undefined);

  const onAnimationEnd = (event: AnimationEvent) => {
    if (isExiting && event.target === event.currentTarget) setLastValue(undefined);
  };

  return { rendered: value ?? lastValue, isExiting, onAnimationEnd };
};
