import { FunctionComponent } from 'react';
import { useUser } from '@/lib/auth';
import { GuestNavBar } from './navbar/guest-nav';
import { AuthNavBar } from './navbar/auth-nav';

export const Navbar: FunctionComponent = () => {
  const user = useUser();
  console.log(user);
  if (user.data) return <AuthNavBar />;
  return <GuestNavBar />;
};
