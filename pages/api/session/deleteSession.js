import clientPromise from "../../../lib/mongodb"

export default async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(401).send("deleteSessions.js Only delete is allowed");
    }
    const sessionId = req.cookies.sessionId;
    let result;
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const query = {'sessionId' : sessionId};
        result = await db
            .collection("sessions")
            .deleteOne(query);
    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    }

    const expirationDate = new Date(0);
    res.setHeader(
        'Set-Cookie',
        `sessionId="";maxAge=-1; Path=/; HttpOnly; Expires=${expirationDate}`
      );

    res.status(200).send();
};