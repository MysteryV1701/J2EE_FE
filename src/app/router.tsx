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
      path: paths.auth.forgot_password.path,
      lazy: async () => {
        const { ForgotPasswordRoute } = await import(
          './routes/auth/forgot-password'
        );
        return { Component: ForgotPasswordRoute };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.auth.verify_otp.path,
      lazy: async () => {
        const { VerifyOTPRoute } = await import('./routes/auth/verify-otp');
        return { Component: VerifyOTPRoute };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.auth.reset_password.path,
      lazy: async () => {
        const { ResetPasswordRoute } = await import(
          './routes/auth/reset-password'
        );
        return { Component: ResetPasswordRoute };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.campaigns.path,
      lazy: async () => {
        const { CampaignsRoute, campaignsLoader } = await import(
          './routes/client/campaigns.tsx'
        );
        return {
          Component: CampaignsRoute,
          loader: campaignsLoader(queryClient),
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.campaignCategories.path,
      lazy: async () => {
        const { CampaignCategoryRoute, campaignCategoryLoader } = await import(
          './routes/client/campaignCategory.tsx'
        );
        return {
          Component: CampaignCategoryRoute,
          loader: campaignCategoryLoader(queryClient),
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
      path: paths.donation_result.path,
      lazy: async () => {
        const { DonationResultRoute } = await import(
          './routes/client/donation-result.tsx'
        );
        return {
          Component: DonationResultRoute,
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.my_campaign.path,
      lazy: async () => {
        const { MyCampaignsRoute } = await import(
          './routes/client/my-campaign.tsx'
        );
        return {
          Component: MyCampaignsRoute,
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.aboutUs.path,
      lazy: async () => {
        const { AboutUsRoute } = await import('./routes/client/about-us.tsx');
        return {
          Component: AboutUsRoute,
        };
      },
      ErrorBoundary: AppRootErrorBoundary,
    },
    {
      path: paths.donations.path,
      lazy: async () => {
        const { DonationsRoute } = await import(
          './routes/client/donations.tsx'
        );
        return {
          Component: DonationsRoute,
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
          path: paths.app.education.path,
          lazy: async () => {
            const { EducationsRoute } = await import(
              './routes/app/admin/educations.tsx'
            );
            return { Component: EducationsRoute };
          },
        },
        {
          path: paths.app.category.path,
          lazy: async () => {
            const { CategoriesRoute } = await import(
              './routes/app/admin/categories.tsx'
            );
            return { Component: CategoriesRoute };
          },
        },
        {
          path: paths.app.recipient.path,
          lazy: async () => {
            const { RecipientsRoute } = await import(
              './routes/app/admin/recipients.tsx'
            );
            return { Component: RecipientsRoute };
          },
        },
        {
          path: paths.app.financialReport.path,
          lazy: async () => {
            const { FinancialReportsRoute } = await import(
              './routes/app/admin/financial-reports.tsx'
            );
            return { Component: FinancialReportsRoute };
          },
        },
        {
          path: paths.app.campaigns.path,
          lazy: async () => {
            const { CampaignsRoute } = await import(
              './routes/app/admin/campaign.tsx'
            );
            return { Component: CampaignsRoute };
          },
        },
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
