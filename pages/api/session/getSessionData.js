import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    const sessionId = req.cookies.sessionId;
    if (sessionId === null || sessionId === undefined) {
        res.status(404).send("No session found!");
    }
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");
        const query = { 'sessionId': sessionId };
        const sessionData = await db
            .collection("sessions")
            .findOne(query);

        if(sessionData === null){
            return res.status(404).send("Not found!");
        }
        return res.status(200).json(sessionData);

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "getSessionData! Something is not working well. Not connected to sammwise db" });
    }

}