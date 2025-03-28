import React, { FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { cn } from '@/helpers/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../dropdown';
import Button from '../../button';
import { Logo } from '../../logo';
import { paths } from '@/config/paths';
import { ChevronDownIcon, PanelLeft } from 'lucide-react';
import { useCategories } from '@/features/category/api/get-categories';
import { Drawer, DrawerContent, DrawerTrigger } from '../../drawer';

type SideNavigationItem = {
  name: string;
  to: string;
  dropdown?: { name: string; to: string }[];
  icon?: React.ElementType;
};

export const GuestNavBar: FunctionComponent = () => {
  const navigate = useNavigate();
  const categories = useCategories({});
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
    { name: 'Đăng nhập', to: paths.auth.login.path },
  ];

  return (
    <header className="flex justify-between items-center">
      <nav
        className={cn(
          'flex justify-between items-center gap-4 flex-row flex-1',
        )}
      >
        <Logo />
        <div className="lg:flex flex-row gap-4 bg-primary rounded-2xl p-2 hidden">
          {generalNavigation.map((item) =>
            !item.dropdown ? (
              <NavLink
                key={item.name}
                to={item.to.startsWith('/') ? item.to : `/${item.to}`}
                end
                className={({ isActive }) =>
                  cn(
                    'text-gray-100 hover:bg-primary-700 hover:text-white',
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
                    className="rounded-xl text-gray-100"
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
        </div>
      </nav>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            rightIcon={<PanelLeft className="size-5" />}
            buttonVariant="outlined"
            className="lg:hidden"
          >
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent
          side="right"
          className="bg-gray-50 pt-16 md:max-w-80 sm:max-w-60"
        >
          <nav
            className={cn(
              'flex h-full justify-between items-center gap-4 flex-col',
            )}
          >
            <div className="flex flex-col flex-1 w-full gap-4 bg-primary rounded-2xl p-2">
              {generalNavigation.map((item) =>
                !item.dropdown ? (
                  <NavLink
                    key={item.name}
                    to={item.to.startsWith('/') ? item.to : `/${item.to}`}
                    end
                    className={({ isActive }) =>
                      cn(
                        'text-gray-100 hover:bg-primary-700 hover:text-white',
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
                          hPadding: 'none',
                          vPadding: 'none',
                        }}
                        className="rounded-xl text-gray-100"
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
            </div>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
