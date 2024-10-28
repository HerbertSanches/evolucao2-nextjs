'use client'
import React, { Suspense, useState, useEffect } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';
import LoadingPadrao from '../loading'
import Header from '@/components/Header';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import HeaderDasktop from '@/components/dasktopComponents/HeaderDasktop';
import DashboardComponentDasktop from '@/components/dasktopComponents/DashboardComponentDasktop';

const Dashboard: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        }   
    }, []);


    if (windowWidth === undefined) {
        return null;
    }

    return (
       
        <>
            {windowWidth < 600 ? <Header /> : <HeaderDasktop />}
            {windowWidth < 600 ? <DashboardComponent /> : <DashboardComponentDasktop />}
            {windowWidth < 600 ? <Footer /> : null}
        </>
                                            
    );
};

export default withAuth(Dashboard);
// export default Dashboard;