import React, { useEffect, useState, useReducer } from 'react';
import Metas  from '../components/Metas'
import Faturamento from './Faturamento';
import '../app/globals.css'
import GraficoAnual from './GraficoAnual'
import api from '@/services/api';
import LoadingPadrao from '@/app/loading';

const forceUpdateReducer = (x: number) => x + 1;

const DashboardComponent: React.FC = () => {
 
  const [renderTrigger, forceRender] = useReducer(forceUpdateReducer, 0);

  const [metaMes, setMetaMes] = useState(0);
  const [metaAno, setMetaAno] = useState(0);
  

  const [dataMeta, setDataMeta] = useState<any>(null);
  const [dataFaturamento, setDataFaturamento] = useState<any>(null);
  const [dataGraficoAnual, setDataGraficoAnual] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const anoAtual = new Date().getFullYear();

  
  const mesAtual = new Date().getMonth()+1;

  const anoAtualString = anoAtual.toString();

  const [receivedValue, setReceivedValue] = useState(mesAtual);
  const [selectedOption, setSelectedOption] = useState<string>(anoAtualString); 
  

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
  
  const chaveMetaMes:string = mesParaChave[mesAtual-1];

  //----------------------------Meta------------------------------------------------
  useEffect(() => { 
    try {
      const fetchDataMetaMesAno = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')

        // const responseMetaMesAno =  await api.get(`/meta/0/${idEmpresa}/0`,{
        //   headers: {
        //     'Authorization': `Bearer ${tokenHeader}`
        //   }
        // });
        const ftInteger = 3; 
        const coIGUAL = 1; 
        const json = {
          meta: [
              {
              campo: 'mt_anovigente',
              valor: Number(selectedOption),
              condicao: coIGUAL,
              tipo: ftInteger
              },
              {
              campo: 'mt_idempresa',
              valor: Number(idEmpresa),
              condicao: coIGUAL,
              tipo: ftInteger
              }
          ]
      };

        const responseMetaMesAno =  await api.post('meta/localizar', json,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
          // condicoesMetas: JSON.stringify(condicoesMetas)
        });
        console.log(responseMetaMesAno)

        setDataMeta(responseMetaMesAno.data.meta)
        if (responseMetaMesAno.data.meta && responseMetaMesAno.data.meta[0] && responseMetaMesAno.data.meta[0].mt_vlrjan){
          setMetaMes(responseMetaMesAno.data.meta[0][chaveMetaMes]);
          console.log(metaMes)
          setMetaAno(responseMetaMesAno.data.meta[0].mt_vlranual); 
        }
        
      }
      // setIsLoading(false);
      fetchDataMetaMesAno();
    } catch (error) {
      console.error("Erro ao chamar metas")
    }
  }, [receivedValue, selectedOption]);
  console.log(metaMes)
//----------------------------Faturamento------------------------------------------------
  const [faturamentoAno, setFaturamentoAno] = useState(0);
  const [faturamentoMes, setFaturamentoMes] = useState(0);
  const [faturamentoSemana, setFaturamentoSemana] = useState(0);
  const [faturamentoDia, setFaturamentoDia] = useState(0);

  useEffect(() => { 
    try {
      const fetchDataFaturamento = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa')
        const tokenHeader = localStorage.getItem('token')

        const mes:number = Number(receivedValue)

        const responseFaturamento =  await api.get(`/venda/faturamento/${idEmpresa}/${selectedOption}/${mes}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });

        setDataFaturamento(responseFaturamento);
        setFaturamentoAno(responseFaturamento.data.buscar[0].total_ano);
        setFaturamentoMes(responseFaturamento.data.buscar[0].total_mes);
        setFaturamentoSemana(responseFaturamento.data.buscar[0].total_semana);
        setFaturamentoDia(responseFaturamento.data.buscar[0].total_dia);
      }
    
      fetchDataFaturamento();
    } catch (error) {
      console.error("Erro ao chamar faturamento")
    }
  }, [receivedValue, selectedOption]);

//-------------api gráfico anual--------------

  useEffect(() => { 
    try {
      const fetchDataGraficoAnual = async () => {
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario')

        
        const responseGraficoAnual = await api.get(`/notificacao/${idEmpresa}/${idUsuario}/${selectedOption}`,{
          headers: {
            'Authorization': `Bearer ${tokenHeader}`
          }
        });
  
        setDataGraficoAnual(responseGraficoAnual.data.notificacao[3].vendasmes)
      }

      fetchDataGraficoAnual();
    } catch (error) {
      console.error("Erro ao chamar gráfico anual")
    }
  }, [selectedOption]);



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
  //   return <LoadingPadrao />;
  // }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReceivedValue(mesAtual);
    setSelectedOption(event.target.value);
  };

  const handleValueFromChild = (value:any) => {
    const mesNumero: { [key: string]: number }  = {
      'jan': 1,
      'fev': 2,
      'mar': 3,
      'abr': 4,
      'mai': 5,
      'jun': 6,
      'jul': 7,
      'ago': 8,
      'set': 9,
      'out': 10,
      'nov': 11,
      'dez': 12
    };
    const mesSelecionadoGrafico: number = mesNumero[value]; 
    forceRender();
    
    if (mesSelecionadoGrafico !== undefined) {
      setReceivedValue(mesSelecionadoGrafico);
    }
  }; 

  function resetarMesAno() {
    setSelectedOption(anoAtual.toString());
    setReceivedValue(mesAtual)
  }

  console.log(selectedOption)
  console.log(receivedValue)
  console.log(mesAtual)
  console.log(anoAtual)
  return (
    <div className=''>
     
      <div className='ml-3 mr-3 mt-3 mb-4 pb-3 bg-cinza rounded-[8px] h-auto'>
        
        <Metas metaMes={metaMes} metaAno={metaAno} ano={selectedOption} />

        { mesAtual === receivedValue && anoAtual === Number(selectedOption)  ? (
          <>
            <Faturamento tipoFaturamento={'Dia'} valor={faturamentoDiaFormatado} porcentagem={diaPorcentagem} delay={0}/>
            <Faturamento tipoFaturamento={'semana'} valor={faturamentoSemanaFormatado} porcentagem={semanaPorcentagem} delay={30}/>
          </>
        ) : null}

        <Faturamento tipoFaturamento={'Mês'} valor={String(faturamentoMesFormatado)} porcentagem={mesPorcentagem} delay={60}/>
        <Faturamento tipoFaturamento={'Ano'} valor={faturamentoAnoFormatado} porcentagem={anoPorcentagem} delay={90}/>

        <div className='flex min-w-[250px] max-w-full items-center justify-between rounded-t-lg h-10 bg-branco mr-4 ml-4 mt-4 mb-0 border-b-2'>
          <select value={selectedOption} onChange={handleSelectChange} className='bg-branco ml-1 h-7 cursor-pointer '>
            <option value={anoAtual}>
              Faturamento de {anoAtual}
            </option>
            <option value={anoAtual -1} className=''>Faturamento de {anoAtual -1}</option>
            <option value={anoAtual -2}>Faturamento de {anoAtual -2}</option>
            <option value={anoAtual -3}>Faturamento de {anoAtual -3}</option>
          </select>

          <button onClick={resetarMesAno} className='text-azulEscuro text-[8px] mr-1 bg-cinza rounded-md p-1 w-max-50px shadow-md'>Filtrado: mês 9 ano 2023 X</button>
          {/* { mesAtual !== receivedValue || anoAtual !== Number(selectedOption)  ? (
          <>
            <button onClick={resetarMesAno} className='text-azulEscuro text-[8px] mr-1 bg-cinza rounded-md p-1 w-max-50px shadow-md'>Filtrado: mês {receivedValue} ano {selectedOption} X</button>
          </>
        ) : null} */}

          
        </div>

        <div id='background GraficoAnual'>
          {dataMeta && <GraficoAnual vendas={dataGraficoAnual} metas={dataMeta} sendValueToParent={handleValueFromChild} />} 
        </div>

      </div>
      {/* <Footer /> */}
    </div>
    )
    
};

export default DashboardComponent;