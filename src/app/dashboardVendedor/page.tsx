'use client'
import React, { useState, useEffect, Suspense  } from 'react';
import DashboardVendedor from '@/components/DashboardVendedor';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import DashboardComponentDasktop from '@/components/dasktopComponents/DashboardComponentDasktop';
import useWindowWidth from '../../services/comum.utils';
import DashBoardVendedorLoading from '@/components/DashboardAvisosLoading';

// async function chamarLargura() {
//   verificarLargura();
// }

const DashboardVenda: React.FC = () => {
  const windowWidth = useWindowWidth();
  
  if (windowWidth === undefined) {
    return null
  }

  return (
    <>
      <Header />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        
        <DashboardVendedor /> 
        
      {/* </Suspense> */}
      <Footer />
    </>
  );
};

export default withAuth(DashboardVenda);