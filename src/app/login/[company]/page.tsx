'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import "../../globals.css";
import LoginTela from '../../../components/loginTela';

interface LoginProps {
  idEmpresa: string;
}

const Login: React.FC<LoginProps> = ({ idEmpresa }) => {
  const pathname = usePathname();

  // Extrai o último segmento da URL como parâmetro da empresa
  const company = useMemo(() => pathname?.split('/').pop(), [pathname]);

  switch (company) {
    case 'evolucao':
      idEmpresa = '2';
      break;

    case 'quadrado':
      idEmpresa= '3';
      break;

    case 'espeto':
      idEmpresa = '5874';
      break; 

    default:
      idEmpresa = '753';
      break;

  }

  return (
    <LoginTela idEmpresa={idEmpresa} />
  );
};

export default Login;