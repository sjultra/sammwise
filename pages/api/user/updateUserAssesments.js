import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const sessionId = req.cookies.sessionId;

    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/getUserData', {
        headers: {
            cookie: `sessionId=${req.cookies.sessionId}`
        }
    });
    if (!response.ok) {
        return res.status(400).send("Could not retrieve user data from sessionId");
    }

    let user = await response.json();
    user.assesments.push(JSON.parse(req.body));

    const updateResponse = await updateUserAssesments(user);
    if (updateResponse.ok){
        return res.status(200).json(user);
    }
    return res.status(400).send("Error on update assessment list!");
}


async function updateUserAssesments(user) {
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");
        const result = await db
            .collection("users")
            .updateOne({ email: user.email }, {
                $set: {
                    assesments: user.assesments
                }
            });

        return {ok:true, 'inserted': true };

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    }
}