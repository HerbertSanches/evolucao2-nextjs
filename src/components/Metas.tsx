'use client'

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import graficoMeta from '../../public/assets/images/graficoMeta.png';
import Image from 'next/image';

const Metas: React.FC = () => {
  const { token } = useAuth();
  console.log(token)
  const searchParams = useSearchParams();


  return (
    <div id='containerMeta' className='flex flex-row bg-red-400 h-[10vh] gap-[1vh]'>
      <div id='metaMes' className='flex bg-red-700 w-1/2'>
        <div id='img' className='flex w-1/3 bg-blue-400 h-[100%] items-center justify-center'>
          <Image src={graficoMeta} alt="Grafico meta" className=''/>
        </div>

        <div id='MetaMes'className=''>
          <p className='text-white'>Meta Agosto</p>
          <p className='text-white'>R$ 35.701,74</p>
        </div>
      </div>
     
      <div id="metaAno" className='bg-orange-700 w-1/2'>

      </div>
    </div>
  )
};

export default Metas;