import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const result = await db
            .collection("users")
            .insertOne(JSON.parse(req.body));
        return res.status(200).json({'inserted': true});

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    }
}