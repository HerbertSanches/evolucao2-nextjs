import React, { useEffect, useState } from "react";
import api from "../services/api";
import { darkMode } from "@/services/comum.utils";

interface produtosMaisVendidos {
    pr_descricao: string;
    total: number;
}

const ProdutosMaisVendidos = () => {
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth()+1;
    const anoAtualString = anoAtual.toString();
    const [mesSelecionado, setMesSelecionado] = useState(mesAtual);
    const [anoSelecionado, setAnoSelecionado] = useState<string>(anoAtualString); 
    const [maisVendidos, setMaisVendidos] = useState<produtosMaisVendidos[]>([]);
    const [quantidadeValorSelecionado, setQuantidadeValorSelecionado] = useState(0);
    const [mode, setMode] = useState<string | any>('')
    
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

    useEffect(() => {
        setMode(darkMode())
    },[mode]);

    useEffect(() => {
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        setMode(darkMode());
        const fetchDataProdutosMaisVendidos = async () => {
            const responseMetaMesAno = await api.get(`venda/listarmaisvendidos/${idEmpresa}/${quantidadeValorSelecionado}/${anoSelecionado}/${mesSelecionado}`,{});

            setMaisVendidos(responseMetaMesAno.data.buscar);
            console.log(responseMetaMesAno.data);
            console.log(responseMetaMesAno);
        };

        fetchDataProdutosMaisVendidos();
    }, [mesSelecionado, anoSelecionado, quantidadeValorSelecionado])

    const handleMesClick = (mes: number) => {
        setMesSelecionado(mes);
        console.log(`Mês selecionado: ${mes}`);
    };

    const handleSelectAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAnoSelecionado(event.target.value);
        console.log(`Ano selecionado: ${event.target.value}`);
    };

    const handleSelectValorQuantidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantidadeValorSelecionado(Number(event.target.value));
        console.log(`Mês selecionado: ${quantidadeValorSelecionado}`);
    };

    const handleResetarMesAno = () => {
        setAnoSelecionado(anoAtual.toString());
        setMesSelecionado(mesAtual)
    }

    console.log(mesSelecionado)
    console.log(anoSelecionado)
    console.log(quantidadeValorSelecionado)

    // const element = containerRef.current.querySelector(`[data-mes='${mesSelecionado}']`);
    // if (element) {
    //   (element as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'start' });
    // }


    return(
        <>
        <div className={`flex space-x-3 overflow-x-auto py-2 ${mode === 'true' ? 'bg-darkClaro' : 'bg-azulEscuro'} `}>
          {meses.map((mes) => (
            <button
                key={mes.valor}
                className={`px-4 min-w-24 h-7 rounded-full p-1 items-center font-semibold text-14 justify-center ${
                    mesSelecionado === mes.valor
                    ? mode === 'true' ? 'bg-azulClaro text-white' : 'bg-green-400 text-white'
                    : mode === 'true' ? 'bg-dark text-white' : 'bg-branco text-azulEscuro'
                }`}
                onClick={() => handleMesClick(mes.valor)}
                data-mes={mes.valor} // Adiciona o valor do mês como um data attribute
            >
                {mes.nome}
            </button>
            ))}

          <select value={anoSelecionado} onChange={handleSelectAnoChange} className={`${mode === 'true' ? 'bg-dark text-branco':'bg-branco text-azulEscuro'} justify-center rounded-full p-1 items-center font-semibold mr-1 text-azulEscuro cursor-pointer`}>
                <option value={anoAtual}>
                Vendas de {anoAtual}
                </option>
                <option value={anoAtual - 1}>Vendas de {anoAtual - 1}</option>
                <option value={anoAtual - 2}>Vendas de {anoAtual - 2}</option>
                <option value={anoAtual - 3}>Vendas de {anoAtual - 3}</option>
          </select>
        </div>
        
        <main>
           
            <h1 className={`flex ${mode === 'true' ? 'bg-darkClaro text-white' : 'bg-white text-azulEscuro'} items-center justify-center font-bold text-xl p-3`}>
                Dashboard 10 Mais Vendidos
            </h1>

            <div className={`${mode === 'true' ? 'bg-dark' : 'bg-white'} h-screen`}>

                <div className={`flex flex-col ml-3 mr-3 pb-2 ${mode === 'true' ? 'bg-dark' : 'bg-slate-300 bg-opacity-50'}  rounded-[8px] h-auto shadow-md`}>
                    <div className={`${mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado) ? 'h-7 flex justify-end': ''}`}>
                        { mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado)  ? (
                        <>
                            <button  id='btnFiltro' onClick={handleResetarMesAno} 
                            className='text-azulEscuro text-[8px] mt-2 mr-4 bg-branco rounded-md p-1 shadow-md '>
                            Filtrado: mês {mesSelecionado} ano {anoSelecionado} X
                            </button>
                        </>
                        ) : null}  
                    </div> 

                    <div className={`ml-2 mr-2 mt-2 pb-2 ${mode === 'true' ? 'bg-darkClaro' : 'bg-branco'} rounded-md shadow-md`}>
                        <div className={`flex flex-row ml-3 mr-3 p-1 mt-1 justify-between ${mode === 'true' ? 'text-branco' : 'text-azulEscuro'} items-center text-base font-semibold border-b-3 border-solid border-cinza`}>
                            <h1 className="ml-3">Produtos Mais Vendidos</h1>
                            <select value={quantidadeValorSelecionado} onChange={handleSelectValorQuantidadeChange} className={`bg-branco text-right justify-center rounded-full p-1 items-end font-semibold mr-1 ${mode === 'true' ? 'text-branco bg-darkClaro' : 'text-azulEscuro'} cursor-pointer`}>
                                <option value={0}>
                                    Quantidade
                                </option>
                                <option value={1}>Valor em R$</option>
                            </select>
                        </div>

                        {maisVendidos.map((maisVendidos) => (
                            <div className="flex items-center justify-between border-b border-solid ml-2 mr-2 p-1 mt-1 border-cinza"
                            key={maisVendidos.pr_descricao}
                            >
                                <span
                                    title={maisVendidos.pr_descricao}
                                    className={`flex px-4 min-w-24 h-7 rounded-full items-center text-14 ${mode === 'true' ? 'text-branco' : 'text-azulEscuro'} justify-center truncate text-center`}
                                >
                                    {maisVendidos.pr_descricao}
                                </span>

                                <span 
                                    className={`flex w-auto px-4 min-w-24 h-7 rounded-full p-1 items-center text-14 ${mode === 'true' ? 'text-branco' : 'text-azulEscuro'} justify-center text-center`}
                                >
                                    {maisVendidos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                
                                
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            
        </main>
        </>
                  
    )
}

export default ProdutosMaisVendidos;