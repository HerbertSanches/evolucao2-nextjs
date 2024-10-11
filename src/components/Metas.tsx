import React, { useState, useEffect, useCallback, useContext } from 'react';
import graficoMeta from '../../public/assets/images/graficoMeta.png';
import Image from 'next/image';

export interface metaMesAno{
  metaMes: number,
  mes:number;
  metaAno: number,
  ano: string,
}

const Metas: React.FC<metaMesAno> = ({ metaMes, mes, metaAno, ano }) => {
  console.log(metaAno)
  console.log(metaMes)

  const [metaMesFormatado, setMetaMesFormatado] = useState('');
  const [metaAnoFormatado, setMetaAnoFormatado] = useState('');

  useEffect(() => {
    setMetaMesFormatado(metaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setMetaAnoFormatado(metaAno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  },[metaMes, metaAno])

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
  const chaveMetaMes:string = mesParaChave[mes];


  return (
    <div className='ml-3 mr-3 items-center justify-center rounded-[8px] '> 
      <div id='containerMeta' className='flex flex-row smallphone:gap-2 justify-center items-center smallphone:g-3 h-[90px] '>

        <div id='metaMes' className='flex bg-azulEscuro rounded-[8px] h-[70px] w-responsive ml-1 items-center justify-center shadow-global mt-1'>

          <div className="flex items-center space-x-1 justify-center">
            <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className='smallphone:h-8 smallphone:w-8 ' />
            <div className='flex flex-col'>
              <h2 className="text-branco font-bold smallphone:text-sm">Meta {chaveMetaMes}</h2>
              <p className="text-branco font-bold smallphone:text-sm">R$ {metaMesFormatado}</p>
            </div>
          </div>
          
        </div>

        <div id='metaMes' className='flex bg-azulEscuro w-responsive rounded-[8px] h-[70px] mr-1 items-center justify-center shadow-global mt-1'>

          <div className="flex items-center space-x-1 justify-center">
            <Image src={graficoMeta} alt="Grafico meta" width={40} height={40} className=' smallphone:h-8 smallphone:w-8' />
            <div className='flex flex-col'>
              <h2 className="text-branco font-bold smallphone:text-sm ">Meta {ano} </h2>
              <p className="text-branco font-bold smallphone:text-sm">R$ {metaAnoFormatado}</p>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  )
};

export default Metas;