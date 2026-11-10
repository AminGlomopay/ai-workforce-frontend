import { describe, expect, it } from 'vitest';

import { isPropertyVisible } from './is-property-visible';
import { withDefaultParameters } from './node-parameters';
import { NodeProperty } from '../types/workflow-editor.types';

const textProperty = (displayOptions?: NodeProperty['displayOptions']): NodeProperty => ({
  name: 'target',
  displayName: 'Target',
  type: 'string',
  default: '',
  displayOptions,
});

describe('isPropertyVisible', () => {
  it('shows a property without displayOptions', () => {
    expect(isPropertyVisible(textProperty(), {})).toBe(true);
  });

  it('shows a property when its single key matches', () => {
    const property = textProperty({ show: { sendTo: ['channel'] } });

    expect(isPropertyVisible(property, { sendTo: 'channel' })).toBe(true);
    expect(isPropertyVisible(property, { sendTo: 'user' })).toBe(false);
  });

  it('requires every key to match', () => {
    const property = textProperty({ show: { sendTo: ['channel'], operation: ['sendMessage'] } });

    expect(isPropertyVisible(property, { sendTo: 'channel', operation: 'sendMessage' })).toBe(true);
    expect(isPropertyVisible(property, { sendTo: 'channel', operation: 'update' })).toBe(false);
    expect(isPropertyVisible(property, { sendTo: 'user', operation: 'sendMessage' })).toBe(false);
  });

  it('accepts any of the listed values for a key', () => {
    const property = textProperty({ show: { sendTo: ['channel', 'user'] } });

    expect(isPropertyVisible(property, { sendTo: 'channel' })).toBe(true);
    expect(isPropertyVisible(property, { sendTo: 'user' })).toBe(true);
    expect(isPropertyVisible(property, { sendTo: 'group' })).toBe(false);
  });

  it('falls back to the controlling property default when its value is missing', () => {
    const sendTo: NodeProperty = {
      name: 'sendTo',
      displayName: 'Send To',
      type: 'options',
      default: 'channel',
      options: [
        { name: 'Channel', value: 'channel' },
        { name: 'User', value: 'user' },
      ],
    };
    const channelId = { ...textProperty({ show: { sendTo: ['channel'] } }), name: 'channelId' };
    const userEmail = { ...textProperty({ show: { sendTo: ['user'] } }), name: 'userEmail' };
    const parameters = withDefaultParameters([sendTo, channelId, userEmail], {});

    expect(isPropertyVisible(channelId, parameters)).toBe(true);
    expect(isPropertyVisible(userEmail, parameters)).toBe(false);
  });
});
