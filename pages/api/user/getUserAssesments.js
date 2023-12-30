import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    console.log("getUserAssesments.js!");
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        console.log("getUserAssesments.js Try to get sessionData!");
        console.log(process.env.NEXT_PUBLIC_URL + '/api/session/getSessionData');
        const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/session/getSessionData', {
            headers: {
                cookie: `sessionId=${req.cookies.sessionId}`
            }
        });
        if (!response.ok) {
            console.log("getUserData.js Fetch sessionData failed: " + response.message);
            return res.status(400).json({ message: response.message });
        }
        console.log("getUserData: response ok");
        const sessionData = await response.json();

        console.log("getUserData.js sessionData: " + JSON.stringify(sessionData));
        const email = sessionData.email;
        console.log("getUserData.js email: " + email);

        const client = await clientPromise;
        console.log("getUserData.js after client");

        const db = client.db("SAMMwiseAssesments");
        console.log("getUserData.js after DB");

        const query = { email }
        console.log("User Data Search query: " + JSON.stringify(query));
        const user = await db
            .collection("users")
            .findOne(query);
        console.log("GetuserData.js return: " + JSON.stringify(user))
        return res.status(200).json(user);

    } catch (error) {
        return res.status(400).send({ message: "getUserData Something is not working well. Not connected to sammwise db" + error });
        console.error('Error fetching data:', error);
    }
}