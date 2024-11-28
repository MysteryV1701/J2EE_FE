import { PanelLeft, User2 } from 'lucide-react';

import Button from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useLogout, useUser } from '@/lib/auth';
import { cn } from '@/helpers/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown';

import { Progress } from '../ui/progress';
import { Navbar } from '../ui/partials/navbar';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-primary-900 sm:flex">
        <Navbar />
      </aside>
      <div className="flex flex-col flex-1 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background shadow px-4 sm:items-center sm:static sm:justify-end sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-3">
          <Progress />
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                leftIcon={<PanelLeft className="size-5" />}
                buttonVariant="outlined"
                className="sm:hidden"
              >
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              side="left"
              className="bg-black pt-10 text-white sm:max-w-60"
            >
              <Navbar />
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row gap-2 cursor-pointer">
                <Button
                  buttonVariant="outlined"
                  buttonStyled={{ color: 'primary', ringWidth: 2 }}
                  rightIcon={<User2 className="size-6 rounded-full" />}
                  className="overflow-hidden rounded-full"
                >
                  <span className="sr-only">Open user menu</span>
                </Button>
                <span className="text-gray-600">{user?.data.email}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" color="bg-gray-200 w-full">
              {/* <DropdownMenuItem
                onClick={() => navigate('./profile')}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => {
                  logout.mutate({});
                  navigate(paths.auth.login.getHref());
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 bg-gray-100 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
