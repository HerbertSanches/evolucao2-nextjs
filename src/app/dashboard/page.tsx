'use client'
import React, { Suspense, useState, useEffect } from 'react';
import "../globals.css";
import DashboardComponent from '../../components/DashboardComponent';
import LoadingPadrao from '../loading'


const Dashboard: React.FC = () => {
    
    // const [Loading, setLoading] = useState(false)
    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() =>{
    //         setLoading(false);
    //     }, 8000);
    // },[]);
    return (
        <div>

        <Suspense fallback={<LoadingPadrao  />}>
            <DashboardComponent />
        </Suspense>)
        </div>
    );
};

// export default withAuth(Dashboard);
export default Dashboard;