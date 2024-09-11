"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import api from '@/services/api';
import Image from 'next/image';
import DoughnutChartWithCenterText from './DoughnutChart';
import Usuario from "/public/assets/images/usuario-azul.png"

interface Funcionario {
    mf_histdtcadastro: string;
    mf_histuscadastro: number;
    mf_id: number;
    mf_idfuncionario: number;
    mf_idmeta: number;
    mf_vlrabr: number;
    mf_vlrago: number;
    mf_vlrdez: number;
    mf_vlrfev: number;
    mf_vlrjan: number;
    mf_vlrjul: number;
    mf_vlrjun: number;
    mf_vlrmai: number;
    mf_vlrmar: number;
    mf_vlrnov: number;
    mf_vlrout: number;
    mf_vlrset: number;
    ps_nomerazao: string;
    total_mes: number;
    [key: string]: any;
}
  
const Meses: React.FC = () => {
  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth()+1;

  const anoAtualString = anoAtual.toString();
  const [mesSelecionado, setMesSelecionado] = useState<number>(mesAtual);
  const containerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de meses
  const [anoSelecionado, setAnoSelecionado] = useState<string>(anoAtualString); 
  const [metafuncionario, setMetaFuncionario] = useState<Funcionario[]>([]);
  const [metaIndividual, setMetaIndividual] = useState('')

  // Array de meses e seus respectivos valores
  const meses = [
    { nome: 'Janeiro', valor: 1 },
    { nome: 'Fevereiro', valor: 2 },
    { nome: 'Março', valor: 3 },
    { nome: 'Abril', valor: 4 },
    { nome: 'Maio', valor: 5 },
    { nome: 'Junho', valor: 6 },
    { nome: 'Julho', valor: 7 },
    { nome: 'Agosto', valor: 8 },
    { nome: 'Setembro', valor: 9 },
    { nome: 'Outubro', valor: 10 },
    { nome: 'Novembro', valor: 11 },
    { nome: 'Dezembro', valor: 12 },
  ];

  const mesParaChave: { [key: number]: string }  = {
    1: 'mf_vlrjan',
    2: 'mf_vlrfev',
    3: 'mf_vlrmar',
    4: 'mf_vlrabr',
    5: 'mf_vlrmai',
    6: 'mf_vlrjun',
    7: 'mf_vlrjul',
    8: 'mf_vlrago',
    9: 'mf_vlrset',
    10: 'mf_vlrout',
    11: 'mf_vlrnov',
    12: 'mf_vlrdez'
  };

  const chaveMetaMes:string = mesParaChave[mesSelecionado];
  console.log(chaveMetaMes)
  
  // useEffect para definir o mês atual ao carregar o componente e ajustar o scroll
  useEffect(() => {
    const mesAtual = new Date().getMonth() + 1; // getMonth() retorna o mês de 0 a 11, por isso +1
    // setMesSelecionado(mesAtual);

    // Ajusta o scroll para o mês atual
    if (containerRef.current) {
      const element = containerRef.current.querySelector(`[data-mes='${mesSelecionado}']`);
      if (element) {
        (element as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    }
  }, [mesSelecionado, anoSelecionado]);

  useEffect (() => {
    const fetchVendasFuncionario = async () => {
      const idEmpresa = localStorage.getItem('idEmpresa');
      const tokenHeader = localStorage.getItem('token');

      const responseVendasFuncionario =  await api.get(`metafuncionario/metafaturamento/${idEmpresa}/${anoSelecionado}/${mesSelecionado}`,{
          headers: {
          'Authorization': `Bearer ${tokenHeader}`
          }
      });
      console.log('Vendas Funcionário: ', responseVendasFuncionario)

      setMetaFuncionario(responseVendasFuncionario.data.buscar)
      setMetaIndividual(responseVendasFuncionario.data.buscar.chaveMetaMes)
    }

    fetchVendasFuncionario();
   
  }, [mesSelecionado, anoSelecionado]);
  // mesSelecionado, anoSelecionado
  
  console.log(metafuncionario)
  // Função para lidar com o clique em um mês
  const handleClick = (mes: number) => {
    setMesSelecionado(mes);
    console.log(`Mês selecionado: ${mes}`);
  };

  function resetarMesAno() {
    setAnoSelecionado(anoAtual.toString());
    setMesSelecionado(mesAtual)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAnoSelecionado(event.target.value); // Convertendo o valor para número
    console.log(`Ano selecionado: ${event.target.value}`);
  };
  console.log(mesSelecionado)
  console.log(mesAtual)

  
  return (
    <>
      <Header />
      <div className="flex space-x-3 overflow-x-auto py-2 bg-azulEscuro " ref={containerRef}>
          {meses.map((mes) => (
          <button
              key={mes.valor}
              className={`px-4 min-w-24 h-7 bg-branco rounded-full p-1 items-center font-semibold text-14 justify-center ${
                mesSelecionado === mes.valor
                  ? 'bg-green-400 text-white '
                  : 'text-azulEscuro'
              }`}
              onClick={() => handleClick(mes.valor)}
              data-mes={mes.valor} // Adiciona o valor do mês como um data attribute
          >
              {mes.nome}
          </button>
          ))}

          <select value={anoSelecionado} onChange={handleSelectChange} className='justify-center rounded-full p-1 items-center font-semibold bg-branco mr-1 text-azulEscuro cursor-pointer '>
              <option value={anoAtual}>
              Vendas de {anoAtual}
              </option>
              <option value={(anoAtual -1)}>Vendas de {anoAtual -1}</option>
              <option value={anoAtual - 2}>Vendas de {anoAtual - 2}</option>
              <option value={anoAtual - 3}>Vendas de {anoAtual - 3}</option>
          </select>
      </div>
            
      
      <h1 className='flex text-azulEscuro  bg-red-200items-center justify-center font-bold text-xl mt-3 mb-3'>Dashboard Por Vendedor</h1>

      <div className='flex flex-col ml-3 mr-3 mt-3 mb-4 pt-[1px] pb-[13px] bg-cinza rounded-[8px] h-auto'>  
      { mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado)  ? (
        <>
          <button  id='btnFiltro' onClick={resetarMesAno} 
            className='text-azulEscuro text-[8px] mt-2 mr-7 bg-branco rounded-md p-1 w-max-50px shadow-md justify-center items-center fixed right-0 '>
            Filtrado: mês {mesSelecionado} ano {anoSelecionado} X
          </button>
        </>
      ) : null}  

        <div className={`${mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado) ? "h-7": ""}`}></div> 

        {metafuncionario.map((funcionario, index) => (

          <div key={index} className="bg-branco rounded-lg p-4 flex items-center 
                                        justify-between shadow-global ml-4 mr-4 mt-3" >

            <div className="flex items-center">
              <Image src={Usuario} alt='' className="h-12 w-12 object-contain text-pink-700" />
              <div className="ml-4 truncate">
                <p className="text-blue-800 font-bold text-[15px] truncate">{funcionario.ps_nomerazao}</p>
                <p className="text-blue-800 text-lg text-[18px]">R$: {funcionario.total_mes}</p>
                <p className="text-blue-800 text-xs">Meta R$: {funcionario[chaveMetaMes]}</p>
              </div>
            </div>

            <div className="flex items-center justify-center relative " style={{ width: '64px', height: '64px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
               <DoughnutChartWithCenterText porcentagem={Number(((funcionario.total_mes / funcionario[chaveMetaMes])* 100).toFixed(0))}/>
              </div>
            </div>

          </div>
        ))}
      </div> 
    </>
  );
};

export default Meses;