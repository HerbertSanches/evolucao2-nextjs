import React, { useEffect, useState } from 'react';

interface AvisosValidadoMap {
    pl_dtvalidade: string;
    pl_lote: string;
    pl_quantidade: number;
    pr_descricao:string;
    pr_id: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoAviso: string;
}


const ModalAvisos: React.FC<ModalProps> = ({ isOpen, onClose, tipoAviso }) => {
    const [coluna1, setColuna1] = useState("Coluna 1");
    const [coluna2, setColuna2] = useState("Coluna 2");
    const [coluna3, setColuna3] = useState("Coluna 3");
    const [coluna4, setColuna4] = useState("Coluna 4");
    const [coluna5, setColuna5] = useState("Coluna 5");

    const [produtosVencer, setProdutosVencer] = useState([]);

    const [avisosValidadoMap, setAvisosValidadoMap] = useState<AvisosValidadoMap[]>([])

  if (!isOpen) return null;

  switch (tipoAviso) {
    case "1": 
        setColuna1("")
        break;

    case "qntMinima":
        useEffect(() => {
            setColuna1("Cód.");
            setColuna2("Desc.");
            setColuna3("Sim");
            setColuna4("Sim");
            setColuna5("Sim");
        },[])
        
        break; 

    case "produtosVencer": 
        useEffect(() => {
            setColuna1("Cód.");
            setColuna2("Desc.");
            setColuna3("Lote");
            setColuna4("Dt Val.");
            setColuna5("Qtd.");

            const chamarValidade = async () => {
                try {
                    const response = await fetch('/api/criptografia', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            type: 'sqlValidade', 
                        })
                    });
            
                    if (response.ok) {
                        const responseDataValidade = await response.json();
                        setProdutosVencer(responseDataValidade.data);
                        setAvisosValidadoMap(responseDataValidade.data.buscar);
                        console.log("CHAMOOOU");
                        console.log("chamou", responseDataValidade.data);
                        console.log(responseDataValidade);
                    }
                } catch (error) {
                    console.error("Erro ao chamar Validade")
                }
            }

            chamarValidade();
        },[])

        break;
  }

  const formatarDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%]">
        <h2 className="text-2xl mb-4">Tabela de Informações</h2>
        <div  className='overflow-x-auto'>
            <table className="w-full text-left whitespace-nowrap">
            <thead className='border-none'>
                <tr>
                <th className="border p-2">{coluna1}</th>
                <th className="border p-2">{coluna2}</th>
                <th className="border p-2">{coluna3}</th>
                <th className="border p-2">{coluna4}</th>
                <th className="border p-2">{coluna5}</th>

                </tr>
            </thead>
            <tbody>
                {Array.isArray(avisosValidadoMap) && avisosValidadoMap.map((item) => (
                <tr  className="hover:bg-azulClaro" key={item.pr_id}>
                    <td className="border p-2 truncate ">{item.pr_id}</td>
                    <td className="border p-2 truncate max-w-40" title={item.pr_descricao} >{item.pr_descricao}</td>
                    <td className="border p-2 truncate ">{item.pl_lote}</td>
                    <td className="border p-2 truncate ">{formatarDate(item.pl_dtvalidade)}</td>
                    <td className="border p-2 truncate ">{item.pl_quantidade}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAvisos;
