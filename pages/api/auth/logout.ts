import {getDexiDPAuthenticationURL} from '../../../comps/authorization/authorization'

async function handleGETRequests(req,res){
    console.log("logout.ts handleGETRequests()");
    const sessionId = req.cookies.sessionId;
    console.log("sessionId: " + sessionId);
    const sessionAPIURL = process.env.URL + '/api/auth/session';
    const response = await fetch(sessionAPIURL, {
        method: 'DELETE',
        body: sessionId
      });

    const expirationDate = new Date(0);
    res.setHeader(
        'Set-Cookie',
        `sessionId="";maxAge=-1; Path=/; HttpOnly; Expires=${expirationDate}`
      );

    return res.status(200).send();
}

export default async (req, res) => {
    console.log("Logout API")
    if (req.method === 'GET') {
        console.log("Login API GET");
        return handleGETRequests(req, res);
    }
    
    else {
        return res.status(405).send({ message: 'Only GET requests allowed' });
    }
};