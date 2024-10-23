import React, {useState, useEffect} from "react";
import { darkMode } from "@/services/comum.utils";

const MesesComponent =  ({ onMesSelecionado }: any) => {
    const mesAtual = new Date().getMonth()+1;
    const [mesSelecionado, setMesSelecionado] = useState(mesAtual);
    const [mode, setMode] = useState<string | null>('');
    
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

    const handleMesClick = (mes: number) => {
        setMesSelecionado(mes);
        if (onMesSelecionado) {
            onMesSelecionado(mes);
            console.log(mes)
        }
    };
   
    useEffect(() => {
        setMode(darkMode())
    },[mode])

    console.log(mode)

  return(
    <span>
        <div className="flex space-x-3 overflow-x-auto py-2 bg-azulEscuro ">
          {meses.map((mes) => (
            <button
                key={mes.valor}
                className={`px-4 min-w-24 h-7 ${mode === 'S' ? 'bg-dark' : 'bg-azulEscuro'} rounded-full p-1 items-center font-semibold fonte-inter text-16 text-white justify-center ${
                    mesSelecionado === mes.valor
                    ? 'azulclaro '
                    : ''
                }`}
                onClick={() => handleMesClick(mes.valor)}
                data-mes={mes.valor} // Adiciona o valor do mês como um data attribute
            >
                {mes.nome}
            </button>
            ))}
        </div>
    </span>
  )
}

export default MesesComponent;






