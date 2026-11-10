import { FC } from 'react';
import { useSearch } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

import { buildGoogleSignInUrl } from '../utils/build-google-sign-in-url';

import { GoogleIcon } from './google-icon';

import { Button } from '@/shared/components/ui/button';

export const GoogleSignInButton: FC = () => {
  const { returnTo } = useSearch({ from: '/login' });

  return (
    <Button
      asChild
      size='lg'
      className='border-beam animate-in fade-in slide-in-from-bottom-4 fill-mode-both group bg-background/70 text-foreground hover:bg-background/90 shadow-primary/40 mt-10 h-12 gap-3 rounded-full px-6 shadow-[0_0_40px] backdrop-blur delay-500 duration-700'>
      <a href={buildGoogleSignInUrl(returnTo ?? '/')}>
        <GoogleIcon className='size-4' />
        Continue with Google
        <ArrowRight className='transition-transform group-hover:translate-x-1' />
      </a>
    </Button>
  );
};
