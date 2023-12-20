import { redirect } from 'next/navigation';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import {handleAuthCallback } from '../../../comps/authorization/auth'
require('dotenv').config();
const http = require("http");


function handleAuthRequest(res, authDataString){
  // console.log("Got: " + authDataString);
  const authDataJson = JSON.parse(authDataString);
  console.log(authDataJson.id_token);
  return redirect(process.env.URL + '/?sessionId=sessionId');
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
  // const session = await getSession({req});

  // console.log("Session: " + session);
  // if(session !== null && session !== undefined)
  //   console.log("Session not null and defined")
  // // if (req.method === 'GET') {
  // //   console.log(req.method);
  // //   console.log(req.headers);
  // //   console.log(req.query);
  // //   var code = req.query["code"];//check the state code, which should be generated randomly 
  // // }
 

  if (req.method === 'GET') {
    handleGetRequest(req,res);
  }  
   //   console.log("GET REQUEST");
  //   console.log("Generated code: " + code);
  //   console.log("Redirect back to homepage!");
  //   if(code === null || code === undefined){
  //     res.status(400)
  //   }
   
  //   const authToken = await requestAuthToken(code);
  //   console.log("Recevied authToken: " + authToken);


  //   // res.status(200);//.json({ 'code': code, 'authorization Data: ' : body})
  //   res.redirect(302,"/");
  // } else {
  //   console.log("other REQUEST");

  //   // Handle any other HTTP method
  // }
}