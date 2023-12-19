import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("USer Data api called");
    if(req.method === 'GET'){
        return handleGETRequests(req,res);
    }
    else {
        return res.status(405).send({ message: 'Only POST and GET requests allowed' });
    }
};



async function handleGETRequests(req: NextApiRequest,res: NextApiResponse) {
    console.log("UserData handle GET Request");
   const sessionId = req.cookies.sessionId;
   if(sessionId == null){
    return res.status(401).json("User not logged in");
   }
    
   console.log("Handle get user for cookie: " + sessionId);
//    const response = await fetch('auth/session', {
//     method: 'GET',
//     headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: sessionId,
// });
//    const resp = await fetch('api/auth/session');
   console.log("after get userData");
   //TODO get user data from DB;
   var val = Math.floor(Math.random()*2);
   if(val === 1)
    res.status(200).json(null);
   else {
       res.status(200).json({userEmail: "MyUserEmail",userName:"User Name Here",rand:Math.floor(Math.random() * 100),cookies: req.cookies});
   }
}