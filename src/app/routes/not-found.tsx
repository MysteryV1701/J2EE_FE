import { Link } from '@/components/ui/link';
import { useUser } from '@/lib/auth';

export const NotFoundRoute = () => {
  const user = useUser();
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {user?.data ? (
        <Link to="/app" replace>
          Go to Home
        </Link>
      ) : (
        <Link to="/" replace>
          Go to Home
        </Link>
      )}
    </div>
  );
};
