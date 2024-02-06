import dynamic from "next/dynamic";
import styles from '../styles/Home.module.css'
// react imports
import {Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Flex, Box } from 'reflexbox'
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import 'chartjs-adapter-moment';
import { isAuthenticated, getLoginLink } from '../lib/auth'

//local imports
import assessmentCalculator from '../comps/surveyDisplay/graphs/testCalculator';
import TrendsGraph from "../comps/surveyDisplay/graphs/trendgraph";

Chart.register(...registerables);

const trendsGraph = new TrendsGraph();

export const getServerSideProps = async ({req,res}) => {
  console.log("getServerSideProps")
  const user = await isAuthenticated(req);

  if (!user) {
    const dexUrl = await getLoginLink(req,res)

    return {
      redirect: {
        destination: dexUrl,
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

const Dashboard = () => {
  const [display, setDisplay] = useState(0)
  const [trendsGraphData, setTrendsGraphData] = useState(new TrendsGraph());
    useEffect(()=> {
        var userState = JSON.parse(sessionStorage.getItem('userState'));
        userState['page'] = "dashboard";
        userState['has_switched_page'] = true;
        sessionStorage.setItem('userState', JSON.stringify(userState));
    })

    useEffect(() => {
          const usrData = JSON.parse(sessionStorage.getItem('userData'))
          let graphData = []
          let labels = []
          usrData.assesments.forEach((assesment) => {
              var testCalc = new assessmentCalculator(assesment.assesment);
              testCalc.computeResults();
              var finalScore = testCalc.overallScore.toFixed(2);
              const assesmentDate = assesment.timestamp.substr(0,10);
              graphData.push(finalScore);
              labels.push(assesmentDate);
          })

          trendsGraph.metaData.labels = labels;
          trendsGraph.metaData.datasets[0].data = graphData;
          setTrendsGraphData(trendsGraph);
  },[trendsGraphData])

    return ( 
        <>
            <Head>
                <title>SAMMWise | Dashboard </title>
                <meta name = "keywords" content = "owassp-calc"/>

            </Head>
            <div>
                <h2 className = {styles.title} >Dashboard</h2>
                <div label='Trends' className="practices">
                    <Flex flexWrap='wrap'>
                        <Box width={[1/2, 1]} p={3} className="practicesBarBox">
                            <h2 id="trendsgraph"> Project Trends </h2>
                            <Line className='practiceBar' options={trendsGraphData.metaData.options} data={trendsGraphData.metaData} />
                        </Box>
                    </Flex>
                </div>
            </div>
        </>
        );
}
 
export default Dashboard;