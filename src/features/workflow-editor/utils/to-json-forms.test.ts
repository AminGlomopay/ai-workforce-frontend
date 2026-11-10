import { describe, expect, it } from 'vitest';

import { toJsonForms } from './to-json-forms';
import { NodeProperty, WorkflowNodeType } from '../types/workflow-editor.types';

const nodeType = (properties: NodeProperty[]): WorkflowNodeType => ({
  type: 'example',
  version: 1,
  displayName: 'Example',
  description: 'Example node',
  group: 'action',
  icon: 'box',
  defaults: { name: 'Example' },
  inputs: [{ kind: 'main' }],
  outputs: [{ kind: 'main' }],
  properties,
});

describe('toJsonForms', () => {
  it('maps a string property to a string schema and an unconditional control', () => {
    const { schema, uischema } = toJsonForms(
      nodeType([{ name: 'text', displayName: 'Text', type: 'string', default: '', description: 'Message body', placeholder: 'Hello' }]),
    );

    expect(schema).toEqual({
      type: 'object',
      properties: { text: { type: 'string', title: 'Text', description: 'Message body', default: '' } },
      required: [],
    });
    expect(uischema).toEqual({
      type: 'VerticalLayout',
      elements: [{ type: 'Control', scope: '#/properties/text', options: { placeholder: 'Hello' } }],
    });
  });

  it('marks multiline strings with multi and rows', () => {
    const { uischema } = toJsonForms(nodeType([{ name: 'text', displayName: 'Text', type: 'string', default: '', typeOptions: { rows: 4 } }]));

    expect(uischema.elements[0].options).toEqual({ placeholder: undefined, multi: true, rows: 4 });
  });

  it('maps an options property to a oneOf string schema', () => {
    const { schema } = toJsonForms(
      nodeType([
        {
          name: 'sendTo',
          displayName: 'Send To',
          type: 'options',
          default: 'channel',
          options: [
            { name: 'Channel', value: 'channel', description: 'A public or private channel' },
            { name: 'User', value: 'user' },
          ],
        },
      ]),
    );

    expect(schema.properties?.sendTo).toEqual({
      type: 'string',
      title: 'Send To',
      default: 'channel',
      oneOf: [
        { const: 'channel', title: 'Channel', description: 'A public or private channel' },
        { const: 'user', title: 'User' },
      ],
    });
  });

  it('requires an always-visible required property outright', () => {
    const { schema } = toJsonForms(nodeType([{ name: 'text', displayName: 'Text', type: 'string', default: '', required: true }]));

    expect(schema.required).toEqual(['text']);
    expect(schema.allOf).toBeUndefined();
  });

  it('turns displayOptions into a SHOW rule and a conditional requirement', () => {
    const show = { sendTo: ['channel'], operation: ['sendMessage', 'update'] };
    const condition = {
      properties: { sendTo: { enum: ['channel'] }, operation: { enum: ['sendMessage', 'update'] } },
      required: ['sendTo', 'operation'],
    };
    const { schema, uischema } = toJsonForms(
      nodeType([{ name: 'channelId', displayName: 'Channel ID', type: 'string', default: '', required: true, displayOptions: { show } }]),
    );

    expect(schema.required).toEqual([]);
    expect(schema.allOf).toEqual([{ if: condition, then: { required: ['channelId'] } }]);
    expect(uischema.elements[0].rule).toEqual({ effect: 'SHOW', condition: { scope: '#', schema: condition } });
  });

  it('keeps the description order of properties', () => {
    const { uischema } = toJsonForms(
      nodeType([
        { name: 'b', displayName: 'B', type: 'string', default: '' },
        { name: 'a', displayName: 'A', type: 'string', default: '' },
      ]),
    );

    expect(uischema.elements.map((element) => (element as { scope: string }).scope)).toEqual(['#/properties/b', '#/properties/a']);
  });
});
