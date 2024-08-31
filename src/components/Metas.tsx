import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
// import "@/app/globals.css";
import { useRouter, useSearchParams } from 'next/navigation';
import graficoMeta from '../../public/assets/images/graficoMeta.png';
import Image from 'next/image';

export interface metaMesAno{
  metaMes: number,
  metaAno: number,
}

const Metas: React.FC<metaMesAno> = ({ metaMes, metaAno }) => {
  const { token } = useAuth();
  console.log(token)
  const searchParams = useSearchParams();


  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const mesParaChave: { [key: number]: string }  = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
  };
  const chaveMetaMes:string = mesParaChave[mesAtual];


  return (
    //animate-slide-down
    <div className='ml-3 mr-3 mt-3 bg-cinza  rounded-[8px] '> 
    <div id='containerMeta' className='flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 h-[90px] mt-4'>

      <div id='metaMes' className='flex bg-azul-gradiente2 rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-1'>

        <div className="flex items-center space-x-1 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className='smallphone:h-8 smallphone:w-8 ' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm">Meta {chaveMetaMes}</h2>
            <p className="text-branco font-bold smallphone:text-sm">R$ {metaMes}</p>
          </div>
        </div>
        
      </div>

      <div id='metaMes' className='flex bg-azul-gradiente w-responsive rounded-[8px] h-[70px] mr-1 items-center justify-center shadow-global mt-1'>

        <div className="flex items-center space-x-1 justify-center">
          <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className=' smallphone:h-8 smallphone:w-8' />
          <div className='flex flex-col'>
            <h2 className="text-branco font-bold smallphone:text-sm ">Meta {anoAtual} </h2>
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