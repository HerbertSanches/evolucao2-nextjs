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
          res.status(200).json({ data: result });
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
  console.log(token.token)
}