import React, { useEffect, useState } from 'react';
import api from '@/services/api';

interface AvisosValidadeMap {
  //notas pendentes
  vd_id: number;
  vd_tipovenda: string;
  vd_cliente: string;
  vd_histdtcadastro: string;
  vd_vlrtotal: number;

  //qntMinima
  pr_codigobarras: string;
  pe_qntminima: number;
  pe_qnt: number;

  //validade
  pl_dtvalidade: string;
  pl_lote: string;
  pl_quantidade: number;
  pr_descricao:string;
  pr_id: number;

  //contas receber
  ps_id: number;
  ps_nomerazao: string;
  fc_idmovimento: number;
  dc_descricao: string;
  fc_dtvencimento: string;
  total: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoAviso: string;
}


const ModalAvisos: React.FC<ModalProps> = ({ isOpen, onClose, tipoAviso }) => {
  const [tituloModal, setTituloModal] = useState("")
  const [tituloColuna1, setTituloColuna1] = useState("");
  const [tituloColuna2, setTituloColuna2] = useState("");
  const [tituloColuna3, setTituloColuna3] = useState("");
  const [tituloColuna4, setTituloColuna4] = useState("");
  const [tituloColuna5, setTituloColuna5] = useState("");

  const [coluna1, setColuna1] = useState("Coluna 1");
  const [coluna2, setColuna2] = useState("Coluna 2");
  const [coluna3, setColuna3] = useState("Coluna 3");
  const [coluna4, setColuna4] = useState("Coluna 4");
  const [coluna5, setColuna5] = useState("Coluna 5");

 
  const [notasPendentes, setNotasPendentes] = useState([]);
  const [qntMinima, setQntMinima] = useState([]);
  const [produtosVencer, setProdutosVencer] = useState([]);
  const [contasReceber, setContasReceber] = useState([]);
  const [avisosValidadeMap, setAvisosValidadeMap] = useState<AvisosValidadeMap[]>([])

  if (!isOpen) return null;

  switch (tipoAviso) {
    case "notasPendentes": 
      useEffect(() => {
        setTituloModal("Notas Pendentes");

        setTituloColuna1("Cód.");
        setTituloColuna2("Tipo Venda");
        setTituloColuna3("Cliente");
        setTituloColuna4("Dt Cadastro");
        setTituloColuna5("Total");

        const chamarNotasPendentes = async () => {
          const tokenHeader = localStorage.getItem('token');
          const idEmpresa = localStorage.getItem('idEmpresa');
          try {
            console.log("meu amigo...")
            const responseDataNotasPendentes = await api.get(`/venda/notaspendentes/${idEmpresa}`, {
              headers: {
                'Authorization': `Bearer ${tokenHeader}`
              }
            });

            console.log("chamou", responseDataNotasPendentes.data);

            if (responseDataNotasPendentes.data.venda.length > 0) {
              setNotasPendentes(responseDataNotasPendentes.data); // fazer loading com esse
              setAvisosValidadeMap(responseDataNotasPendentes.data.venda);
              console.log("chamou", responseDataNotasPendentes.data);
            }
          } catch (error) {
            console.error("Erro ao chamar notas pendentes")
          }
        }

        chamarNotasPendentes ();
      },[])
      break;

    case "qntMinima":
        useEffect(() => {
          setTituloModal("Quantidade Mínima");

          setTituloColuna1("Cód.");
          setTituloColuna2("Cód. de Barras");
          setTituloColuna3("Descrição");
          setTituloColuna4("Qtd Mínima");
          setTituloColuna5("Qtd.");

          const chamarQntMinima = async () => {
            try {
              const response = await fetch('/api/criptografia', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    type: 'sqlQntMinima', 
                  })
              });
              
              console.log(response)
              if (response.ok) {
                const responseDataQntMinima = await response.json();
                setQntMinima(responseDataQntMinima.data); // fazer loading com esse
                setAvisosValidadeMap(responseDataQntMinima.data.buscar);
                console.log("chamou", responseDataQntMinima.data);
              }
          } catch (error) {
              console.error("Erro ao chamar quantidade mínima")
            }
          }

          chamarQntMinima();
        },[])
        
        break; 

    case "produtosVencer": 
      useEffect(() => {
        setTituloModal("Produtos a Vencer");

        setTituloColuna1("Cód.");
        setTituloColuna2("Desc.");
        setTituloColuna3("Lote");
        setTituloColuna4("Dt Val.");
        setTituloColuna5("Qtd.");

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
                setProdutosVencer(responseDataValidade.data);// fazer loading com esse
                setAvisosValidadeMap(responseDataValidade.data.buscar);
                console.log("chamou", responseDataValidade.data);
              }
          } catch (error) {
              console.error("Erro ao chamar Validade")
          }
        }

        chamarValidade();
      },[])

      break;

    case "contasPagar":
    case "contasReceber": 
      useEffect(() => {
        if (tipoAviso === "contasReceber") {
          setTituloModal("Contas a Receber");
        } 

        if (tipoAviso === "contasPagar") { 
          setTituloModal("Contas a Pagar");
        }

        setTituloColuna1("Nome/Razão");
        setTituloColuna2("Cod. Movimento");
        setTituloColuna3("Descrição");
        setTituloColuna4("Dt Vencimento");
        setTituloColuna5("Total");

        console.log(tipoAviso)
        const chamarContasReceber = async () => {
          const inputTipoPagarReceber = tipoAviso === "contasReceber" ? 1 : 2;
          try {
            const response = await fetch('/api/criptografia', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  type: 'sqlPagarReceber', 
                  inputPagarReceber: inputTipoPagarReceber
                })
            });
    
            if (response.ok) {
              const responseDataContasReceber = await response.json();
              setContasReceber(responseDataContasReceber.data); // fazer loading com esse
              setAvisosValidadeMap(responseDataContasReceber.data.buscar);
              console.log("chamou", responseDataContasReceber.data);
            }
        } catch (error) {
            console.error("Erro ao chamar contas a Receber")
        }
      }
      console.log(avisosValidadeMap)
      chamarContasReceber();
    },[])

      break;
  }

  const formatarDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatarDateHora = (dataHora: string) => {
    return dataHora.split(' ')[0];
  };

  const formatarValor = (valorString: number): string => {
    return valorString.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="flex flex-col bg-white p-6 pt rounded-lg shadow-lg w-[90%] h-auto max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl mb-4">{tituloModal}</h2>
        <div  className='overflow-x-auto'>
          <table className="w-full text-left whitespace-nowrap bg-branco">
            <thead className='border-none mt-0 bg-branco border-4 top-0'>
              <tr>
                <th className="bg-branco border text-lg p-2 sticky top-0 ">{tituloColuna1}</th>
                <th className="bg-branco border text-lg p-2 sticky top-0">{tituloColuna2}</th>
                <th className="bg-branco border text-lg p-2 sticky top-0">{tituloColuna3}</th>
                <th className="bg-branco border text-lg p-2 sticky top-0">{tituloColuna4}</th>
                <th className="bg-branco border text-lg p-2 sticky top-0">{tituloColuna5}</th>
              </tr>
            </thead>
            <tbody>
              {tipoAviso === "notasPendentes" && Array.isArray(avisosValidadeMap) ? (
                avisosValidadeMap.map((item, index) => (
                  <tr className="hover:bg-blue-100 border-b-2" key={index}>
                    <td className="border p-2 truncate ">{item.vd_id}</td>
                    <td className="border p-2 truncate " >{item.vd_tipovenda}</td>
                    <td className="border p-2 truncate max-w-40" title={item.vd_cliente}>{item.vd_cliente}</td>
                    <td className="border p-2 truncate ">{formatarDateHora(item.vd_histdtcadastro)}</td>
                    <td className="border p-2 truncate ">{formatarValor(item.vd_vlrtotal)}</td>
                  </tr>
                ))
                ) : (
                  null
              )} 

              {tipoAviso === "produtosVencer" && Array.isArray(avisosValidadeMap) ? (
                avisosValidadeMap.map((item, index) => (
                  <tr className="hover:bg-blue-100 border-b-2" key={index}>
                    <td className="border p-2 truncate ">{item.pr_id}</td>
                    <td className="border p-2 truncate max-w-40" title={item.pr_descricao} >{item.pr_descricao}</td>
                    <td className="border p-2 truncate max-w-40" title={item.pl_lote}>{item.pl_lote}</td>
                    <td className="border p-2 truncate ">{formatarDate(item.pl_dtvalidade)}</td>
                    <td className="border p-2 truncate ">{formatarValor(item.pl_quantidade)}</td>
                  </tr>
                ))
                ) : (
                  null
              )} 

              {tipoAviso === "qntMinima" && Array.isArray(avisosValidadeMap) ? (
                avisosValidadeMap.map((item, index) => (
                  <tr className="hover:bg-blue-100 border-b-2" key={index}>
                    <td className="border p-2 truncate ">{item.pr_id}</td>
                    <td className="border p-2 truncate max-w-40" >{item.pr_codigobarras}</td>
                    <td className="border p-2 truncate max-w-40" title={item.pr_descricao}>{item.pr_descricao}</td>
                    <td className="border p-2 truncate ">{formatarValor(item.pe_qntminima)}</td>
                    <td className="border p-2 truncate ">{formatarValor(item.pe_qnt)}</td>
                  </tr>
                ))
                ) : (
                  null
              )} 
            
              {tipoAviso === "contasReceber" || tipoAviso === "contasPagar" && Array.isArray(avisosValidadeMap) ? (
                avisosValidadeMap.map((item, index) => (
                  <tr className="hover:bg-blue-100 border-b-2" key={index}>
                    <td className="border p-2 truncate max-w-40" title={item.ps_nomerazao}>{item.ps_nomerazao}</td>
                    <td className="border p-2 truncate ">{item.fc_idmovimento}</td>
                    <td className="border p-2 truncate max-w-40" title={item.dc_descricao}>{item.dc_descricao}</td>
                    <td className="border p-2 truncate ">{formatarDate(item.fc_dtvencimento)}</td>
                    <td className="border p-2 truncate ">{formatarValor(item.total)}</td>
                  </tr>
                ))
                ) : (
                null
              )} 
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end w-full">
          <button
            className="flex mb-0 bg-azulClaro text-white px-4 py-2 rounded ml-auto"
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
