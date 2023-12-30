import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    console.log("getSessionData.js()");
    const sessionId = req.cookies.sessionId;
    console.log("getSessionData.js Session ID: " + sessionId);
    if (sessionId === null || sessionId === undefined) {
        console.log("getSessionData.js No sessionId present. Not logged in. return null");
        res.status(404).send("No session found!");
    }
    console.log("getSessionData.js Get session data");
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");
        const query = { 'sessionId': sessionId };
        console.log("getSessionData.js Search query: " + JSON.stringify(query));
        const sessionData = await db
            .collection("sessions")
            .findOne(query);

        if(sessionData === null){
            return res.status(404).send("Not found!");
        }
        console.log("GetSessioNdata.js SessionData: " + JSON.stringify(sessionData));
        console.log("GetSessioNData.js returned ok response!");
        return res.status(200).json(sessionData);

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "getSessionData! Something is not working well. Not connected to sammwise db" });
    }

}