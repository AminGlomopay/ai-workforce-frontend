import { describe, expect, it } from 'vitest';

import { toReadableJson } from './to-readable-json';

describe('toReadableJson', () => {
  it('shows newlines in strings as line breaks', () => {
    expect(toReadableJson({ text: '# Title\n\n- item' })).toBe('{\n  "text": "# Title\n\n- item"\n}');
  });

  it('keeps other escapes, including an escaped backslash before n', () => {
    expect(toReadableJson({ text: 'C:\\new "quoted"\t' })).toBe('{\n  "text": "C:\\\\new \\"quoted\\"\\t"\n}');
  });
});
