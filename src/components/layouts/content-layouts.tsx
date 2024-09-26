import * as React from 'react';

import { Head } from '../seo';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export const ContentLayout = ({
  children,
  title,
  description,
}: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} description={description} />
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="mx-auto px-4 py-6 sm:px-6 md:px-8">{children}</div>
      </div>
    </>
  );
};
