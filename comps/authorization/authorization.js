import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
require('dotenv').config();
async function isUserLoggedIn(){
    // const session = await getSession({ req });
    console.log("IsLogged In?");
    var sessionId = sessionStorage.getItem('sessionId');
    console.log("SessionId: " + sessionId);
    
    if(sessionId === null || sessionId === undefined){
        console.log("Return false");
        return false;
        
    }
    console.log("Return true");

    return true;
}

function generateLink(){
    //create an api link which upon called, it generates and then initiates the dexidp and then hopefully we can get by there.
    const dexURL = process.env.NEXT_PUBLIC_DEX_URL; //TODO get this from env
    const dexAppName = process.env.NEXT_PUBLIC_DEX_APP_NAME;
    const authType = "/dex/auth/google";
    const serverURL = process.env.NEXT_PUBLIC_URL;
    const redirectURI = serverURL + "/api/auth/callback";
    const redirectURIEncoded = encodeURIComponent(redirectURI);
    const state="124556778" //generate the state to be the sessionId;
    //TODO generate state somehow
    const dexiDPURL = dexURL + authType +
    "?client_id="+dexAppName+"&redirect_uri=" + 
    redirectURIEncoded +
    "&response_type=code&scope=openid+profile+email+offline_access&state=I+wish+to+wash+my+irish+wristwatch";//generate a unique state.
    console.log("DexiDP login URL: " + dexiDPURL);
    return dexiDPURL;
  }

function getDexiDPAuthenticationURL(){
    return generateLink();
}

export {getDexiDPAuthenticationURL,isUserLoggedIn}