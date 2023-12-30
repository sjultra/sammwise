import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    console.log("updateUserAssesments.js!");
    if (req.method !== 'PUT') {
        console.log("updateUserAssesments method not post!")
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    // console.log("UpdateUserAssesments: " + JSON.stringify(req.cookies));
    const sessionId = req.cookies.sessionId;
    console.log("UpdateUserAssesments: SessionId: " + sessionId);
    console.log("UpdateUserAssesments: body: " + (req.body));

    console.log("UpdateUserAssesments: before get UserData!");
    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/getUserData', {
        headers: {
            cookie: `sessionId=${req.cookies.sessionId}`
        }
    });
    if (!response.ok) {
        return res.status(400).send("Could not retrieve user data from sessionId");
    }

    console.log("UpdateUserAssesments: After get User Data!");
    let user = await response.json();
    user.assesments.push(JSON.parse(req.body));

    const updateResponse = await updateUserAssesments(user);
    if (updateResponse.ok){
        console.log("UpdateUserAssesments updated!");
        return res.status(200).json(user);
    }
    console.log("UpdateUserAssesments not updated!");
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