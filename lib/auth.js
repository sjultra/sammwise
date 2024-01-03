// lib/auth.js
import { parse } from 'cookie';
import { v4 as uuidv4} from 'uuid'

export const isAuthenticated = async (req, res) => {
    const cookies = parse(req.headers.cookie || '');

    const sessionId = cookies.sessionId;
    console.log("Sessionid: in auth.js is : " + sessionId);
    if (!sessionId) {
        console.log("No session Id ");
        return null; // User is not logged in
    }

    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/getUserData', {
        headers: {
            cookie: `sessionId=${req.cookies.sessionId}`
        }
    });

    if (!response.ok) {
        return null;
    }

    const userData = await response.json();
    return userData;
};

function generateDexiDPLink(state) {
    //create an api link which upon called, it generates and then initiates the dexidp and then hopefully we can get by there.
    const dexURL = process.env.NEXT_PUBLIC_DEX_URL; //TODO get this from env
    const dexAppName = process.env.NEXT_PUBLIC_DEX_APP_NAME;
    const authType = "/dex/auth/google";
    const serverURL = process.env.NEXT_PUBLIC_URL;
    const redirectURI = serverURL + "/api/auth/callback";
    const redirectURIEncoded = encodeURIComponent(redirectURI);
    const dexiDPURL = dexURL + authType +
        "?client_id=" + dexAppName + "&redirect_uri=" +
        redirectURIEncoded +
        "&response_type=code&scope=openid+profile+email+offline_access&state=" + state;//generate a unique state.
    return dexiDPURL;
}

export const getLoginLink = async (req, res) => {
    const state = uuidv4();
    const dexiDpURL = generateDexiDPLink(state);

    res.setHeader(
        'Set-Cookie',
        `state=${state};maxAge=-1; Path=/; HttpOnly;`
      );

    console.log("return redirect to: " + dexiDpURL);
    return dexiDpURL;
};