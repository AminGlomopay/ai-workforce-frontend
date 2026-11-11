import { FC } from 'react';
import { Radio } from 'lucide-react';

import { PulseSpinner } from '@/shared/components/public';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

interface PublishButtonProps {
  disabled: boolean;
  isPublishing: boolean;
  onClick: () => void;
}

export const PublishButton: FC<PublishButtonProps> = ({ disabled, isPublishing, onClick }) => (
  <Button
    variant='outline'
    disabled={disabled}
    aria-busy={isPublishing}
    onClick={onClick}
    className={cn('border-primary-soft/40 min-w-28', isPublishing && 'border-beam before:[animation-duration:1.2s] disabled:opacity-100')}>
    {isPublishing ? (
      <>
        <PulseSpinner />
        Publishing…
      </>
    ) : (
      <>
        <Radio className='text-primary-soft' />
        Publish
      </>
    )}
  </Button>
);
