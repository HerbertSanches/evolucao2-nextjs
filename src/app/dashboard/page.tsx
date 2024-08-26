'use client'
import React, { Suspense } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';


const Dashboard: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardComponent />
        </Suspense>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;