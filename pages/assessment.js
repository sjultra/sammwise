import React, { useState } from 'react'
import 'survey-react/survey.css';
// import 'survey-core/defaultV2.min.css';
import Head from 'next/head'
//local imports 
import dynamic from 'next/dynamic';
import { getDexiDPAuthenticationURL } from '../comps/authorization/authorization'
import { isAuthenticated } from '../lib/auth'

// import Mysurvey from '../comps/surveyDisplay/surveyone'
const Mysurvey = dynamic(() => import('../comps/surveyDisplay/surveyone'), { ssr: false })



export const getServerSideProps = async (context) => {
  const user = await isAuthenticated(context.req);

  if (!user) {
    return {
      redirect: {
        destination: getDexiDPAuthenticationURL(),
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default function SAMMsurvey(){
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