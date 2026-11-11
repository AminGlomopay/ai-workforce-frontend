export const isSaveShortcut = (event: Pick<KeyboardEvent, 'metaKey' | 'ctrlKey' | 'key'>): boolean =>
  (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's';
