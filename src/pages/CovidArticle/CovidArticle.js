import * as d3 from 'd3';
import React, {useState, useEffect, useRef} from 'react';
import Papa from 'papaparse';

import ContextBox from '../../components/ContextBox/ContextBox';
import ArticleBox from '../../components/ArticleBox/ArticleBox';

import coviddata from '../../data/covid_confirmed_usafacts.json'

import NYTHeader from '../../images/NYT-corona/NYTHeader.png'
import NYTTitle from '../../images/NYT-corona/NYTTitle.png'
import NYTBody1 from '../../images/NYT-corona/NYTBody1.png'
import NYTBody2 from '../../images/NYT-corona/NYTBody2.png'
import NYTBody3 from '../../images/NYT-corona/NYTBody3.png'
import NYTBody4 from '../../images/NYT-corona/NYTBody4.png'
import NYTBody5 from '../../images/NYT-corona/NYTBody5.png'
import NYTBody6 from '../../images/NYT-corona/NYTBody6.png'
import NYTBody7 from '../../images/NYT-corona/NYTBody7.png'
import NYTBody8 from '../../images/NYT-corona/NYTBody8.png'
import NYTFooter from '../../images/NYT-corona/NYTFooter.png'


function CovidGraph() {

    const graphRef = useRef();
    
    console.log(coviddata[0])

    // const [parsedData, setParsedData] = useState([]);
    // const parseFile =  (file) => {
    //     Papa.parse('../../data/covid_confirmed_usafacts.csv', {
    //         header: true,
    //         complete: results => {
    //             console.log(results)
    //             setParsedData(results.data)
    //         }
    //     })
    // }

    // useEffect(()=> {
    //     parseFile();
    // }, [])

   
    const draw = () => {

    }



    return(
        <React.Fragment>
            <div ref={graphRef} className='GraphContainer' style={{backgroundColor: "red", width: "100%", height: "350px"}}/>
        </React.Fragment>
    )
}

function CovidArticle() {

    return (
        <div>
            <img src={NYTHeader} width='100%' />
            <img src={NYTTitle} width='100%' />

            <CovidGraph />
            
            <img src={NYTBody1} width='100%' />
            <img src={NYTBody2} width='100%' />
            <img src={NYTBody3} width='100%' />
            <img src={NYTBody4} width='100%' />
            <img src={NYTBody5} width='100%' />
            <img src={NYTBody6} width='100%' />
            <img src={NYTBody7} width='100%' />
            <img src={NYTBody8} width='100%' />
            <img src={NYTFooter} width='100%' />
        </div>
    )
}

export default CovidArticle;

