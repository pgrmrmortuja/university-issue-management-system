import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayout = () => {

    const location = useLocation();
    const navigation = useNavigation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup');


    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}

            {
                navigation.state === 'loading' ?
                    <Loading></Loading>
                    :
                    <main className='w-11/12 mx-auto'>
                        <Outlet></Outlet>
                    </main>
            }

            {noHeaderFooter || <Footer></Footer>}

        </div>
    );
};

export default MainLayout;