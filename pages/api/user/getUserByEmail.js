import clientPromise from "../../../lib/mongodb"
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { email } = req.query;

    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const query = { email }
        const user = await db
            .collection("users")
            .findOne(query);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);

    } catch (e) {
        console.error(e);
        return { message: "getUserEmail Something is not working well. Not connected to sammwise db" };
    }
}