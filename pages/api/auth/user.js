import clientPromise from "../../../lib/mongodb";

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


async function handlePOSTRequests(req,res){
    console.log("user.js handlePOSTRequests");
    console.log(req.body);
    try {
        const client = await clientPromise;
        const db = client.db("SAMMwiseAssesments");

        const result = await db
            .collection("users")
            .insertOne(JSON.parse(req.body));

        console.log("User insert result: " + JSON.stringify(result));
        return res.status(200).json({'inserted': true});

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    } finally {
        // await client.close();
    }
}

async function handleGETRequests(req, res) {
    const {email} = req.query;

    console.log("user.js HandleGETReques: " + email);
    console.log("Get user data");
    const client = await clientPromise;

    try {
        const db = client.db("SAMMwiseAssesments");

        const query = {'email' : email}
        console.log("Search query: " + JSON.stringify(query));
        const user = await db
            .collection("users")
            .findOne(query);

        console.log("User: " + JSON.stringify(user));
        // res.setHeader('Content-Type', 'application/json');
        const userJSON = {
            'user': user
        }
        console.log("Return: " + JSON.stringify(userJSON));
        return res.status(200).send(userJSON);

    } catch (e) {
        console.error(e);
        return res.status(400).send({ message: "Something is not working well. Not connected to sammwise db" });
    } finally {
        // await client.close();
    }
}