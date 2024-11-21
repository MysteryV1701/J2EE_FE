import { Link } from '../link';

export const Logo = () => {
  return (
    <div className="flex h-16 shrink-0 items-center px-4 font-bold md:text-4xl text-3xl font-dancing">
      <Link to="/" className="text-primary">
        DannCharity
      </Link>
    </div>
  );
};
