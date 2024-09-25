'use client'
import React from 'react';
import { Footer } from '../../components/Footer';
import { withAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import ProdutosMaisVendidos from '@/components/ProdutosMaisVendidos';

const ProdutosVendidos: React.FC = () =>  {
  
  return (
    <>
      <Header />
      <ProdutosMaisVendidos />
      <Footer />
    </>
  );
};

export default withAuth(ProdutosVendidos);