import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications';
import { AuthLoader } from '@/lib/auth';
import { queryConfig } from '@/lib/react-query';
import { Spinner } from '@/components/ui/spinner';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <GoogleOAuthProvider clientId="871646200780-eu45o1bggee0k30hcv6u17b7gdco0ji9.apps.googleusercontent.com">
            <QueryClientProvider client={queryClient}>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              <Notifications />
              <AuthLoader
                renderLoading={() => (
                  <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner size="xl" />
                  </div>
                )}
              >
                {children}
              </AuthLoader>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
