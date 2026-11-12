import {
  JSON_NAME_KEY_PATTERN,
  JSON_PREVIEW_ENTRIES,
  JSON_PREVIEW_VALUE_MAX_CHARS,
  JSON_TEXT_MAX_CHARS,
  JSON_TEXT_MAX_LINES,
} from '../constants/workflow-editor.constants';

export type JsonContainer = Record<string, unknown> | unknown[];

export const isJsonContainer = (value: unknown): value is JsonContainer => typeof value === 'object' && value !== null;

// Scalars come first so totals such as a count stay above a long list.
export const toJsonEntries = (value: JsonContainer): [string, unknown][] => {
  if (Array.isArray(value)) return value.map((item, index) => [String(index), item]);
  const entries = Object.entries(value);
  return [...entries.filter(([, child]) => !isJsonContainer(child)), ...entries.filter(([, child]) => isJsonContainer(child))];
};

const toPreviewValue = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.length}]`;
  if (isJsonContainer(value)) return '{…}';
  const json = JSON.stringify(value);
  return json.length > JSON_PREVIEW_VALUE_MAX_CHARS ? `${json.slice(0, JSON_PREVIEW_VALUE_MAX_CHARS)}…` : json;
};

export const toJsonPreview = (value: JsonContainer): string => {
  if (Array.isArray(value)) return `[${value.length}]`;
  const entries = Object.entries(value);
  const shown = [...entries.filter(([key]) => JSON_NAME_KEY_PATTERN.test(key)), ...entries.filter(([key]) => !JSON_NAME_KEY_PATTERN.test(key))]
    .slice(0, JSON_PREVIEW_ENTRIES)
    .map(([key, child]) => `${key}: ${toPreviewValue(child)}`);
  return `{ ${[...shown, ...(entries.length > shown.length ? ['…'] : [])].join(', ')} }`;
};

// Returns the text unchanged when it is short enough to show in full.
export const truncateText = (text: string): string => {
  const lines = text.split('\n');
  if (lines.length <= JSON_TEXT_MAX_LINES && text.length <= JSON_TEXT_MAX_CHARS) return text;
  return lines.slice(0, JSON_TEXT_MAX_LINES).join('\n').slice(0, JSON_TEXT_MAX_CHARS);
};
