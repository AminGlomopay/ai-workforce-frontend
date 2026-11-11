import { describe, expect, it } from 'vitest';

import { findNodeNameIssue } from './find-node-name-issue';

describe('findNodeNameIssue', () => {
  it('accepts a name no other node uses', () => {
    expect(findNodeNameIssue('Pick Tags', ['Manual Trigger', 'Slack'])).toBeUndefined();
  });

  it('rejects an empty name', () => {
    expect(findNodeNameIssue('', ['Slack'])).toBe("A node name can't be empty. Name unchanged.");
  });

  it('rejects a name another node uses, compared exactly', () => {
    expect(findNodeNameIssue('Slack', ['Slack'])).toBe('Another node is already named "Slack". Name unchanged.');
    expect(findNodeNameIssue('slack', ['Slack'])).toBeUndefined();
  });
});
