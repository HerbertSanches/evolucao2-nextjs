'use client'
import React, { Suspense, useState, useEffect } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';
import LoadingPadrao from '../loading'
import Header from '@/components/Header';
import { Footer } from '../Footer';

const Dashboard: React.FC = () => {
    
    return (
       
        <Suspense fallback={<LoadingPadrao  />}>
            <Header />
            <DashboardComponent />
            <Footer />
        </Suspense>
      
    );
};

// export default withAuth(Dashboard);
export default Dashboard;