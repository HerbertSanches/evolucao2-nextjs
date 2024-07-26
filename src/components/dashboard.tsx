'use client'
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import usuarioIcon from '../../public/assets/images/usuario.png';
import cadeadoIcon from '../../public/assets/images/cadeado.png';
import logo from '../../public/assets/images/logo.png';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

const Teste: React.FC = () => {
     const { token } = useAuth();
    console.log(token)
    useEffect(() => {
    // Garantir que o código só é executado no lado do cliente
    console.log("Current token:", token.token);
  }, [token.token]);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div> 
            <p>aaaa</p>
        <p>aaa{message}</p>
        <p>{token.token}</p>
    </div>) 
};

export default Teste;

