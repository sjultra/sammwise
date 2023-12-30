import clientPromise from "../../../lib/mongodb"

export default async (req, res) => {
    console.log("Logout API")
    if (req.method !== 'DELETE') {
        console.log("deleteSessions.js Only DELETE is allowed");
        return res.status(401).send("deleteSessions.js Only delete is allowed");
    }
    console.log("deleteSessions.js handleGETRequests()");
    const sessionId = req.cookies.sessionId;
    console.log("sessionId: " + sessionId);
    let result;
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const query = {'sessionId' : sessionId};
        console.log("Delete query: " + JSON.stringify(query));
        result = await db
            .collection("sessions")
            .deleteOne(query);

        console.log("SessionData" + JSON.stringify(result));

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    }


    if(result.ok){
        console.log("deleteSessions.js session was deleted");
    }
    else {
        console.log("deleteSessions.js Session was not deleted.")
    }
    const expirationDate = new Date(0);
    res.setHeader(
        'Set-Cookie',
        `sessionId="";maxAge=-1; Path=/; HttpOnly; Expires=${expirationDate}`
      );

    res.status(200).send();
};