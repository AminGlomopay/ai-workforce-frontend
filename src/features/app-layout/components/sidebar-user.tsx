import { FC } from 'react';
import { LogOut } from 'lucide-react';

import { useCurrentUser, useLogout } from '@/features/auth/public';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';

export const SidebarUser: FC = () => {
  const user = useCurrentUser();
  const logout = useLogout();

  return (
    <div className='flex items-center gap-2 border-t px-2 pt-4'>
      <Avatar className='size-7 border'>
        <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
        <AvatarFallback className='text-xs'>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className='flex flex-1 flex-col'>
        <span className='text-xs font-medium'>{user.name}</span>
        <span className='text-muted-foreground font-mono text-[10px]'>Signed in with Google</span>
      </div>
      <Button variant='ghost' size='icon-xs' aria-label='Sign out' onClick={logout}>
        <LogOut />
      </Button>
    </div>
  );
};
