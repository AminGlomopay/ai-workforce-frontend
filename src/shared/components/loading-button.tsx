import { ComponentProps, FC } from 'react';

import { ButtonSheen } from './button-sheen';
import { OrbitSpinner } from './orbit-spinner';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  loading: boolean;
  loadingLabel: string;
}

export const LoadingButton: FC<LoadingButtonProps> = ({ loading, loadingLabel, className, children, ...props }) => (
  <Button {...props} disabled={loading} aria-busy={loading} className={cn(loading && 'border-beam beam-fast disabled:opacity-100', className)}>
    {loading ? (
      <>
        <ButtonSheen />
        <OrbitSpinner />
        <span className='animate-text-shimmer bg-linear-to-r from-white/45 via-white to-white/45 bg-size-[200%_100%] bg-clip-text text-transparent'>
          {loadingLabel}
        </span>
      </>
    ) : (
      children
    )}
  </Button>
);
