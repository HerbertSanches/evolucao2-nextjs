// const RESTCHAVE_REQUEST = '$4060_REST@Evol#Sistema'

// const getSHA = (input) => {
//   const hash1 = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex).slice(0, 64);
//   const hash2 = CryptoJS.SHA256(hash1).toString(CryptoJS.enc.Hex);
//   const hash3 = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
//   return hash2 + hash3;
// };
import { NextApiRequest, NextApiResponse } from 'next';
import api from '@/services/api';
import { tokenRoot, TToken } from '@/class/base/evolucaodashboard_base_token';
import { TUsuario, usuarioRoot } from '@/class/base/evolucaodashboard_base_usuario';
import { useAuth } from '@/context/AuthContext';
import { TProduto,TProdutoLote } from '@/class/base/evolucaodashboard_base_produto';

const masterKey = '#-6!HY]sK!AHDqg1';
const getKey = (masterKey:string) => {
  let result = Array.from({ length: 256 }, (_, i) => i);
  let k = new Array(256).fill(0);
  for (let i = 0; i < k.length; i++) {
    k[i] = masterKey.charCodeAt((i * 2) % masterKey.length) +
           masterKey.charCodeAt(((i * 2) + 1) % masterKey.length);
  }
  let x = 0;
  for (let i = 0; i < result.length; i++) {
    x = (x + result[i] + k[i]) % result.length;
    [result[i], result[x]] = [result[x], result[i]];  // Swap elements
  }
  return result;
};

const encode = async (pValue:string, masterKey:string) => {
  let result = '';
  let i = 0;
  let x = 0;
  let aux = getKey(masterKey);
  for (let secao = 0; secao < pValue.length; secao++) {
    let secaoTxt = pValue.charCodeAt(secao);
    i = (i + 1) % aux.length;
    x = (x + aux[i]) % aux.length;
    [aux[i], aux[x]] = [aux[x], aux[i]];
    let t = (aux[i] + aux[x]) % aux.length;
    result += intToHex(secaoTxt ^ aux[t], 2);
  }
  return result;
};

const intToHex = (num:number, length:number) => {
  let hex = num.toString(16);
  return hex.padStart(length, '0').toUpperCase();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, input, input2, input3, input4 } = req.body;

    try {
      let result;
      switch(type) {
        
        case "encode":
          const encoded = await encode(input, masterKey);
          res.status(200).json({ result: encoded });
          break

        case "token":
          const token = await api.post("autenticacao/create-token", {
            [TToken.FIELD1]:  process.env.RESTCHAVE_REQUEST,
            [TToken.FIELD2]: input,
            [TToken.FIELD3]: input2,
            [TToken.FIELD4]: input3,
          });
          result= token.data;
          // const tokenObj =  new class tokenRoot()
          res.status(200).json({ data: result });
          break
          
        case "login":
          const loginResponse = await api.post("usuario/login", {
            [TUsuario.FIELD2]: input3,
            [TUsuario.FIELD4]: input,
            [TUsuario.FIELD5]: input2,
            "us_permissaoapp": 50,
          });

          result = loginResponse.data;
          console.log(result)
          console.log(loginResponse.data.usuario[0].us_idfuncionario)

          if (loginResponse.data.usuario[0].us_idfuncionario) {
            res.status(200).json({ data: result });
          } else {
            res.status(400).json({ data: result });
          }
          break;
        
        case "sqlReceber":
          const responseContasReceber =  await api.post('buscar/generica', process.env.SQL_CONTAS_RECEBER,{});
          result = responseContasReceber.data;
          res.status(200).json({ data: result });
          break;
        
        case "sqlPagar":
          const responseContasPagar =  await api.post('buscar/generica', process.env.SQL_CONTAS_PAGAR,{});
          result = responseContasPagar.data;
          res.status(200).json({ data: result });
          break;

        case "sqlDataPagar":
          const sqlDoPagar = "{\"sql\":\"SELECT pessoa.ps_id, pessoa.ps_nomerazao, doc.dc_descricao, fconta.fc_idmovimento, fconta.fc_dtemissao, fconta.fc_dtvencimento, (current_date - INTERVAL '1 DAY') - fconta.fc_dtvencimento as atraso, fconta.fc_valor, fconta.fc_taxa, sum((fconta.fc_valor + fconta.fc_taxa)) as total FROM tb_financeiroconta fconta INNER JOIN tb_pessoa as pessoa on fconta.fc_idcliente = ps_id INNER JOIN tb_documento as doc on fconta.fc_iddocumento = dc_id where fc_dtvencimento <= current_timestamp and fc_tiporegistro = 2 GROUP BY pessoa.ps_id, pessoa.ps_nomerazao, doc.dc_descricao, fconta.fc_idmovimento, fconta.fc_dtemissao, fconta.fc_dtvencimento, fconta.fc_valor, fconta.fc_taxa\"}"
          const encodedPagar = await encode(sqlDoPagar, masterKey);
          const responseDataContasPagar =  await api.post('buscar/generica', encodedPagar,{});
          result = responseDataContasPagar.data;
          res.status(200).json({ data: result });
          break;

        case "sqlValidade":
          const where = ` where ${TProdutoLote.FIELD5} <= current_timestamp and ${TProdutoLote.FIELD15} > 0`;
          const sqlValidade = {sql: `select p.${TProduto.FIELD1}, p.${TProduto.FIELD2}, p.${TProduto.FIELD5}, p.${TProduto.FIELD3}, l.${TProdutoLote.FIELD4}, l.${TProdutoLote.FIELD5}, l.${TProdutoLote.FIELD15} from ${TProduto.TABELA} p inner join ${TProdutoLote.TABELA} l on p.${TProduto.FIELD1} = l.${TProdutoLote.FIELD3} ${where}`};
          const encodeValidade = await encode(JSON.stringify(sqlValidade), masterKey);
          const responseDataValidade = await api.post('buscar/generica', encodeValidade, {});
          result = responseDataValidade.data;
          res.status(200).json({ data: result });
          break;
      }
      
        

    } catch (error) {
      console.error("Erro ao criptografar:", error);
      res.status(500).json({ error: "Erro durante a criptografia" });
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} Não Permitido`);
  }
}

export function chamarMetas () {
  const { token } = useAuth();
}