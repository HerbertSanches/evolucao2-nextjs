'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import "../../globals.css";
import LoginTela from '../../../components/loginTela';

const Login: React.FC = () =>  {
  //const pathname = usePathname();
  
  // Extrai o último segmento da URL como parâmetro da empresa
  // const company = useMemo(() => pathname?.split('/').pop(), [pathname]);
  // console.log(company)
  // const idEmpresa = useMemo(() => {
  //   switch (company) {
  //     case 'evolucao':
  //       return '2';

  //     case 'quadrado':
  //       return '3';

  //     case 'espeto':
  //       return '5874';

  //     default:
  //       return '753';
  //   }
  // }, [company]);
  
  return (
    <LoginTela />
  );
};

export default Login;