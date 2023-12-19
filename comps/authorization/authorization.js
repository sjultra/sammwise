import { getSession } from 'next-auth/react';

function isUserLoggedIn(sessionStorage){
    // const session = await getSession({ req });
    console.log("IsLogged In?");
    var sessionId = sessionStorage.getItem('sessionId');
    console.log("SessionId: " + sessionId);
    
    if(sessionId === null || sessionId === undefined){
        // console.log("SearchParams: " + queryParameters)
        console.log("Return false");
        return false;
        
    }
    console.log("Return true");

    return true;
}

function generateLink(){
    //create an api link which upon called, it generates and then initiates the dexidp and then hopefully we can get by there.
    const dexURL = "http://127.0.0.1:5556" //TODO get this from env
    const authType = "/dex/auth/google"
    const redirectURI = "http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fauth%2Fcallback" //get this from env.
    const state="124556778" //generate the state to be the sessionId;
    //TODO generate state somehow
    const dexiDPURL = dexURL + authType +
    "?client_id=example-app&redirect_uri=" + 
    redirectURI +
    "&response_type=code&scope=openid+profile+email+offline_access&state=I+wish+to+wash+my+irish+wristwatch";//generate a unique state.
    console.log("DexiDP redirectURI: " + redirectURI);
    return dexiDPURL;
  }

function getDexiDPAuthenticationURL(){
    return generateLink();
}

export {getDexiDPAuthenticationURL,isUserLoggedIn}