import {
    TbBrandFacebook,
    TbBrandGithub,
    TbBrandInstagram,
    TbBrandLinkedin
} from 'react-icons/tb';
import Button from '../button';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';

const MainFooter : FunctionComponent = () => {
    return (
        <footer className="border-t-2 border-solid border-gray-200 bg-white">
            <div className="container mx-auto py-8 grid grid-cols-12 ">
                <div className="col-span-3 flex flex-col gap-8">
                    <Link to={'/'}>
                        <img
                            src="/assets/svg/logo.svg"
                            alt="Techshop's Logo"
                            className="pb-2"
                        />
                    </Link>

                    <p className="">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Non consequuntur nobis sunt debitis aut placeat
                        saepe optio quasi, tempore nulla eum porro culpa vel
                        ducimus.
                    </p>

                    <div className="flex gap-2">
                        <Button
                            buttonVariant="filled"
                            buttonStyled={{
                                color: 'primary',
                                size: 'md',
                                hPadding: 'sm',
                                vPadding: 'sm',
                                rounded: 'full'
                            }}
                            className="hover:animate-pulse"
                        >
                            <TbBrandFacebook size={24} />
                        </Button>
                        <Button
                            buttonVariant="filled"
                            buttonStyled={{
                                color: 'primary',
                                size: 'md',
                                hPadding: 'sm',
                                vPadding: 'sm',
                                rounded: 'full'
                            }}
                            className="hover:animate-pulse"
                        >
                            <TbBrandInstagram size={24} />
                        </Button>
                        <Button
                            buttonVariant="filled"
                            buttonStyled={{
                                color: 'primary',
                                size: 'md',
                                hPadding: 'sm',
                                vPadding: 'sm',
                                rounded: 'full'
                            }}
                            className="hover:animate-pulse"
                        >
                            <TbBrandLinkedin size={24} />
                        </Button>
                        <Button
                            buttonVariant="filled"
                            buttonStyled={{
                                color: 'primary',
                                size: 'md',
                                hPadding: 'sm',
                                vPadding: 'sm',
                                rounded: 'full'
                            }}
                            className="hover:animate-pulse"
                        >
                            <TbBrandGithub size={24} />
                        </Button>
                    </div>
                </div>

                <div className="col-span-2 col-start-6 flex flex-col gap-4">
                    <h1 className="font-bold text-lg">Techshop</h1>
                    <a href="#" className="block">
                        About us
                    </a>
                    <a href="#" className="block">
                        Contact
                    </a>
                    <a href="#" className="block">
                        FAQ
                    </a>
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                    <h1 className="font-bold text-lg">Legal</h1>
                    <a href="#" className="block">
                        Term and condition
                    </a>
                    <a href="#" className="block">
                        Privacy policy
                    </a>
                </div>
                <div className="col-span-3 flex flex-col gap-4">
                    <h1 className="font-bold text-lg">Contact</h1>
                    <span className="block">support@techshop.com</span>
                    <span className="block">
                        975/28 Tran Xuan Soan, P. Tan Hung, Q.7, Tp. HCM
                    </span>
                </div>
            </div>
        </footer>
    );
};
export default MainFooter;