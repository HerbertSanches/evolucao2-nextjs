import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
// import "@/app/globals.css";
import { useRouter, useSearchParams } from 'next/navigation';
import graficoMeta from '../../public/assets/images/graficoMeta.png';
import Image from 'next/image';

export interface metaMesAno{
  metaMes: string,
  metaAno: string,
}

const Metas: React.FC<metaMesAno> = ({ metaMes, metaAno }) => {
  const { token } = useAuth();
  console.log(token)
  const searchParams = useSearchParams();


  return (

    <div className='ml-3 mr-3 mt-3 bg-cinza  rounded-[8px]'>
    <div id='containerMeta' className='flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 h-[90px] mt-4'>

      <div id='metaMes' className='flex bg-azul-gradiente2 rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-1'>

        <div className="flex items-center space-x-1 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className='smallphone:h-8 smallphone:w-8 ' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm">Meta Outubro</h2>
            <p className="text-branco font-bold smallphone:text-sm">R$ {metaMes}</p>
          </div>
        </div>
        
      </div>

      <div id='metaMes' className='flex bg-azul-gradiente w-responsive rounded-[8px] h-[70px] mr-1 items-center justify-center shadow-global mt-1'>

        <div className="flex items-center space-x-1 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className=' smallphone:h-8 smallphone:w-8' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm ">Meta 2024 </h2>
            <p className="text-branco font-bold smallphone:text-sm">R$ {metaAno}</p>
          </div>
          {/* <DoughnutChartWithCenterText percentage={20} /> */}
        </div>

      </div>


    </div>
    </div>
  )
};

export default Metas;