'use client'
import React, { Suspense, useState, useEffect } from 'react';
import DashboardVendedor from '@/components/DashboardVendedor';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import DashBoardVendedorLoading from '@/components/dashboardVendedorLoading';

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