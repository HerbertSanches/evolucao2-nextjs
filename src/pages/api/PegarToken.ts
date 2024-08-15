// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//       const { type, input } = req.body;
//       try {
  
//         if (type === 'encode') {
//           const encoded = await encode(input, masterKey);
//           res.status(200).json({ result: encoded });
//         } else {
//           return console.error("Type inválido", );
//         }
//       } catch (error) {
//         console.error("Erro ao criptografar:", error);
//         res.status(500).json({ error: "Erro durante a criptografia" });
//       }
//     } else {
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Método ${req.method} Não Permitido`);
//     }
//   }