async function handleGETRequests(req,res){
    const sessionId = req.cookies.sessionId;
    if(sessionId === null || sessionId === undefined)
        return res.status(401).json({loggedIn: false});
    return res.status(200).json({loggedIn: true});

}

export default async (req, res) => {
    console.log("Session API")
    if (req.method === 'GET') {
        console.log("Session API GET");
        return handleGETRequests(req, res);
    }
    
    else {
        return res.status(405).send({ message: 'Only GET requests allowed' });
    }
};