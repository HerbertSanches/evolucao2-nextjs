'use client'
import React, { Suspense, useState, useEffect } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';
import LoadingPadrao from '../loading'
<<<<<<< HEAD
import Header from '@/components/Header';

=======
import { Footer } from '../Footer';
import { withAuth } from '@/context/AuthContext';
>>>>>>> 882efc6eece87f439219ac2e30b6cb73e5b145f7

const Dashboard: React.FC = () => {
    
    return (
        // <div>

        
        <Suspense fallback={<LoadingPadrao  />}>
            <Header/>
            <DashboardComponent />
<<<<<<< HEAD
        </Suspense>
        </div>
=======
            <Footer />
        </Suspense>

        // </div>
>>>>>>> 882efc6eece87f439219ac2e30b6cb73e5b145f7
    );
};

// export default withAuth(Dashboard);
export default Dashboard;