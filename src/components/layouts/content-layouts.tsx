import * as React from 'react';

import { Head } from '../seo';
import { Navbar } from '../ui/partials/navbar';
import Footer from '../ui/partials/footer';

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
          <div className="px-4 py-4 relative">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <div className="py-2">{children}</div>
          </div>
        </>
      ) : (
        <>
          <Head title={title} description={description} />
          <div className="md:px-20 px-2 py-4 relative">
            <Navbar />
            <div className="px-4">{children}</div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
