'use client'
import React, { useRef, useEffect, Suspense } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/dashboard';

const Dashboard: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardComponent />
        </Suspense>
    );
};

export default Dashboard;