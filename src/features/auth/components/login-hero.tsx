import { FC } from 'react';

export const LoginHero: FC = () => (
  <div className='animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-8 flex flex-col items-center delay-200 duration-700'>
    <span className='text-muted-foreground font-mono text-[10px] tracking-[0.3em] uppercase'>Authentication required</span>
    <h1 className='mt-4 text-5xl font-semibold tracking-tight'>
      Your agents are
      <br />
      <span className='from-primary-soft to-primary bg-linear-to-r via-white bg-clip-text text-transparent'>standing by.</span>
    </h1>
    <p className='text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed'>
      Sign in with your Glomo Google Workspace account to wire events into prompts.
    </p>
  </div>
);
