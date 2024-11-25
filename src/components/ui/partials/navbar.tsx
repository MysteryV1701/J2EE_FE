import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Folder, Home, User2, ChevronDownIcon } from 'lucide-react';
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
  dropdown?: { name: string; to: string }[];
  icon?: React.ElementType;
};

export const Navbar: React.FC = () => {
  const { checkAccess } = useAuthorization();
  const navigate = useNavigate();
  const logout = useLogout();

  const isAdmin = checkAccess({ allowedRoles: [ROLES.ADMIN] });
  const isUser = checkAccess({ allowedRoles: [ROLES.USER] });
  const userStatus = isAdmin ? 'admin' : isUser ? 'user' : 'guest';

  const generalNavigation: SideNavigationItem[] = [
    { name: 'Trang chủ', to: '/' },
    { name: 'Chiến Dịch Gây Quỹ', to: './campaign' },
    {
      name: 'Hoàn Cảnh Gây Quỹ',
      to: './',
      dropdown: [
        { name: 'Trang thiết bị', to: '/campaign/equipment' },
        { name: 'Hoàn cảnh khó khăn', to: '/campaign/dif' },
        { name: 'Học sinh nghèo vượt khó', to: '/campaign/pstudent' },
        { name: 'Học sinh vùng cao', to: '/campaign/other' },
      ],
    },
    { name: 'Về chúng tôi', to: './about-us' },
  ];

  const dashboardNavigation: SideNavigationItem[] = [
    { name: 'Dashboard', to: '/app', icon: Home },
    { name: 'Campaign', to: './campaign', icon: Folder },
  ];

  return (
    <nav
      className={cn(
        'flex justify-between items-center gap-4',
        isAdmin ? 'flex-col w-full' : 'flex-row',
      )}
    >
      <Logo />
      {!isAdmin ? (
        <div className="md:flex flex-row gap-4 bg-primary rounded-2xl p-2 hidden">
          {generalNavigation.map((item) =>
            !item.dropdown ? (
              <NavLink
                key={item.name}
                to={item.to}
                end
                className={({ isActive }) =>
                  cn(
                    'text-gray-300 hover:bg-primary-700 hover:text-white',
                    'group flex items-center rounded-xl px-2 py-1 text-base font-semibold',
                    isActive && 'text-white',
                  )
                }
              >
                {item.name}
              </NavLink>
            ) : (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    buttonVariant="filled"
                    buttonStyled={{
                      color: 'primary',
                      hPadding: 'md',
                      vPadding: 'sm',
                    }}
                    className="rounded-xl"
                  >
                    {item.name}
                    <ChevronDownIcon className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" color="bg-gray-200">
                  {item.dropdown.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.name}
                      onClick={() => navigate(subItem.to)}
                      className={cn(
                        'block px-4 py-2 text-sm text-gray-700 hover:bg-primary-300 rounded-md',
                      )}
                    >
                      {subItem.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          )}

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
        <div className="flex flex-col items-center gap-2 p-4 w-full">
          {dashboardNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.name !== 'Discussions'}
              className={({ isActive }) =>
                cn(
                  'text-gray-300 hover:bg-primary-700 hover:text-white',
                  'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium transition duration-200 ease-in-out',
                  isActive && 'bg-primary-800 text-white',
                )
              }
            >
              {item.icon && (
                <item.icon
                  className={cn(
                    'text-gray-400 group-hover:text-gray-300 transition duration-200 ease-in-out',
                    'mr-4 size-6 shrink-0',
                  )}
                  aria-hidden="true"
                />
              )}
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
