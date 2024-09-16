'use client'

import React from 'react';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import AvisosComponent from '@/components/Avisos';

const Avisos = () => {

    return(
        <>
            <Header />
            <AvisosComponent />
            <Footer />
        </>
    )
}

export default withAuth(Avisos);