'use client'

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
// import { grafico-de-barras } from '../../'

const Metas: React.FC = () => {
  const { token } = useAuth();
  console.log(token)
  const searchParams = useSearchParams();


  return (
    <div id='containerMeta' className='flex flex-row bg-red-400 h-[10vh] gap-[1vh]'>
      <div id='metaMes' className='bg-blue-700 w-1/2'>

      </div>

      <div id="metaAno" className='bg-orange-700 w-1/2'>

      </div>
    </div>
  )
};

export default Metas;