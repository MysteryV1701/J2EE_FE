import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/auth';

import { AppRoot, AppRootErrorBoundary } from './routes/app/root';
import { paths } from '@/config/paths.ts';

const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const { LandingRoute } = await import('./routes/landing');
        return { Component: LandingRoute };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.auth.register.path,
      lazy: async () => {
        const { RegisterRoute } = await import('./routes/auth/register');
        return { Component: RegisterRoute };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.auth.login.path,
      lazy: async () => {
        const { LoginRoute } = await import('./routes/auth/login');
        return { Component: LoginRoute };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.campaigns.path,
      lazy: async () => {
        const { CampaignRoute, campaignsLoader } = await import(
          './routes/client/campaigns.tsx'
        );
        return {
          Component: CampaignRoute,
          loader: campaignsLoader(queryClient),
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.campaign.path,
      lazy: async () => {
        const { CampaignRoute, campaignLoader } = await import(
          './routes/client/campaign.tsx'
        );
        return {
          Component: CampaignRoute,
          loader: campaignLoader(queryClient),
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.users.path,
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
          path: paths.app.dashboard.path,
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
              './routes/app/admin/recipients.tsx'
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
