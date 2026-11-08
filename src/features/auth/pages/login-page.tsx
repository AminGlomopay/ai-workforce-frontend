import { FC } from 'react';

import { LoginBackdrop } from '../components/login-backdrop';
import { LoginTopBar } from '../components/login-top-bar';
import { AuthEmblem } from '../components/auth-emblem';
import { LoginHero } from '../components/login-hero';
import { GoogleSignInButton } from '../components/google-sign-in-button';
import { LoginFootnote } from '../components/login-footnote';

import { CornerMarks } from '@/shared/components/public';

export const LoginPage: FC = () => (
  <main className='bg-grid-glow relative flex min-h-dvh flex-col overflow-hidden p-8'>
    <LoginBackdrop />
    <CornerMarks />
    <LoginTopBar />
    <section className='flex flex-1 flex-col items-center justify-center text-center'>
      <AuthEmblem />
      <LoginHero />
      <GoogleSignInButton />
      <LoginFootnote />
    </section>
  </main>
);
