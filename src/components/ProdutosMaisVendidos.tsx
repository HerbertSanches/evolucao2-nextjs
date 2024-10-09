import React, { useEffect, useState } from "react";
import api from "@/services/api";


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
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        const fetchDataProdutosMaisVendidos = async () => {
            const responseMetaMesAno = await api.get(`venda/listarmaisvendidos/${idEmpresa}/${quantidadeValorSelecionado}/${anoSelecionado}/${mesSelecionado}`,{
                headers: {
                    'Authorization': `Bearer ${tokenHeader}`
                }
            });

            setMaisVendidos(responseMetaMesAno.data.buscar);
            console.log(responseMetaMesAno.data);
            console.log(responseMetaMesAno);
        };

        fetchDataProdutosMaisVendidos();
    }, [mesSelecionado, anoSelecionado, quantidadeValorSelecionado])





    const handleClick = (mes: number) => {
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
    return(
        <>
        <div className="flex space-x-3 overflow-x-auto py-2 bg-azulEscuro ">
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

          <select value={anoSelecionado} onChange={handleSelectAnoChange} className='justify-center rounded-full p-1 items-center font-semibold mr-1 text-azulEscuro cursor-pointer '>
              <option value={anoAtual}>
              Vendas de {anoAtual}
              </option>
              <option value={anoAtual - 1}>Vendas de {anoAtual - 1}</option>
              <option value={anoAtual - 2}>Vendas de {anoAtual - 2}</option>
              <option value={anoAtual - 3}>Vendas de {anoAtual - 3}</option>
          </select>
        </div>
        
        <main>
            <h1 className='flex text-azulEscuro items-center justify-center font-bold text-xl mt-3 mb-3'>
                Dashboard 10 Mais Vendidos
            </h1>

            <div className="flex flex-col ml-3 mr-3 mt-3 pb-2 bg-cinza rounded-[8px] h-auto shadow-md">
                <div className={`${mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado) ? "h-7 flex justify-end": ""}`}>
                    { mesAtual !== mesSelecionado || anoAtual !== Number(anoSelecionado)  ? (
                    <>
                        <button  id='btnFiltro' onClick={handleResetarMesAno} 
                        className='text-azulEscuro text-[8px] mt-2 mr-4 bg-branco rounded-md p-1 shadow-md '>
                        Filtrado: mês {mesSelecionado} ano {anoSelecionado} X
                        </button>
                    </>
                    ) : null}  
                </div> 

                <div className="ml-2 mr-2 mt-2 pb-2 bg-branco rounded-md shadow-md">
                    <div className="flex flex-row ml-3 mr-3 p-1 mt-1 justify-between text-azulClaro items-center text-base font-semibold border-b-3 border-solid border-cinza">
                        <h1 className="ml-3">Produtos Mais Vendidos</h1>
                        <select value={quantidadeValorSelecionado} onChange={handleSelectValorQuantidadeChange} className='bg-branco text-right justify-center rounded-full p-1 items-end font-semibold mr-1 text-azulClaro cursor-pointer '>
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
                                className="flex px-4 min-w-24 h-7 rounded-full items-center text-14 justify-center truncate text-center"
                            >
                                {maisVendidos.pr_descricao}
                            </span>

                            <span 
                                className="flex w-auto px-4 min-w-24 h-7 rounded-full p-1 items-center text-14 justify-center text-center"
                            >
                                {maisVendidos.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            
                            
                        </div>
                    ))}
                </div>
            </div>
        </main>
        </>
            
        
    )
}

export default ProdutosMaisVendidos;