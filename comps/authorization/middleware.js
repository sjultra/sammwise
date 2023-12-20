async function getSessionData(){
    console.log("GetSessionData");
    const response = await fetch(`${URL}/api/auth/session`);
    // const sessionData = await response.json();
    return null;
    // console.log("SessionData:" + sessionData)
    // if(response.loggedIn === false){
    //   console.log("Not logged in!");
    //   return null;
    // }
    // else {
    //   console.log("Logged in!");
    //   console.log("SessionData: " + JSON.stringify(response));
    //   return response;
    //   //extract data from tokenId
    //   //and then return;
    // }
    
}
export async function getUserData(){
    console.log("Middleware getUserData");
    try {
    const sessionUrl = `${window.location.origin}/api/auth/session`;
      console.log("get userData: " + sessionUrl);
      const sessionsData = getSessionData();
    //   const result = await fetch('api/userData');
    //   console.log("User Data result: " + JSON.stringify(result));
    //   const response = await fetch('api/userData');

    //   console.log("Response: " + JSON.stringify(response));
    //   const result = await response.json();
    //   console.log("Result: " + JSON.stringify(result));

      return null;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}



// export async function saveSessionData(){
//     console.log("Middle ware getUserData");
//     try {
//       console.log("get session api");
//       const resp = await fetch('api/auth/session');
//     //   const response = await fetch('api/userData');

//       console.log("Response: " + JSON.stringify(response));
//       const result = await response.json();
//       console.log("Result: " + JSON.stringify(result));

//       return result;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
// }