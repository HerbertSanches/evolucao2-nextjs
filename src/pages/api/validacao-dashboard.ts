// pages/api/validacao-dashboard.ts
import { NextApiRequest, NextApiResponse } from 'next';
import api from '@/services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company } = req.query;

  if (!company) {
    return res.status(400).json({ error: 'Company é obrigatório' });
  }

  try {
    const response = await api.get(`/autenticacao/validacao-dashboard/${company}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    res.status(500).json({ error: 'Erro ao chamar a API' });
  }
}
