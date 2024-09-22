import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications';
import { queryClient } from '@/lib/react-query';
import { TbLoader } from 'react-icons/tb';

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    <TbLoader className="animate-spin" size={25} />;
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={MainErrorFallback}>
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        {import.meta.env.DEV && <ReactQueryDevtools />}
                        <Notifications />
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};