import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Footer: FunctionComponent = () => {
  return (
    <footer className="md:px-20 px-2 pt-12 pb-4 relative bg-secondary-200 flex flex-col gap-4">
      <div className="lg:grid-cols-2 grid-cols-1 grid gap-12 items-start">
        <div className="flex flex-col gap-4 items-start px-4">
          <NavLink
            to="/"
            className="font-bold md:text-4xl text-3xl font-dancing text-primary"
          >
            DannCharity
          </NavLink>
          <q className="italic text-2xl text-primary font-dancing">
            Sự chung tay góp sức của bạn là sức mạnh của chúng tôi
          </q>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <h4 className="font-semibold mb-2">Kết nối với chúng tôi</h4>
          <p>Email: contact@danncharity.biz</p>
          <p>
            Address: 456 Hai Bà Trưng, Tân Định, Quận 1, Thành phố Hồ Chí Minh
          </p>
        </div>
      </div>
      <span className="text-center block text-base text-gray-400 ">
        Copyright@2024-2025 by MysV
      </span>
    </footer>
  );
};

export default Footer;
