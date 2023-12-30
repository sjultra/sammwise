import clientPromise from "../../../lib/mongodb";

async function saveSessionData(sessionId, authToken,expiration,email) {
    console.error("saveSessionData:::::!!!!!!!!!!!");
    try {
        console.log("saveSessionData()");
        const doc = generateSessionDocument(sessionId, authToken,expiration,email);
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const result = await db.collection("sessions").insertOne(doc);
        console.log("Insert result: " + JSON.stringify(result));
        return result;
    } catch (e) {
        console.error(e);
    }
}

function generateSessionDocument(_sessionId, authToken,_expiration,_email) {
    console.log("Generate Doc: " + _sessionId);
    const doc = {
        sessionId: _sessionId,
        accessToken: authToken.access_token,
        tokenType: authToken.token_type,
        refreshToken: authToken.refresh_token,
        idToken: authToken.id_token,
        expiration: _expiration,
        email: _email
    }
    return doc;
}


export default async (req, res) => {
    console.log("saveSession.js")
    if (req.method !== 'POST') {
        console.log("saveSession.js Only POST is allowed");
        return res.status(401).send("saveSession.js Only POST is allowed");
    }

    console.log("session.js handlePOSTRequest");
    const body = req.body;
    const sessionObject = JSON.parse(body);
    const result = await saveSessionData(sessionObject.sessionId, sessionObject.authToken,sessionObject.expiration,sessionObject.email);
    console.log("After saveSession");
    return res.status(200).json(result)
 
};