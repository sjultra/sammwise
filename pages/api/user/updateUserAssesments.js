import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    console.log("updateUserAssesments.js!");
    if (req.method !== 'PUT') {
        console.log("updateUserAssesments method not post!")
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    console.log("updateUserAssesments.js: " + req.body);

    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");
        const jsonObject = JSON.parse(req.body);
        const result = await db
            .collection("users")
            .updateOne({email: jsonObject.email},{
                $set: {
                    assesments: jsonObject.assesments
                }
            });

        console.log("updateUserAssesments.js Update result: " + JSON.stringify(result));
        return res.status(200).send();

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    } 
}