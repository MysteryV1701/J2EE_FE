import { FunctionComponent } from 'react';
import { Head } from '../seo';
import MainHeader from '../ui/header/main-header';
import { Outlet } from 'react-router-dom';
import MainFooter from '../ui/footer/main-footer';

// interface MainLayoutProps {}

const MainLayout: FunctionComponent = () => {
    return (
        <>
            <Head />
            <MainHeader showAuthBtns showSearchBar />
            <div className="container mx-auto my-10">
                <Outlet />
            </div>
            <MainFooter />
        </>
    );
};

export default MainLayout;