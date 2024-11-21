import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Link } from '@/components/ui/link';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useUser();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.data) {
      navigate('/app', {
        replace: true,
      });
    }
  }, [user.data, navigate]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="background-login"></div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md" style={{ zIndex: 1 }}>
          <div className="flex justify-center">
            <Link className="flex items-center text-white" to="/">
              <div
                className="flex h-16 shrink-0 items-center px-4 font-bold text-6xl font-dancing text-primary"
                title="Logo DannCharity"
              >
                DannCharity
              </div>
            </Link>
          </div>

          <h2 className="mt-3 text-center text-4xl font-dancing font-bold text-secondary-600">
            {title}
          </h2>
        </div>
        <div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          style={{ zIndex: 1 }}
        >
          <div className="bg-gray-50 border border-gray-200 px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
