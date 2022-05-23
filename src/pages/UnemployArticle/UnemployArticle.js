import * as d3 from 'd3';
import React, {useState, useEffect, useRef} from 'react';

import ContextBox from '../../components/ContextBox/ContextBox';
import ArticleBox from '../../components/ArticleBox/ArticleBox';

import coviddata from '../../data/covid_confirmed_usafacts.json'

import NYTHeader from '../../images/NYT-unemploy/NYTHeader.png'
import NYTTitle from '../../images/NYT-unemploy/NYTTitle.png'
import NYTBody1 from '../../images/NYT-unemploy/NYTBody1.png'
import NYTBody2 from '../../images/NYT-unemploy/NYTBody2.png'
import NYTBody3 from '../../images/NYT-unemploy/NYTBody3.png'
import NYTBody4 from '../../images/NYT-unemploy/NYTBody4.png'
import NYTBody5 from '../../images/NYT-unemploy/NYTBody5.png'
import NYTBody6 from '../../images/NYT-unemploy/NYTBody6.png'
import NYTFooter from '../../images/NYT-unemploy/NYTFooter.png'

function UnemployGraph() {

    const graphRef = useRef();
    
    // console.log(coviddata[0])

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
            <div ref={graphRef} className='GraphContainer' style={{backgroundColor: "pink", width: "100%", height: "350px"}}/>
        </React.Fragment>
    )
}

function UnemployArticle() {

    return (
        <div>
            <img src={NYTHeader} width='100%' />
            <img src={NYTTitle} width='100%' />

            <img src={NYTBody1} width='100%' />
            <img src={NYTBody2} width='100%' />
            <img src={NYTBody3} width='100%' />
            <UnemployGraph />
            <ContextBox />

            <img src={NYTBody4} width='100%' />
            <img src={NYTBody5} width='100%' />
            <img src={NYTBody6} width='100%' />
            <img src={NYTFooter} width='100%' />
        </div>
    )
}

export default UnemployArticle;

