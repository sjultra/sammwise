import clientPromise from "../../../lib/mongodb";

async function saveSessionData(sessionId, authToken,expiration) {
    console.error("saveSessionData:::::!!!!!!!!!!!");
    try {
        console.log("saveSessionData()");
        // console.log("save session data: " + sessionId + " " + authToken );
        const doc = generateSessionDocument(sessionId, authToken,expiration);
        console.log("Session data" + JSON.stringify(doc));
        const client = await clientPromise;
        console.log("Before get DB " + client);
        const db = client.db("SAMMwiseAssesments");
        console.log("Before get await insert");

        const result = await db.collection("sessions").insertOne(doc);
        console.log("Insert result: " + JSON.stringify(result));
        return result;
    } catch (e) {
        console.error(e);
    }
}

function generateSessionDocument(_sessionId, authToken,_expiration) {
    console.log("Generate Doc: " + _sessionId);
    const doc = {
        sessionId: _sessionId,
        accessToken: authToken.access_token,
        tokenType: authToken.token_type,
        refreshToken: authToken.refresh_token,
        idToken: authToken.id_token,
        expiration: _expiration
    }
    return doc;
}

async function handleGETRequests(req, res) {
    console.log("GET Req cookies: " + req.cookies);
    const sessionId = req.cookies.sessionId;
    console.log("Session ID: " + sessionId);
    if(sessionId === null || sessionId === undefined){
        console.log("No sessionId present. Not logged in. return null");
        return res.status(404).json({loggedIn: false,sessionData : null})
    }
    console.log("Get session data");
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const query = `{'sessionId : '${sessionId}'}`
        console.log("Search query: " + query);
        const sessionData = await db
            .collection("sessions")
            .find(query)
            .limit(1)
            .toArray();

        console.log("SessionData" + sessionData);
        return res.status(200).json({loggedIn: true,'sessionData' : sessionData});

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
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

async function handlePOSTRequest(req, res) {
    console.log("handlePOSTRequest");
    const body = req.body;
    console.log("handlePOSTRequest Body: " +body);
    console.log("handlePOSTRequest typeof: " + typeof body);
    const sessionObject = JSON.parse(body);
    const result = await saveSessionData(sessionObject.sessionId, sessionObject.authToken,sessionObject.expiration);
    console.log("After saveSession");
    // console.log("After saveSesionData: " + result.insertedId);
    return res.status(200).json(result)/*.send(`document1 was inserted with the _id: ${result.insertedId}`)*/;

}

export default async (req, res) => {
    console.log("Session API")
    if (req.method === 'GET') {
        console.log("Session API GET");
        return handleGETRequests(req, res);
    }
    else if (req.method === 'POST') {
        console.log("Session API POST");
        return handlePOSTRequest(req, res);
    }
    else {
        return res.status(405).send({ message: 'Only POST and GET requests allowed' });
    }
};