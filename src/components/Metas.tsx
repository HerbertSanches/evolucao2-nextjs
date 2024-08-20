'use client'

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';
import "@/app/globals.css";
import { useRouter, useSearchParams } from 'next/navigation';
import graficoMeta from '../../public/assets/images/graficoMeta.png';
import Image from 'next/image';


const Metas: React.FC = () => {
  const { token } = useAuth();
  console.log(token)
  const searchParams = useSearchParams();


  return (

    <div id='containerMeta' className='flex flex-row smallphone:gap-1 justify-center items-center smallphone:g-3 h-[90px]'>

      <div id='metaMes' className='flex bg-azulEscuro rounded-[20px] h-[85px] w-responsive ml-1 items-center justify-center shadow-global'>

        <div className="flex items-center space-x-2 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" className='smallphone:h-8 smallphone:w-8 ' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm">Meta Outubro</h2>
            <p className="text-branco font-bold smallphone:text-sm">R$ 335.701,74</p>
          </div>
        </div>
        
      </div>

      <div id='metaMes' className='flex bg-azulEscuro w-responsive rounded-[20px] h-[85px] mr-1 items-center justify-center shadow-global'>

        <div className="flex items-center space-x-2 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" className=' smallphone:h-8 smallphone:w-8' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm">Meta 2024</h2>
            <p className="text-branco font-bold smallphone:text-sm">R$ 35.701,74</p>
          </div>
        </div>

      </div>


    </div>

  )
};

export default Metas;