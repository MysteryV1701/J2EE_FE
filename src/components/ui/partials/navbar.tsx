import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Folder, Home, User2 } from 'lucide-react';
import { useAuthorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

import { cn } from '@/helpers/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown';
import Button from '../button';
import { useLogout } from '@/lib/auth';
import { Logo } from '../logo';

type SideNavigationItem = {
  name: string;
  to: string;
  icon?: React.ElementType;
};

export const Navbar: React.FC = () => {
  const { checkAccess } = useAuthorization();
  const navigate = useNavigate();
  const logout = useLogout();

  // Determine user status: guest, user, or admin
  const isAdmin = checkAccess({ allowedRoles: [ROLES.ADMIN] });
  const isUser = checkAccess({ allowedRoles: [ROLES.USER] });
  const userStatus = isAdmin ? 'admin' : isUser ? 'user' : 'guest';

  const generalNavigation: SideNavigationItem[] = [
    { name: 'Trang chủ', to: '.' },
    { name: 'Chiến Dịch Gây Quỹ', to: './campaign' },
    { name: 'Hoàn Cảnh Gây Quỹ', to: './' },
    { name: 'Về chúng tôi', to: './aboutus' },
  ];

  const dashboardNavigation: SideNavigationItem[] = [
    { name: 'Dashboard', to: '.', icon: Home },
    { name: 'Discussions', to: './discussions', icon: Folder },
  ];

  return (
    <nav
      className={cn(
        'flex justify-between items-center gap-4',
        isAdmin ? 'flex-col' : 'flex-row',
      )}
    >
      <Logo />
      {!isAdmin ? (
        <div className="md:flex flex-row gap-4 bg-primary rounded-2xl p-2 hidden">
          {generalNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex items-center rounded-xl px-2 py-1 text-base font-semibold',
                  isActive && 'text-white',
                )
              }
            >
              {item.name}
            </NavLink>
          ))}

          {userStatus === 'guest' ? (
            <Button
              buttonVariant="filled"
              buttonStyled={{
                color: 'primary',
                hPadding: 'md',
                vPadding: 'sm',
              }}
              className="rounded-xl"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  buttonVariant="outlined"
                  rightIcon={
                    <User2 className="size-6 rounded-full text-gray-200" />
                  }
                  className="overflow-hidden rounded-full hover:ring-none ring-none"
                >
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" color="bg-gray-200">
                <DropdownMenuItem
                  onClick={() => navigate('./profile')}
                  className={cn('block px-4 py-2 text-sm text-gray-700')}
                >
                  Your Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                  onClick={() => logout.mutate({})}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ) : (
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {dashboardNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.name !== 'Discussions'}
              className={({ isActive }) =>
                cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                  isActive && 'bg-gray-900 text-white',
                )
              }
            >
              {item.icon && (
                <item.icon
                  className={cn(
                    'text-gray-400 group-hover:text-gray-300',
                    'mr-4 size-6 shrink-0',
                  )}
                  aria-hidden="true"
                />
              )}
              {item.name}
            </NavLink>
          ))}
        </nav>
      )}
    </nav>
  );
};
