import clientPromise from "../../../lib/mongodb"
export default async function handler(req, res) {
    console.log("getUserDataBySessionId!");
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { sessionId } = req.query;

    
}