import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  Folder,
  Home,
  User2,
  ChevronDownIcon,
  BookUser,
  University,
  ClipboardCheck,
  Layers,
} from 'lucide-react';

import { useAuthorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

import { cn } from '@/helpers/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../dropdown';
import Button from '../../button';
import { useLogout } from '@/lib/auth';
import { Logo } from '../../logo';
import { paths } from '@/config/paths';
import { useCategories } from '@/features/category/api/get-categories';

type SideNavigationItem = {
  name: string;
  to: string;
  dropdown?: { name: string; to: string }[];
  icon?: React.ElementType;
};

export const AuthNavBar: React.FC = () => {
  const { checkAccess } = useAuthorization();
  const navigate = useNavigate();
  const categories = useCategories({});
  const logout = useLogout();
  const isAdmin = checkAccess({ allowedRoles: [ROLES.ADMIN] });
  const isOr = checkAccess({ allowedRoles: [ROLES.OR] });

  const generalNavigation: SideNavigationItem[] = [
    { name: 'Trang chủ', to: paths.home.path },
    { name: 'Chiến Dịch Gây Quỹ', to: paths.campaigns.path },
    {
      name: 'Hoàn Cảnh Gây Quỹ',
      to: './',
      dropdown: categories?.data?.map((category) => ({
        name: category.name,
        to: paths.campaignCategories.getHref(category.id),
      })),
    },
    { name: 'Về chúng tôi', to: paths.aboutUs.path },
  ];

  const dashboardNavigation: SideNavigationItem[] = [
    { name: 'Thống kê', to: '/app', icon: Home },
    { name: 'Chiến dịch', to: paths.app.campaigns.path, icon: Folder },
    { name: 'Thế loại', to: paths.app.category.path, icon: Layers },
    { name: 'Người nhận', to: paths.app.recipient.path, icon: BookUser },
    { name: 'Trường học', to: paths.app.education.path, icon: University },
    {
      name: 'Báo cáo tài chính',
      to: paths.app.financialReport.path,
      icon: ClipboardCheck,
    },
    { name: 'Tài khoản', to: './app/users', icon: User2 },
  ];

  return (
    <nav
      className={cn(
        'flex justify-between items-center gap-4',
        isAdmin || isOr ? 'flex-col w-full' : 'flex-row',
      )}
    >
      <Logo />
      {!isAdmin && !isOr ? (
        <div className="md:flex flex-row gap-4 bg-primary rounded-2xl p-2 hidden">
          {generalNavigation.map((item) =>
            !item.dropdown ? (
              <NavLink
                key={item.name}
                to={item.to.startsWith('/') ? item.to : `/${item.to}`}
                end
                className={({ isActive }) =>
                  cn(
                    'text-gray-300 hover:bg-primary-700 hover:text-white',
                    'group flex items-center rounded-xl px-2 py-1 text-base font-semibold',
                    isActive && 'text-white bg-primary-600',
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
                    className="rounded-xl text-gray-300"
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
                onClick={() => navigate(paths.donations.getHref())}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Lịch sử quyên góp
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(paths.donations.getHref())}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Chiến dịch của tôi
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => {
                  logout.mutate();
                  navigate(paths.home.getHref());
                }}
              >
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 p-4 w-full">
          {dashboardNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to.startsWith('/') ? item.to : `/${item.to}`}
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
