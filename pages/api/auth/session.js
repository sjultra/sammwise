import clientPromise from "../../../lib/mongodb";



// export async function getSessionData(req,res,sessionId){
    
// }



  async function saveSessionData(sessionId,authToken){
    try {
      console.log("saveSessionData()");
        // console.log("save session data: " + sessionId + " " + authToken );
        const doc = generateSessionDocument(sessionId, authToken);
        console.log("Session data" + JSON.stringify(doc));
        const client = await clientPromise;
        console.log("Before get DB " + client);
        const db = client.db("SAMMwiseAssesments");
        console.log("Before get await insert");
  
        const result = await db.collection("session").insertOne(doc);
        console.log("Insert result" + JSON.stringify(result));
        return result;
    } catch (e) {
        console.error(e);
    }
  }
  
  function generateSessionDocument(sessionId, authToken){
    const accessToken = authToken.access_token;
    const tokenType = authToken.token_type;
    const refreshToken = authToken.refresh_token;
    const idToken = authToken.id_token;
    const doc = {
        sessionId : sessionId,
        accessToken: authToken.access_token,
        tokenType: authToken.token_type,
        refreshToken: authToken.refresh_token,
        idToken: authToken.id_token
    }
    return doc;
  }

async function handleGETRequests(req,res) {
    console.log("GET Req cookies: " + req.cookies);
    const sessionId = req.cookies.sessionId;
    console.log("Session ID: " + sessionId);
    
    console.log("Get session data");
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const sessionData = await db
            .collection("sessions")
            .find({sessionId})
            .limit(10)
            .toArray();

        return res.status(200).json(sessionData);
 
    } catch (e) {
        console.error(e);
        return res.status(400).send({message: "Something is not working well. Not connected to sammwise db"});
    }


    // console.log("Handle session GET requests")
    // try {
    //     const client = await clientPromise;
    //     const db = client.db("SAMMwiseAssesments");

    //     const SAMMwiseAssesments = await db
    //         .collection("assesments")
    //         .find({})
    //         .limit(10)
    //         .toArray();

    //     return res.status(200).json(SAMMwiseAssesments);
 
    // } catch (e) {
    //     console.error(e);
    //     return res.status(400).send({message: "Something is not working well. Not connected to sammwise db"});
    // }
}

async function handlePOSTRequest(req, res){
    console.log("handlePOSTRequest");
    // console.log("POST Req cookies: " + req.cookies);
    // const sessionId = req.cookies.sessionId;
    // console.log("Session ID: " + sessionId);
     const body = req.body;
    console.log("POST request body, " + JSON.stringify(body));
    const result = await saveSessionData(body.sessionId,JSON.parse(body.authToken));
    console.log("After saveSession");
    // console.log("After saveSesionData: " + result.insertedId);
    return res.status(200).send(`document1 was inserted with the _id: ${result.insertedId}`);

}

export default async (req, res) => {
    console.log("Session API")
   if(req.method === 'GET'){
    console.log("Session API GET");
        return handleGETRequests(req,res);
    }
    else if (req.method === 'POST'){
        console.log("Session API POST");
        return handlePOSTRequest(req,res);
    }
    else {
        return res.status(405).send({ message: 'Only POST and GET requests allowed' });
    }
};