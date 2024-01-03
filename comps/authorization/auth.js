import crypto from "crypto";
var http = require('http');
function getRequestBody(code) {

  return "code=" + code + "&grant_type=authorization_code&redirect_uri=" + process.env.NEXT_PUBLIC_URL + "/api/auth/callback";
}

function getAuthorizationData() {
  const appName = process.env.NEXT_PUBLIC_DEX_APP_NAME;
  const secret = process.env.DEX_SECRET;
  const authString = appName + ":" + secret;
  let buff = new Buffer(authString);
  let base64data = buff.toString('base64');

  return base64data;
}

async function requestAuthToken(code) {
  return new Promise((resolve, request) => {
    const requestBody = getRequestBody(code);
    const options = {
      hostname: process.env.HOSTNAME,
      port: 5556,
      path: '/dex/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'Authorization': 'Basic ' + getAuthorizationData(), //this is the client secret and the client name base64 encoded
        'Content-Length': requestBody.length
      }
    }

    var body = '';

    const postRequest = http
      .request(options, resp => {
        // log the data
        resp.on('data', d => {
          body = body + d;
        });
        resp.on('end', () => {
          resolve(body);
        })
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
    postRequest.write(requestBody);
    postRequest.end();
  });
}

function generateSessionId() {
  const buffer = crypto.randomBytes(32);
  const sessionId = buffer.toString('hex');

  return sessionId;
}

function getSessionExpirationDate() {
  let expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  return expirationDate;
}

function decodeBase64(data) {
  let buff = new Buffer(data, 'base64');
  let plainData = buff.toString('ascii');
  return plainData;
}

async function extractAuthUserdata(authToken) {
  const idToken = authToken.id_token;
  const tokens = idToken.split(".");
  const plainData = decodeBase64(tokens[1]);
  return JSON.parse(plainData);
}

async function findUserInDatabase(authUserData) {
  const email = authUserData.email;
  const userAPIURL = process.env.NEXT_PUBLIC_URL + '/api/user/getUserByEmail?' + new URLSearchParams({ email });
  const response = await fetch(userAPIURL)
  if (response.ok) {
    return await response.json();
  }
  else {
    return null;
  }
}

function createUserFromAuthData(authUserData) {
  return {
    email: authUserData.email,
    name: authUserData.name,
    assesments: []
  }
}

async function createUserInDatabase(authUserData) {
  const userAPIURL = process.env.NEXT_PUBLIC_URL + '/api/user/saveUser';
  const user = createUserFromAuthData(authUserData);
  const response = await fetch(userAPIURL, {
    method: 'POST',
    body: JSON.stringify(user)
  });
}

export async function handleAuthCallback(req, res) {
  const result = await handleDexAuthCallback(req);

  if (!result.success) {
    res.status(401).end('Authentication failed');
  }

  const sessionId = generateSessionId();
  const authTokenString = result.authToken;
  const expirationDate = getSessionExpirationDate();

  const authUserData = await extractAuthUserdata(JSON.parse(result.authToken));

  const sessionAPIURL = process.env.NEXT_PUBLIC_URL + '/api/session/saveSession';
  const requestBody = `{"sessionId":"${sessionId}", "authToken":${authTokenString},"expiration":"${expirationDate}","email":"${authUserData.email}"}`;
  const response = await fetch(sessionAPIURL, {
    method: 'POST',
    body: requestBody,
  });
  if (!response.ok) {
    res.status(500).send("Could not save session data!");
    return;
  }

  const user = await findUserInDatabase(authUserData)
  if (!user) {
    await createUserInDatabase(authUserData);
  }

  res.setHeader(
    'Set-Cookie',
    `sessionId=${sessionId}; Path=/; HttpOnly; Expires=${expirationDate}`
  );

  return res.status(302).redirect('/');
}

function checkState(req,state){
  console.log("checkState() Cookies: " + JSON.stringify(req.cookies));
  if(req.cookies["state"] != state)
    return false;
  return true;
}

export async function handleDexAuthCallback(req) {
  try {
    const { code, state } = req.query;
    
    if(!checkState(req,state))
      return {
        success: false,
        error: 'Authentication failed',
      };
    const authToken = await requestAuthToken(code);

    return {
      success: true,
      authToken,
    };
  } catch (error) {
    console.error('Authentication failed:', error);
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
}