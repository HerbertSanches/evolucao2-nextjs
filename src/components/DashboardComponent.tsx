import React, { useEffect, useState } from 'react';
import Metas  from '../components/Metas'
import Faturamento from './Faturamento';
import '../app/globals.css'
import GraficoAnual from './GraficoAnual'
import api from '@/services/api';
import LoadingPadrao from '@/app/loading';

const DashboardComponent: React.FC = () => {
  const [metaMes, setMetaMes] = useState(0);
  const [metaAno, setMetaAno] = useState(0);
  const mesAtual = new Date().getMonth();

  const mesParaChave: { [key: number]: string }  = {
    0: 'mt_vlrjan',
    1: 'mt_vlrfev',
    2: 'mt_vlrmar',
    3: 'mt_vlrabr',
    4: 'mt_vlrmai',
    5: 'mt_vlrjun',
    6: 'mt_vlrjul',
    7: 'mt_vlrago',
    8: 'mt_vlrset',
    9: 'mt_vlrout',
    10: 'mt_vlrnov',
    11: 'mt_vlrdez'
  };
  
  const chaveMetaMes:string = mesParaChave[mesAtual];
  console.log(chaveMetaMes)
  
  useEffect(() => { 
    try {
      const fetchData = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')

        const responseMetaMesAno =  await api.get(`/meta/0/${idEmpresa}/0`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });

        setMetaMes(responseMetaMesAno.data.meta[0][chaveMetaMes]);
        setMetaAno(responseMetaMesAno.data.meta[0].mt_vlranual); 
      }
      fetchData();
    } catch (error) {
      console.error("Erro ao chamar metas")
    }
  }, [metaMes, metaAno]);


  return (
    <div className=''>
     
      <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>
        
        <Metas metaMes={metaMes} metaAno={metaAno} />
        <Faturamento tipoFaturamento={'Dia'} valor={'17.850,75'} porcentagem={'50'} delay={0}/>
        <Faturamento tipoFaturamento={'semana'} valor={'25.654,37'} porcentagem={'90'} delay={30}/>
        <Faturamento tipoFaturamento={'Mês'} valor={'110.045,98'} porcentagem={'65'} delay={60}/>
        <Faturamento tipoFaturamento={'Ano'} valor={'575.437,62'} porcentagem={'71'} delay={90}/>
        <div id='background GraficoAnual'>
          <GraficoAnual />
        </div>

      </div>
      {/* <Footer /> */}
    </div>
    )
    
};

export default DashboardComponent;