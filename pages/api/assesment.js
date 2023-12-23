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

async function getSessionData(sessionId){
    const sessionAPIURL = process.env.URL + '/api/auth/session';
    const sessionData = await fetch(sessionAPIURL,{
        headers: {
            cookie: `sessionId=${sessionId}`
             //TODO 
          }
    });
    const sessionDataJSON = await sessionData.json();
    return sessionDataJSON;
}

async function getUserData(sessionId){
    const sessionData = await getSessionData(sessionId);
    console.log("assesment.js sessiondata " + sessionData);
    console.log("assesment.js SessionData Email: " + sessionData.sessionData.email);
    const email = sessionData.sessionData.email;
    const userAPIURL = process.env.URL + '/api/auth/user?'  + new URLSearchParams({ email });
    console.log("UserAPIURL" +  userAPIURL);
    const userDataResponse = await fetch(userAPIURL);
    let userData = await userDataResponse.json();
    // console.log("asessment.js userData: " + JSON.stringify(userData));
    console.log("assesment.js before return");
    return userData.user;
}

async function updateUser(user){
    console.log("assesment.js updateUser:");

    // console.log("assesment.js updateUser:" + JSON.stringify(user));
    const userAPIURL = process.env.URL + '/api/auth/user'
    console.log("UserAPIURL: " + userAPIURL);
    const updateResult = await fetch(userAPIURL, {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

}

async function handlePOSTRequests(req,res) {
    console.log("assesment.js HandlePOSTRequest()")
    const body = JSON.parse(req.body);
    const doc = {
        timestamp: new Date(),
        assesment: body,
    };
    console.log("assesment.js Cookie type: " + typeof req.cookies);
    console.log("assesment.js Cookie: " + JSON.stringify(req.cookies));

    let user = await getUserData(req.cookies.sessionId);

    // const userAPIURL = process.env.URL + '/api/auth/user';
    // const user = await getUserData();
    console.log("assesment.js after user" + JSON.stringify(user));


    user.assesments.push(body);

    // console.log("assesment.js new user: " + JSON.stringify(user));


    await updateUser(user);

    res.status(200).send();
    // try {
    //     const client = await clientPromise;
    //     const db = client.db("SAMMwiseAssesments");
 
    //     const result = await db.collection("assesments").insertOne(doc);

    //     return res.status(200).send(`document was inserted with the _id: ${result.insertedId}`);
    // } catch (e) {
    //     console.error(e);
    // }
    // return res.status(409).send('The doc couldn\'t be inserted');
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