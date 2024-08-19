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
    <div id='containerMeta' className='flex flex-row smallphone:gap-1 bg-red-400 justify-center items-center p-4 '>

      <div id='metaMes' className='flex bg-azulEscuro rounded-[20px] h-[85px] w-responsive ml-1 items-center justify-center shadow-global'>

        <div className="flex items-center space-x-2 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" className='smallphone:h-8 smallphone:w-8' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold">Meta 2024</h2>
            <p className="text-branco">R$ 35.701,74</p>
          </div>
        </div>
        
      </div>

      {/* <div id='metaMes' className='flex bg-azulEscuro w-1/2 rounded-[20px] h-[85px] ml-1 '>

        <div id='img' className='flex w-1/3 h-[100%] items-center justify-end '>
          <Image src={graficoMeta} alt="Grafico meta" className='' />
        </div>

        <div id='MetaMes'className='flex flex-col mr-auto items-start justify-center ml-[5px] '>
          <p className='block text-white font-bold'>Meta Agosto</p>
          <p className='block text-white font-semibold'>R$ 35.701,74</p>
        </div>

      </div> */}



      <div id='metaMes' className='flex bg-azulEscuro w-responsive rounded-[20px] h-[85px] ml-1 items-center justify-center shadow-global'>

        <div className="flex items-center space-x-2 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" className='smallphone:h-8 smallphone:w-8' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm">Meta 2024</h2>
            <p className="text-branco smallphone:text-sm">R$ 35.701,74</p>
          </div>
        </div>

      </div>





      {/* <div id='containerMeta' className='flex flex-row gap-4 bg-red-400 justify-center items-center p-4 '>
        
        <div className="max-w-[300px] w-[170px] bg-azulEscuro text-branco p-4 rounded-lg items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src={graficoMeta} alt="Grafico meta" className='w-10 h-10' />
            <div>
              <h2 className="text-lg font-bold text-[]">Meta Agosto</h2>
              <p className="text-sm">R$ 35.701,74</p>
            </div>
          </div>
        </div>
        
        <div id="metaAno" className='max-w-[300px] w-[170px] bg-azulEscuro text-branco p-4 rounded-lg items-center justify-center'>
          <div className="flex items-center space-x-4 justify-center">
            <Image src={graficoMeta} alt="Grafico meta" className='w-10 h-10' />
            <div className='flex flex-col'>
              <h2 className="text-lg font-bold">Meta 2024</h2>
              <p className="text-sm">R$ 35.701,74</p>
            </div>
          </div>
        </div>

      </div> */}

    </div>
  )
};

export default Metas;