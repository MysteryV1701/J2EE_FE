import { Head } from '@/components/seo';

export const LandingRoute = () => {
  return (
    <>
      <Head title="HomePage" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-wider text-gray-900 sm:text-4xl">
            <span className="block">Happly Life</span>
          </h2>
          <p>Donate for me to make me strong</p>
        </div>
      </div>
    </>
  );
};