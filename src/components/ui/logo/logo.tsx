import { Link } from '../link';
import logo from '@/assets/logo.svg';

export const Logo = () => {
  return (
    <Link className="flex items-center text-white" to="/">
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-sm font-semibold text-white">Happy Life</span>
    </Link>
  );
};
