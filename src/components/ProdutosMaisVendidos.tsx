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
    
    const tipoFiltro = 1;
    useEffect(() => {
        const idEmpresa = localStorage.getItem('idEmpresa');
        const tokenHeader = localStorage.getItem('token');
        const fetchDataProdutosMaisVendidos = async () => {
            const responseMetaMesAno = await api.get(`venda/listarmaisvendidos/${idEmpresa}/${tipoFiltro}/${anoSelecionado}/${mesSelecionado}`,{
                headers: {
                    'Authorization': `Bearer ${tokenHeader}`
                }
            });

            setMaisVendidos(responseMetaMesAno.data.buscar)
            console.log(responseMetaMesAno.data)
            console.log(responseMetaMesAno)
        };

        fetchDataProdutosMaisVendidos();
    }, [])


    return(
        <main>
            <h1 className='flex text-azulEscuro items-center justify-center font-bold text-xl mt-3 mb-3'>
                Dashboard 10 Mais Vendidos
            </h1>

            <div className="flex flex-col ml-3 mr-3 mt-3 pb-3 bg-cinza rounded-[8px] h-auto">
                
                <div className="ml-2 mr-2 mt-2 pb-2 bg-branco rounded-md">
                    <div className="flex flex-row ml-3 mr-3 p-1 mt-1 justify-between items-center text-base font-semibold border-b-3 border-solid border-cinza">
                        <h1 className="ml-3">Produtos Mais Vendidos</h1>
                        <h1 className="mr-1">Quantidade</h1>
                    </div>
                    {maisVendidos.map((maisVendidos) => (
                        <div className="flex items-center justify-between border-b border-solid ml-2 mr-2 p-1 mt-1 border-cinza ">
                            <span
                                key={maisVendidos.pr_descricao}
                                title={maisVendidos.pr_descricao}
                                className={`px-4 min-w-24 h-7 bg-branco rounded-full p-1 items-center text-14 justify-center truncate`}
                            >
                                {maisVendidos.pr_descricao}
                            </span>

                            <span
                                key={maisVendidos.pr_descricao}
                                className={`flex w-a px-4 min-w-24 h-7 rounded-full p-1 items-center text-14 justify-center `}
                            >
                                {maisVendidos.total}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
            
        
    )
}

export default ProdutosMaisVendidos;