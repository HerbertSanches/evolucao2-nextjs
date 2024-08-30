'use client'
import React, { Suspense, useState, useEffect } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';
import LoadingPadrao from '../loading'
import { Footer } from '../Footer';
import { withAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
    
    return (
        // <div>

        <Suspense fallback={<LoadingPadrao  />}>
            <DashboardComponent />
            <Footer />
        </Suspense>

        // </div>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;