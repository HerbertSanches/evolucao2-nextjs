// const RESTCHAVE_REQUEST = '$4060_REST@Evol#Sistema'

// const getSHA = (input) => {+
//   const hash1 = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex).slice(0, 64);
//   const hash2 = CryptoJS.SHA256(hash1).toString(CryptoJS.enc.Hex);
//   const hash3 = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
//   return hash2 + hash3;
// };
import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../services/api';
import { TToken } from '@/class/base/evolucaodashboard_base_token';
import { TUsuario, usuarioRoot } from '@/class/base/evolucaodashboard_base_usuario';
import { useAuth } from '@/context/AuthContext';
import { TProduto,TProdutoLote, TProdutoEstoque } from '@/class/base/evolucaodashboard_base_produto';
import { TFinanceiroConta } from '@/class/base/evolucaodashboard_base_financeiroconta';
import { TPessoa } from '@/class/base/evolucaodashboard_base_pessoa';
import { TDocumento } from '@/class/base/evolucaodashboard_base_documento';
import twilio from 'twilio';

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
    const { type, input, input2, input3, inputPagarReceber, idEmpresa } = req.body;

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

          res.status(200).json({ data: token.data });
          break
          
        case "login":
          const loginResponse = await chamarLogin(input, input2, input3)

          if (loginResponse.usuario[0].us_idfuncionario) {
            res.status(200).json({ data: loginResponse });
          } else {
            res.status(400).json({ data: loginResponse });
          }
          break;

        case "sqlQuantidadePagarReceber":
          console.log('s')
          const responseDataContasPagarReceber = await sqlQuantidadePagarReceber(idEmpresa, inputPagarReceber);
          res.status(200).json({ data: responseDataContasPagarReceber });
          break;

        case "sqlValidade":
          console.log('chamou')   
          const responseDataValidade = await sqlValidade(idEmpresa);
          res.status(200).json({ data: responseDataValidade });
          break;

        case "sqlQntMinima":
          const ResponseSqlQntMinima = await sqlQntMinima(idEmpresa);
          console.log(ResponseSqlQntMinima)
          res.status(200).json({ data: ResponseSqlQntMinima });
          break
        
        case "sqlPagarReceber":
          const responseDataPagarReceber = await sqlPagarReceber(idEmpresa, inputPagarReceber);
          res.status(200).json({ data: responseDataPagarReceber });
          break
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

const sqlQuantidadePagarReceber = async (idEmpresa:number, inputPagarReceber:number) => {
  const sqlPagar = {sql: `
                          select 
                            * 
                          from 
                            vw_financeirocontacontagem 
                          where 
                            fc_idempresa = ${idEmpresa} 
                            and fc_tiporegistro = ${inputPagarReceber}`};

  const encodeContasPagar = await encode(JSON.stringify(sqlPagar), masterKey);
  const responseDataContasPagar = await api.post('buscar/generica', encodeContasPagar, {}); 
  return responseDataContasPagar.data;
}

const sqlValidade = async (idEmpresa:number) => {
  const whereValidade = ` where 
                            ${TProdutoLote.FIELD5} <= current_timestamp 
                            and ${TProdutoLote.FIELD15} > 0 
                            and ${TProdutoLote.FIELD2} = ${idEmpresa}`;

  const sqlValidade = {sql: `select 
                                p.${TProduto.FIELD1}, 
                                p.${TProduto.FIELD2}, 
                                p.${TProduto.FIELD5}, 
                                p.${TProduto.FIELD3}, 
                                l.${TProdutoLote.FIELD4}, 
                                l.${TProdutoLote.FIELD5}, 
                                l.${TProdutoLote.FIELD15} 
                              from 
                                ${TProduto.TABELA} p 
                              inner join ${TProdutoLote.TABELA} l on p.${TProduto.FIELD1} = l.${TProdutoLote.FIELD3} 
                              ${whereValidade}`};

  const encodeValidade = await encode(JSON.stringify(sqlValidade), masterKey);
  const responseDataValidade = await api.post('buscar/generica', encodeValidade, {});


  // const accountSid = 'AC91775b0355ffa7b544a80765a7951d03';
  // const client = require('twilio')(accountSid, authToken);


  // const authToken = '64954ba10c4fde27f2e43c00c3ae9df3';
  // const teste= 'VariavelTeste'


  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // client.messages
  //     .create({
  //         from: 'whatsapp:+14155238886',
  //         // contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
  //         body: `olá estou testando o Twilio integrado com o projeto dashboard web!`,
  //         // contentVariables: '{"1":"12/1","2":"3pm"}',
  //         to: 'whatsapp:+556992274949'
  //     })
  //     .then(message => console.log(`Mensagem enviada com sucesso!  SID: ${message.sid}`))
  //     .catch(error => console.error(`Erro ao enviar mensagem: ${error.message}`));

  return responseDataValidade.data;
}

const chamarLogin = async (input:number, input2:number, input3:string) => {
  const loginResponse = await api.post("usuario/login", {
    [TUsuario.FIELD4]: input,
    [TUsuario.FIELD5]: input2,
    [TUsuario.FIELD2]: input3,
    "us_permissaoapp": 50,
  });

  return loginResponse.data;
}

const sqlPagarReceber = async (idEmpresa:number, inputPagarReceber:number) => {

  const wherePagarReceber = `WHERE ${TFinanceiroConta.FIELD11} <= NOW() + INTERVAL '7 DAYS' 
                        AND ${TFinanceiroConta.FIELD9} = ${inputPagarReceber} 
                        AND ${TFinanceiroConta.FIELD30} IS NULL 
                        AND ${TFinanceiroConta.FIELD15} <> '1' 
                        AND ${TFinanceiroConta.FIELD14} <> '1'  
                        AND ${TFinanceiroConta.FIELD2} = ${idEmpresa}`;

  const sqlPagarReceber = {sql:`SELECT pessoa.${TPessoa.FIELD1}, pessoa.${TPessoa.FIELD2}, doc.${TDocumento.FIELD3}, fconta.${TFinanceiroConta.FIELD8}, fconta.${TFinanceiroConta.FIELD10}, fconta.${TFinanceiroConta.FIELD11}, (current_date - INTERVAL '1 DAY') - fconta.${TFinanceiroConta.FIELD11} as atraso, fconta.${TFinanceiroConta.FIELD17}, fconta.${TFinanceiroConta.FIELD18}, sum((fconta.${TFinanceiroConta.FIELD17} + fconta.${TFinanceiroConta.FIELD18})) as total FROM ${TFinanceiroConta.TABELA} fconta INNER JOIN ${TPessoa.TABELA} as pessoa on fconta.${TFinanceiroConta.FIELD4} = pessoa.${TPessoa.FIELD1} INNER JOIN ${TDocumento.TABELA} as doc on fconta.${TFinanceiroConta.FIELD5} = doc.${TDocumento.FIELD1} ${wherePagarReceber} GROUP BY pessoa.${TPessoa.FIELD1}, pessoa.${TPessoa.FIELD2}, doc.${TDocumento.FIELD3}, fconta.${TFinanceiroConta.FIELD8}, fconta.${TFinanceiroConta.FIELD10}, fconta.${TFinanceiroConta.FIELD11}, fconta.${TFinanceiroConta.FIELD17}, fconta.${TFinanceiroConta.FIELD18} ORDER BY ${TFinanceiroConta.FIELD11} DESC`};
  const encodePagarReceber = await encode(JSON.stringify(sqlPagarReceber), masterKey);
  const responseDataPagarReceber = await api.post('buscar/generica', encodePagarReceber, {});

  return responseDataPagarReceber.data;
}


const sqlQntMinima = async (idEmpresa:number) => {
  const whereQntMinima = ` where ${TProdutoEstoque.FIELD5} <= ${TProdutoEstoque.FIELD6}
                            and ${TProdutoEstoque.FIELD2} = ${idEmpresa}`;
  const SqlQntMinima = {
    sql: `select 
            ${TProduto.FIELD1}, 
            ${TProduto.FIELD5}, 
            ${TProduto.FIELD3}, 
            ${TProdutoEstoque.FIELD6}, 
            ${TProdutoEstoque.FIELD5} 
          from ${TProdutoEstoque.TABELA} 
            inner join ${TProduto.TABELA} on ${TProduto.FIELD1} = ${TProdutoEstoque.FIELD3} 
            ${whereQntMinima}`
  };
  
  const encodeQntMinima = await encode(JSON.stringify(SqlQntMinima), masterKey);
  const responseDataQntMinima = await api.post('buscar/generica', encodeQntMinima, {});

  return responseDataQntMinima.data;
}
