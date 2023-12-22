async function getSessionData() {
  console.log("middleware: GetSessionData");
  const apiURL = `${window.location.origin}/api/auth/session`;
  console.log("middleware API URL: " + apiURL);
  const response = await fetch(apiURL);
  const sessionData = await response.json();
  // console.log("Before returning sessionData: " + JSON.stringify(sessionData));
  return sessionData;
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
export async function getUserData() {
  console.log("Middleware getUserData");
  try {
    // const sessionUrl = `${window.location.origin}/api/auth/user`;
    // console.log("middleware API URL: " + sessionUrl);
    const response = await getSessionData();
  //  console.log("After returning sessionData: " + JSON.stringify(response));
    if( response.sessionData === null){
      return null;
    }
    const email = response.sessionData.email;

    console.log("UserAPI email: " + email);

    const userAPIURL = window.location.origin + '/api/auth/user?' + new URLSearchParams({ email });

    console.log("UserAPI URL: " + userAPIURL);
    const result = await fetch(userAPIURL);
    const userData = await result.json();
    console.log("User Data result: " + JSON.stringify(userData));


    return userData.user;
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