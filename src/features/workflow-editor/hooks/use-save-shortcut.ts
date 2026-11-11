import { useEffect, useEffectEvent } from 'react';

import { isSaveShortcut } from '../utils/is-save-shortcut';

export const useSaveShortcut = (onSave: () => void) => {
  const handleSave = useEffectEvent(onSave);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isSaveShortcut(event)) return;
      event.preventDefault();
      handleSave();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
};
