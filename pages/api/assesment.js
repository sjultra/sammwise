import clientPromise from "../../lib/mongodb";
export default async (req, res) => {
    if (req.method === 'POST') {
        console.log("Assesment POST");
        return handlePOSTRequests(req,res);
    }
    else if(req.method === 'GET'){
        console.log("Assesment GET");
        return handleGETRequests(req,res);
    }
    else {
        return res.status(405).send({ message: 'Only POST and GET requests allowed' });
    }
};

async function getSessionData(sessionId){
    console.log("Assesment.js get SessionData!");
    const sessionAPIURL = process.env.NEXT_PUBLIC_URL + '/api/session/getSessionData';
    const sessionData = await fetch(sessionAPIURL,{
        headers: {
            cookie: `sessionId=${sessionId}`
          }
    });
    const sessionDataJSON = await sessionData.json();
    return sessionDataJSON;
}

async function getUserData(sessionId){
    const sessionData = await getSessionData(sessionId);
    console.log("assesment.js sessiondata " + JSON.stringify(sessionData));
    console.log("assesment.js SessionData Email: " + sessionData.email);
    const email = sessionData.email;
    const userAPIURL = process.env.NEXT_PUBLIC_URL + '/api/user/getUserByEmail?'  + new URLSearchParams({ email });
    console.log("UserAPIURL" +  userAPIURL);
    const response = await fetch(userAPIURL);

    if(!response.ok){
        return null;
    }

    let userData = await response.json();
    return userData;
}

async function updateUser(user){
    console.log("assesment.js updateUser:");

    const userAPIURL = process.env.NEXT_PUBLIC_URL + '/api/user/updateUserAssesments'
    console.log("UserAPIURL: " + userAPIURL);
    const updateResult = await fetch(userAPIURL, {
        method: 'PUT',
        body: JSON.stringify(user)
    });

}

async function handlePOSTRequests(req,res) {
    console.log("assesment.js HandlePOSTRequest()")
    const body = JSON.parse(req.body);
    const doc = {
        timestamp: new Date(),
        assesment: body,
    };
    let user = await getUserData(req.cookies.sessionId);

    user.assesments.push(doc);

    await updateUser(user);

    res.status(200).send();
}

async function handleGETRequests(req,res) {
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const SAMMwiseAssesments = await db
            .collection("assesments")
            .find({})
            .limit(10)
            .toArray();

        return res.status(200).json(SAMMwiseAssesments);
 
    } catch (e) {
        console.error(e);
        return res.status(400).send({message: "Something is not working well. Not connected to sammwise db"});
    }
}