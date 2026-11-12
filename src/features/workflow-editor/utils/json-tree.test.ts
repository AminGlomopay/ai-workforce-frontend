import { describe, expect, it } from 'vitest';

import { toJsonEntries, toJsonPreview, truncateText } from './json-tree';

describe('toJsonEntries', () => {
  it('puts scalars before lists and objects', () => {
    expect(toJsonEntries({ files: [], count: 1, author: {}, ok: true })).toEqual([
      ['count', 1],
      ['ok', true],
      ['files', []],
      ['author', {}],
    ]);
  });

  it('keys array items by index', () => {
    expect(toJsonEntries(['a', 'b'])).toEqual([
      ['0', 'a'],
      ['1', 'b'],
    ]);
  });
});

describe('toJsonPreview', () => {
  it('shows an array as its length', () => {
    expect(toJsonPreview([1, 2, 3])).toBe('[3]');
  });

  it('leads with name-like keys and truncates long values', () => {
    const file = { sha: 'bbcd538c8e72b8c175046e27cc8f907076331401', filename: 'config/routes.rb', status: 'modified', additions: 3, patch: '@@' };

    expect(toJsonPreview(file)).toBe('{ filename: "config/routes.rb", sha: "bbcd538c8e72b8c175046e27cc8f907…, status: "modified", additions: 3, … }');
  });

  it('summarises nested values', () => {
    expect(toJsonPreview({ labels: ['a'], user: { login: 'x' } })).toBe('{ labels: [1], user: {…} }');
  });
});

describe('truncateText', () => {
  it('keeps short text', () => {
    expect(truncateText('one\ntwo')).toBe('one\ntwo');
  });

  it('cuts text to its first lines', () => {
    expect(truncateText(Array.from({ length: 10 }, (_, index) => `line ${index}`).join('\n'))).toBe('line 0\nline 1\nline 2\nline 3\nline 4\nline 5');
  });

  it('cuts a long single line', () => {
    expect(truncateText('x'.repeat(1000))).toHaveLength(400);
  });
});
