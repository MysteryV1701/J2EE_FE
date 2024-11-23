import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot } from './routes/app/root';

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./routes/landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: '/auth/register',
      lazy: async () => {
        const { RegisterRoute } = await import('./routes/auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
    },
    // {
    //   path: '/auth/forgot-password',
    //   lazy: async () => {
    //     const { ForgotPasswordRoute } = await import(
    //       './routes/auth/forgot-password'
    //     );
    //     return { Component: ForgotPasswordRoute };
    //   },
    // },
    // {
    //   path: '/auth/reset-password',
    //   lazy: async () => {
    //     const { ResetPasswordRoute } = await import(
    //       './routes/auth/reset-password'
    //     );
    //     return { Component: ResetPasswordRoute };
    //   },
    // },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'users',
          lazy: async () => {
            const { UsersRoute } = await import('./routes/app/admin/users.tsx');
            return { Component: UsersRoute };
          },

          loader: async () => {
            const { usersLoader } = await import(
              './routes/app/admin/users.tsx'
            );
            return usersLoader(queryClient)();
          },
        },
        {
          path: 'profile',
          lazy: async () => {
            const { ProfileRoute } = await import('./routes/app/profile.tsx');
            return { Component: ProfileRoute };
          },
        },
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import(
              './routes/app/admin/dashboard.tsx'
            );
            return { Component: DashboardRoute };
          },
        },
        {
          path: 'recipients',
          lazy: async () => {
            const { RecipientsRoute } = await import(
              './routes/app/admin/recipient.tsx'
            );
            return { Component: RecipientsRoute };
          },
        }
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
