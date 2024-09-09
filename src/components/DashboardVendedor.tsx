// import React from "react";

// const DashboardVendedor: React.FC = () => {

//     return (
//         <div className="flex overflow-x-auto space-x-4 py-2">
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Janeiro</button>
//             <button className="px-4 py-2 bg-green-400 text-white rounded-full">Fevereiro</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Março</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Abril</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Maio</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Junho</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Julho</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Agosto</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Setembro</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Outubro</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Novembro</button>
//             <button className="px-4 py-2 bg-white text-azulEscuro rounded-full">Dezembro</button>
//         </div>
//     )
// }

// export default DashboardVendedor;
"use client"

import React, { useState, useEffect, useRef } from 'react';

const Meses: React.FC = () => {
  const anoAtual = new Date().getFullYear();
  const anoAtualString = anoAtual.toString();
  const [mesSelecionado, setMesSelecionado] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de meses
  const [anoSelecionado, setAnoSelecionado] = useState<string>(); 
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
  }, []);

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
    <div className="overflow-x-auto whitespace-nowrap" ref={containerRef}>
      <div className="flex justify-around mt-4">
        {meses.map((mes) => (
          <button
            key={mes.valor}
            className={`px-4 py-2 ${
              mesSelecionado === mes.valor
                ? 'bg-green-400 text-white rounded-full'
                : 'text-blue-500'
            }`}
            onClick={() => handleClick(mes.valor)}
            data-mes={mes.valor} // Adiciona o valor do mês como um data attribute
          >
            {mes.nome}
          </button>
        ))}

        <select value={anoSelecionado} onChange={handleSelectChange} className='bg-branco ml-1 h-7 cursor-pointer '>
            <option value={anoAtual}>
              Vendas de {anoAtual}
            </option>
            <option value={(anoAtual -1)}>Vendas de {anoAtual -1}</option>
            <option value={anoAtual - 2}>Vendas de {anoAtual - 2}</option>
            <option value={anoAtual - 3}>Vendas de {anoAtual - 3}</option>
          </select>
      </div>
    </div>
  );
};

export default Meses;

