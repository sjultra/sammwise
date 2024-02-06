import type { NextApiRequest, NextApiResponse } from 'next'
import {handleAuthCallback } from '../../../comps/authorization/auth'

async function  handleGetRequest(req: NextApiRequest, res:NextApiResponse){
  try {
    return await handleAuthCallback(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGetRequest(req,res);
  }  
}