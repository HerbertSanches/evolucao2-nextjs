"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import api from '@/services/api';

const Meses: React.FC = () => {
  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth()+1;

  const anoAtualString = anoAtual.toString();
  const [mesSelecionado, setMesSelecionado] = useState<number>(mesAtual);
  const containerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de meses
  const [anoSelecionado, setAnoSelecionado] = useState<string>(anoAtualString); 
  const [metafuncionario, setMetaFuncionario] = useState('');

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

  // useEffect para definir o mês atual ao carregar o componente e ajustar o scroll
  useEffect(() => {
    const mesAtual = new Date().getMonth() + 1; // getMonth() retorna o mês de 0 a 11, por isso +1
    setMesSelecionado(mesAtual);

    // Ajusta o scroll para o mês atual
    if (containerRef.current) {
      const element = containerRef.current.querySelector(`[data-mes='${mesAtual}']`);
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
    }

    fetchVendasFuncionario();
   
  }, []);

  console.log(metafuncionario)
  // Função para lidar com o clique em um mês
  const handleClick = (mes: number) => {
    setMesSelecionado(mes);
    console.log(`Mês selecionado: ${mes}`);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAnoSelecionado(event.target.value); // Convertendo o valor para número
    console.log(`Ano selecionado: ${event.target.value}`);
  };

  return (
    <>
        <Header />
        {/* <div className="overflow-x-auto whitespace-nowrap bg-azulEscuro h-auto items-center justify-center" ref={containerRef}> */}
            <div className="flex space-x-3 overflow-x-auto py-2 bg-azulEscuro " ref={containerRef}>
                {meses.map((mes) => (
                <button
                    key={mes.valor}
                    className={`px-4 min-w-24 h-7  bg-branco rounded-full p-1 items-center font-semibold text-14 justify-center ${
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
        {/* </div> */}
        <h1 className='text-red-500'>Dashboard Por Vendedor</h1>
    </>
  );
};

export default Meses;

