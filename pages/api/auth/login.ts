async function handleGETRequests(req,res){
    console.log("login.ts handleGETRequests()");
    const sessionId = req.cookies.sessionId;
    console.log("sessionId: " + sessionId);
    if(sessionId === null || sessionId === undefined){
        console.log("SessionId is not valid");
        return res.status(401).send();
    }
    return res.status(200).send();

}

export function getAuthenticationURL(){
    return ""
}

export default async (req, res) => {
    console.log("Login API")
    if (req.method === 'GET') {
        console.log("Login API GET");
        return handleGETRequests(req, res);
    }
    
    else {
        return res.status(405).send({ message: 'Only GET requests allowed' });
    }
};