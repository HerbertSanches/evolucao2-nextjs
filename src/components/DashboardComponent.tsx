'use client'

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Metas  from '../components/Metas'
import Faturamento from './Faturamento';
import '../app/globals.css'

const DashboardComponent: React.FC = () => {
  const { token } = useAuth();
  console.log(token)
  const searchParams = useSearchParams();
  // const message = searchParams.get('message')

  return (
    <div>
      <p>aaaa</p>
      {/* <p>aaa{message}</p> */}
      <p>{token.token}</p>
      <Metas metaMes='35.701,54' metaAno='401.170,50'/>
      <Faturamento percentage={50}/>
    </div>)
};

export default DashboardComponent;

