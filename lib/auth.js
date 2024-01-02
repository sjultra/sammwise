// lib/auth.js
import { parse } from 'cookie';

export const isAuthenticated = async (req) => {
    const cookies = parse(req.headers.cookie || '');

    // Check if the sessionId cookie exists
    const sessionId = cookies.sessionId;

    if (!sessionId) {
        return null; // User is not logged in
    }

    const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/getUserData', {
        headers: {
            cookie: `sessionId=${req.cookies.sessionId}`
        }
    });

    if (!response.ok){
        return null;
    }

    const userData = await response.json();
    return userData;
};