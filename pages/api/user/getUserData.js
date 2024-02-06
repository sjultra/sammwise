import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/session/getSessionData', {
            headers: {
                cookie: `sessionId=${req.cookies.sessionId}`
            }
        });
        if (!response.ok) {
            console.error("getUserData.js Fetch sessionData failed: " + response.message);
            return res.status(400).json({ message: response.message });
        }
        const sessionData = await response.json();
        const email = sessionData.email;

        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const query = { email }
        const user = await db
            .collection("users")
            .findOne(query);
        return res.status(200).json(user);

    } catch (error) {
        return res.status(400).send({ message: "getUserData Something is not working well. Not connected to sammwise db" + error });
        console.error('Error fetching data:', error);
    }
}