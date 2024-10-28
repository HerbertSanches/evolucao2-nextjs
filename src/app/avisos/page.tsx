'use client'

import React from 'react';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import AvisosComponent from '@/components/Avisos';
import HeaderDasktop from '@/components/dasktopComponents/HeaderDasktop';
import useWindowWidth from '@/services/comum.utils';


const Avisos = () => {
    const windowWidth = useWindowWidth();
  
    if (windowWidth === undefined) {
        return null
    }

    return(
        <>
            {windowWidth < 1046 ? <Header /> : <HeaderDasktop />}
            <AvisosComponent />
            <Footer />
        </>
    )
}

export default withAuth(Avisos);