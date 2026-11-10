import { FC } from 'react';

import { SIDEBAR_LABEL_CLASS } from '../constants/app-layout.constants';

import { FanOutIcon } from '@/shared/components/public';

export const SidebarBrand: FC = () => (
  <div className='flex items-center gap-2 px-2'>
    <span className='bg-secondary text-primary-soft flex size-6 shrink-0 items-center justify-center rounded-md border'>
      <FanOutIcon className='size-3.5' />
    </span>
    <span className={`font-mono text-xs font-semibold ${SIDEBAR_LABEL_CLASS}`}>ai-workforce</span>
  </div>
);
