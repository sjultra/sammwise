// import { v4 as uuidv4} from 'uuid'


// function generateDexiDPLink(state){
//     //create an api link which upon called, it generates and then initiates the dexidp and then hopefully we can get by there.
//     const dexURL = process.env.NEXT_PUBLIC_DEX_URL; //TODO get this from env
//     const dexAppName = process.env.NEXT_PUBLIC_DEX_APP_NAME;
//     const authType = "/dex/auth/google";
//     const serverURL = process.env.NEXT_PUBLIC_URL;
//     const redirectURI = serverURL + "/api/auth/callback";
//     const redirectURIEncoded = encodeURIComponent(redirectURI);
//     const dexiDPURL = dexURL + authType +
//     "?client_id="+dexAppName+"&redirect_uri=" + 
//     redirectURIEncoded +
//     "&response_type=code&scope=openid+profile+email+offline_access&state="+state;//generate a unique state.
//     return dexiDPURL;
//   }

// export default async (req, res) => {
//     if (req.method !== 'GET') {
//         return res.status(401).send("Login Only get is allowed");
//     }
    
//     const state = uuidv4();
//     const dexiDpURL = generateDexiDPLink(state);

//     res.setHeader(
//         'Set-Cookie',
//         `state="${state}";maxAge=-1; Path=/; HttpOnly;`
//       );

//     console.log("return redirect to: " + dexiDpURL);
//     res.status(302).redirect(dexiDpURL);
//     // res.status(200).redict();
// };