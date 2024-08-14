'use client'

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Metas  from '../components/Metas'

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
      <Metas />
    </div>)
};

export default DashboardComponent;

