'use client'
import React from 'react';

import DashboardVendedor from '@/components/DashboardVendedor';
import { Footer } from '../Footer';
import { withAuth } from '@/context/AuthContext';

const DashboardVenda: React.FC = () =>  {
  
  return (
    <>
      <DashboardVendedor />
      <Footer />
    </>
  );
};

export default withAuth(DashboardVenda);