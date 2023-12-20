import React, { useState } from 'react'
import 'survey-react/survey.css';
// import 'survey-core/defaultV2.min.css';
import Head from 'next/head'
//local imports 
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDexiDPAuthenticationURL } from '../comps/authorization/authorization'
// import Mysurvey from '../comps/surveyDisplay/surveyone'
const Mysurvey = dynamic(() => import('../comps/surveyDisplay/surveyone'), { ssr: false })




export default function SAMMsurvey(){
    const router = useRouter()

    useEffect(() => {
        // Check authentication status when the page loads
        fetch('/api/auth/login')
          .then((response) => {
            console.log()
            if (!response.ok) {
              console.log("Not logged in!");
              // Redirect to login page if not authenticated
              const loginUrl = getDexiDPAuthenticationURL();
              router.push(loginUrl);
            }
            else {
              console.log("logged in");
            }
          })
          .catch((error) => {
            console.error('Error checking authentication status:', error);
            // Handle error appropriately
          });
      }, []);

    return(<>

            <Head>
                <title>SAMMWise | Assessment </title>
                <meta name = "keywords" content = "owassp-calc"/>
            </Head>
            <div>

            <Mysurvey/>   
            
            </div>
        </>)
};