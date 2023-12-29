import { redirect } from 'next/navigation';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import {handleAuthCallback } from '../../../comps/authorization/auth'
require('dotenv').config();
const http = require("http");


function handleAuthRequest(res, authDataString){
  const authDataJson = JSON.parse(authDataString);
  console.log(authDataJson.id_token);
  return redirect(process.env.NEXT_PUBLIC_URL + '/?sessionId=sessionId');
}

async function  handleGetRequest(req: NextApiRequest, res:NextApiResponse){
  console.log("HandleGetRequest");
  try {
    return await handleAuthCallback(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Handler called!");

  if (req.method === 'GET') {
    handleGetRequest(req,res);
  }  
}