import { describe, expect, it } from 'vitest';

import { formatDuration } from './format-duration';

describe('formatDuration', () => {
  it.each([
    [840, '840 ms'],
    [12_400, '12.4 s'],
    [192_000, '3m 12s'],
    [3_840_000, '1h 4m'],
  ])('formats %d ms as %s', (ms, expected) => {
    expect(formatDuration(ms)).toBe(expected);
  });
});
