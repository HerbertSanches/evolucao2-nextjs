'use client'
import React from 'react';

import DashboardVendedor from '@/components/DashboardVendedor';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import Header from '@/components/Header';

const DashboardVenda: React.FC = () =>  {
  
  return (
    <>
      <Header />
      <DashboardVendedor />
      <Footer />
    </>
  );
};

export default withAuth(DashboardVenda);