'use client'
import React, { Suspense, useState, useEffect } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';
import LoadingPadrao from '../loading'
import Header from '@/components/Header';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
    
    return (
       
        <>
            <Header />
            <DashboardComponent />
            <Footer />
        </>
      
    );
};

export default withAuth(Dashboard);
// export default Dashboard;