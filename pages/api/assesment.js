import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    if (req.method === 'POST') {
        return handlePOSTRequests(req,res);
    }
    else if(req.method === 'GET'){
        return handleGETRequests(req,res);
    }
    else {
        return res.status(405).send({ message: 'Only POST and GET requests allowed' });
    }
};


async function handlePOSTRequests(req,res) {

    const body = JSON.parse(req.body);
    const doc = {
        timestamp: new Date(),
        assesment: body,
    };

    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");
 
        const result = await db.collection("assesments").insertOne(doc);

        return res.status(200).send(`document was inserted with the _id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    }
    return res.status(409).send('The doc couldn\'t be inserted');
}

async function handleGETRequests(req,res) {
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const SAMMwiseAssesments = await db
            .collection("assesments")
            .find({})
            .limit(10)
            .toArray();

        return res.status(200).json(SAMMwiseAssesments);
 
    } catch (e) {
        console.error(e);
        return res.status(400).send({message: "Something is not working well. Not connected to sammwise db"});
    }
}