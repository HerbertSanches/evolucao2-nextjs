import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ChartOptions,
  ChartEvent,
} from 'chart.js';
import { ChartDataset } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ChartDataLabels
);

import { Chart } from 'chart.js';

interface Metas {
  mt_vlrjan: any;
  mt_vlrfev: any;
  mt_vlrmar: any;
  mt_vlrabr: any;
  mt_vlrmai: any;
  mt_vlrjun: any;
  mt_vlrjul: any;
  mt_vlrago: any;
  mt_vlrset: any;
  mt_vlrout: any;
  mt_vlrnov: any;
  mt_vlrdez: any;
}

interface Vendas {
  nf_mesextenso: any;
  nf_messoma: any;

}

type props = {
  sendValueToParent: (value: string) => void;
  vendas: Vendas[];
  metas:Metas[];
}

const GraficoAnual = ({ sendValueToParent, vendas, metas }:props) => {
  console.log(vendas)
 
  console.log(metas)
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Obtém o mês atual (0-11)
  const months = [];

  const meses = [
    { mes: 1, nome: 'Jan', meta: 0, real: 0 },
    { mes: 2, nome: 'Fev', meta: 0, real: 0 },
    { mes: 3, nome: 'Mar', meta: 0, real: 0 },
    { mes: 4, nome: 'Abr', meta: 0, real: 0 },
    { mes: 5, nome: 'Mai', meta: 0, real: 0 },
    { mes: 6, nome: 'Jun', meta: 0, real: 0 },
    { mes: 7, nome: 'Jul', meta: 0, real: 0 },
    { mes: 8, nome: 'Ago', meta: 0, real: 0 },
    { mes: 9, nome: 'Set', meta: 0, real: 0 },
    { mes: 10, nome: 'Out', meta: 0, real: 0 },
    { mes: 11, nome: 'Nov', meta: 0, real: 0 },
    { mes: 12, nome: 'Dez', meta: 0, real: 0 },
  ];


  if (metas) {
    for (let i = 0; i < meses.length; i++) {
      const mes = meses[i].mes;

      switch (mes) {
          case 1:
              meses[i].meta = metas[0].mt_vlrjan || 0;
              break;
          case 2:
              meses[i].meta = metas[0].mt_vlrfev || 0;
              break;
          case 3:
              meses[i].meta = metas[0].mt_vlrmar || 0;
              break;
          case 4:
            meses[i].meta = metas[0].mt_vlrabr || 0;
            break;
          case 5:
            meses[i].meta = metas[0].mt_vlrmai|| 0;
            break;
          case 6:
              meses[i].meta = metas[0].mt_vlrjun || 0;
              break;
          case 7:
            meses[i].meta = metas[0].mt_vlrjul || 0;
              break;
          case 8:
            meses[i].meta = metas[0].mt_vlrago || 0;
              break;
          case 9:
            meses[i].meta = metas[0].mt_vlrset || 0;
              break;
          case 10:
            meses[i].meta = metas[0].mt_vlrout || 0;
              break;
          case 11:
            meses[i].meta = metas[0].mt_vlrnov || 0;
              break;
          case 12:
            meses[i].meta = metas[0].mt_vlrdez || 0;
              break;
      }
    }
  }

  if (vendas) {
    vendas.forEach((venda) => {
      const mesNome = venda.nf_mesextenso.substring(0, 3).toLowerCase(); 
      const mesEncontrado = meses.find(m => m.nome.toLowerCase() === mesNome); 
  
      if (mesEncontrado) {
        mesEncontrado.real = venda.nf_messoma || 0;
      }
    });
  }

  for (let i = 0; i <= currentMonth; i++) {
    const date = new Date(currentDate.getFullYear(), i, 1);
    const monthName = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
    months.push(monthName);
  }
  console.log(months)

  const chartRef = useRef<Chart<'bar'> | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('');

  const data: any = {
    labels: months,
    datasets: [
      {
        label: 'Meta',
        data: meses.slice(0, currentMonth + 1).map(mes => mes.meta),
        backgroundColor: '#003473',
        datalabels: {
          display: false,
        },
      } as ChartDataset<'bar', number[]>,
      {
        type: 'bar' as const,
        label: 'Real',
        data:  meses.slice(0, currentMonth + 1).map(mes => mes.real),
        backgroundColor: '#0066FF',
        stack: 'Stack 0',
        datalabels: {
          display: false,
        },
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        text: 'Stacked Bar and Line Chart',
      },
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      datalabels: {
        display: true,
        color: 'white',
        anchor: 'end',
        align: 'start',
        formatter: (value: any) => value.toFixed(0),
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    onClick: (event: ChartEvent) => {
      const chart = chartRef.current;

      if (chart) {
        const points = chart.getElementsAtEventForMode(event as any, 'nearest', { intersect: true }, true);

        if (points.length && chart.data.labels) {
          const firstPoint = points[0];
          const label = chart.data.labels[firstPoint.index] as string;
          setSelectedMonth(label); // Atualiza o estado com o mês clicado
        }
      }
    },
  };
  console.log(selectedMonth)

  useEffect(() => {
    sendValueToParent(selectedMonth);
  }, [selectedMonth])
  
  console.log(meses)
  return (
    <div 
    //animate-slide-up
    className="min-w-[250px] max-w-full max-h-[500px] bg-branco rounded-b-lg mr-4 ml-4 mt-0 ">
      <Bar ref={chartRef} data={data} options={options} />
      {/* <div >
        Selected Month: <strong>{selectedMonth}</strong>
      </div> */}
    </div>
  );
};

export default GraficoAnual;