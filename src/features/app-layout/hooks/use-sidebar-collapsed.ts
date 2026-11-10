import { useState } from 'react';

import { SIDEBAR_COLLAPSED_STORAGE_KEY } from '../constants/app-layout.constants';

export const useSidebarCollapsed = () => {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true');

  const toggleCollapsed = () => {
    localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(!collapsed));
    setCollapsed(!collapsed);
  };

  return { collapsed, toggleCollapsed };
};
