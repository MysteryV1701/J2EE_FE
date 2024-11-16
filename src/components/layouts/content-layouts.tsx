import * as React from 'react';

import { Head } from '../seo';
import { Navbar } from '../ui/partials/navbar';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  isDashboard?: boolean;
};

export const ContentLayout = ({
  children,
  title,
  description,
  isDashboard = false,
}: ContentLayoutProps) => {
  return (
    <>
      {isDashboard ? (
        <>
          <Head title={title} description={description} />
          <div className="px-4 py-8 relative">
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="mx-auto px-4 py-6 sm:px-6 md:px-8">{children}</div>
          </div>
        </>
      ) : (
        <>
          <Head title={title} description={description} />
          <div className="md:px-20 px-2 py-4 relative">
            <Navbar />
            <div className="px-4">{children}</div>
          </div>
        </>
      )}
    </>
  );
};
