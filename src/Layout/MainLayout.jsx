import React from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayout = () => {

    const location = useLocation();
    const navigation = useNavigation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/signup') || location.pathname.includes('/details-issue/') || location.pathname.includes('/saved-issues');


    return (
        <div
            className='flex flex-col bg-no-repeat bg-cover bg-fixed'
            style={{
                backgroundImage: "url('/Sprinkle.svg')",
            }}
        >

            {noHeaderFooter || <Navbar></Navbar>}



            <main className="max-w-11/12 min-h-screen mx-auto">
                {
                    navigation.state === 'loading'
                        ? <Loading />
                        : <Outlet />
                }
            </main>


            {noHeaderFooter || <Footer></Footer>}


        </div>
    );
};

export default MainLayout;