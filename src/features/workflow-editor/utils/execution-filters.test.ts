import { describe, expect, it } from 'vitest';

import { hasActiveFilters, parseExecutionFilters, toExecutionsSearchParams } from './execution-filters';

describe('parseExecutionFilters', () => {
  it('keeps known values and defaults the rest', () => {
    expect(parseExecutionFilters({ status: 'failed', mode: 'bogus', window: 7 })).toEqual({ status: 'failed', mode: 'all', window: 'all' });
  });

  it('ignores inherited object keys', () => {
    expect(parseExecutionFilters({ status: 'toString' }).status).toBe('all');
  });
});

describe('hasActiveFilters', () => {
  it('is false only for the defaults', () => {
    expect(hasActiveFilters({ status: 'all', mode: 'all', window: 'all' })).toBe(false);
    expect(hasActiveFilters({ status: 'all', mode: 'manual', window: 'all' })).toBe(true);
  });
});

describe('toExecutionsSearchParams', () => {
  const now = Date.parse('2026-11-13T06:00:00.000Z');

  it('sends only the page size for the defaults', () => {
    expect(toExecutionsSearchParams({ status: 'all', mode: 'all', window: 'all' }, null, now).toString()).toBe('limit=20');
  });

  it('repeats status and mode, and turns the window into createdAfter', () => {
    const params = toExecutionsSearchParams({ status: 'failed', mode: 'schedule', window: '24h' }, 'abc', now);
    expect(params.getAll('status')).toEqual(['FAILED', 'CRASHED']);
    expect(params.getAll('mode')).toEqual(['SCHEDULE']);
    expect(params.get('createdAfter')).toBe('2026-11-12T06:00:00.000Z');
    expect(params.get('cursor')).toBe('abc');
  });
});
