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

  const [dataMeta, setDataMeta] = useState<any>(null);
  const [dataFaturamento, setDataFaturamento] = useState<any>(null);
  const [dataGraficoAnual, setDataGraficoAnual] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>(''); 

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

        setDataMeta(responseMetaMesAno)
        setMetaMes(responseMetaMesAno.data.meta[0][chaveMetaMes]);
        setMetaAno(responseMetaMesAno.data.meta[0].mt_vlranual); 
      }
      // setIsLoading(false);
      fetchData();
    } catch (error) {
      console.error("Erro ao chamar metas")
    }
  }, [metaMes, metaAno]);

//----------------------------teste Faturamento------------------------------------------------
const [faturamentoAno, setFaturamentoAno] = useState(0);
const [faturamentoMes, setFaturamentoMes] = useState(0);
const [faturamentoSemana, setFaturamentoSemana] = useState(0);
const [faturamentoDia, setFaturamentoDia] = useState(0);

useEffect(() => { 
  try {
    const fetchDataFaturamento = async () => {
      const idEmpresa = localStorage.getItem('idEmpresa')
      const tokenHeader = localStorage.getItem('token')

      const responseFaturamento =  await api.get(`/venda/faturamento/${idEmpresa}/2023/0`,{
        headers: {
          'Authorization': `Bearer ${tokenHeader}`
        }
      });

      setDataFaturamento(responseFaturamento);
      console.log(responseFaturamento);
      setFaturamentoAno(responseFaturamento.data.buscar[0].total_ano);
      setFaturamentoMes(responseFaturamento.data.buscar[0].total_mes);
      setFaturamentoSemana(responseFaturamento.data.buscar[0].total_semana);
      setFaturamentoDia(responseFaturamento.data.buscar[0].total_dia);
      console.log(faturamentoAno);
      
    
    }
   
    fetchDataFaturamento();
  } catch (error) {
    console.error("Erro ao chamar faturamento")
  }
}, []);

console.log(faturamentoAno)

//--faturamentoAno--
const anoPorcentagem = ((faturamentoAno / metaAno) * 100).toFixed(0);
const faturamentoAnoFormatado = faturamentoAno.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//---faturamentoMes--
const mesPorcentagem = ((faturamentoMes / metaMes) * 100).toFixed(0);
const faturamentoMesFormatado = faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//--faturamentoSemana--
const semanaPorcentagem = ((faturamentoSemana / metaMes) * 100).toFixed(0);
const faturamentoSemanaFormatado = faturamentoSemana.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//--faturamentoDia--
const diaPorcentagem = ((faturamentoDia / metaMes) * 100).toFixed(0);
const faturamentoDiaFormatado = faturamentoDia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//---------------------------------------------------------------------------

  //comita esse if para subir para a vercel
  // if (!dataMeta && !dataFaturamento && !dataGraficoAnual) {
    if (!dataMeta && !dataFaturamento) {
    return <LoadingPadrao />;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Atualiza o estado com o valor selecionado
  };

  console.log(typeof(selectedOption)) //é string
  const anoAtual = new Date().getFullYear();
  return (
    <div className=''>
     
      <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>
        
        <Metas metaMes={metaMes} metaAno={metaAno} />

        <Faturamento tipoFaturamento={'Dia'} valor={faturamentoDiaFormatado} porcentagem={diaPorcentagem} delay={0}/>
        <Faturamento tipoFaturamento={'semana'} valor={faturamentoSemanaFormatado} porcentagem={semanaPorcentagem} delay={30}/>
        <Faturamento tipoFaturamento={'Mês'} valor={faturamentoMesFormatado} porcentagem={mesPorcentagem} delay={60}/>
        <Faturamento tipoFaturamento={'Ano'} valor={faturamentoAnoFormatado} porcentagem={anoPorcentagem} delay={90}/>

        <div className='flex min-w-[250px] max-w-full items-center rounded-t-lg h-10 bg-branco mr-4 ml-4 mt-4 mb-0 border-b-2'>
          <select value={selectedOption} onChange={handleSelectChange} className='bg-branco ml-1 h-7 cursor-pointer '>
            <option value={anoAtual}>
              Faturamento de {anoAtual}
            </option>
            <option value={anoAtual -1} className=''>Faturamento de {anoAtual -1}</option>
            <option value={anoAtual -2}>Faturamento de {anoAtual -2}</option>
            <option value={anoAtual -3}>Faturamento de {anoAtual -3}</option>
          </select>
        </div>
        <div id='background GraficoAnual'>
          <GraficoAnual />
        </div>

      </div>
      {/* <Footer /> */}
    </div>
    )
    
};

export default DashboardComponent;