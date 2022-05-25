import * as d3 from 'd3';
import React, {useState, useEffect, useRef} from 'react';

import ContextBox from '../../components/ContextBox/ContextBox';
import ContextBoxPlus from '../../components/ContextBoxPlus/ContextBoxPlus';
import ArticleBox from '../../components/ArticleBox/ArticleBox';

import coviddata from '../../data/covid_confirmed_usafacts.json'
import labordata from '../../data/labor_force_participation.json'


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
    // console.log(labordata[0])
    
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


    const labordata_US = labordata.filter((d) => d.LOCATION === "USA").map((data) => {
        return {
            date: data.TIME,
            measurement: data.Value
        }
    })

    console.log(labordata_US)
    

    useEffect(()=> {
        draw();
    }, [])

    const draw = () => {
        const timeConv = d3.timeParse("%Y");
        const margin = { top: 20, right: 20, bottom: 20, left: 20 },
            width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
            height = 300;

        var svg = d3.select(graphRef.current)
            .append("svg")
            .attr("id", "svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);


        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);

        const yaxis = d3.axisLeft().ticks(6).scale(yScale).tickSize(0);

        const xaxis = d3.axisBottom()
            .ticks(6)
            .tickSize(0)
            .tickFormat(d3.timeFormat('%Y'))
            .scale(xScale);

        
        xScale.domain(d3.extent(labordata_US, function (d) {
            console.log("conv", d.date, timeConv(d.date))
            return timeConv(d.date);
        }))

        yScale.domain([(60), d3.max(labordata_US, function (d) {
            return d.measurement ;
        })]).nice()



        const line = d3.line()
            .x(function(d) { return xScale(timeConv(d.date)); })
            .y(function(d) { return yScale(d.measurement); });
        
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xaxis)
            .selectAll("text")
            .style("text-anchor", "start")
            .style("font-size", "16px")
            .style("font-family", "bold")
            .style("color", "#000000")
            .attr("dy", "1em")

        svg.append("g")
            .attr("class", "y-axis")
            .call(yaxis)
            .selectAll("text")
            .attr("dx", "-0.1em")
            .style("font-size", "16px")
            .style("font-family", "bold")
            .style("color", "#000000")

        svg.select(".y-axis path")
            .style("stroke", "#000000")
    
        svg.select(".x-axis path")
            .style("stroke", "#000000")


        svg.append("path")
        .style("fill", "none")
        // .style("stroke", "#53BAA8")
        .style("stroke", "#000000")
        .style("stroke-width", 4)
        .datum(labordata_US)
        .attr("class", "line")
        .attr("d", line)
        
        
        }

    return (
        <React.Fragment>
                <div ref={graphRef} 
                    className='GraphContainer' 
                    style={{backgroundColor: "#FFFFFF", 
                            width: "20%", 
                            position: "absolute", 
                            left: "50%", 
                            transform: "translateX(-50%)"}}
                >
                    Labor-force participation rate
                </div>
        </React.Fragment>
    )
}

function InteractiveChart() {

    const [viewMore, setViewMore] = useState(false);
    const [viewCateg, setViewCateg] = useState();
    const [viewArticle, setViewArticle] = useState(false);
    const [graphCateg, setGraphCateg] = useState();

    return(
        <React.Fragment>
            <div style={{position: "relative", left: "75%", transform:"translateX(-50%)", margin: "0px 30px",  zIndex: 100}}>
            { 
                viewMore
                ? <ContextBoxPlus setViewMore={setViewMore} viewCateg={viewCateg} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                : <ContextBox setViewMore={setViewMore} setViewCateg={setViewCateg} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} /> 
            }
            { 
                viewArticle
                ? <ArticleBox setViewArticle={setViewArticle} graphCateg={graphCateg}/>
                : <></>   
            }
            </div>
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
            <div style={{display: "flex", height: "350px"}}>
                <UnemployGraph />
                <InteractiveChart />
            </div>

            <img src={NYTBody4} width='100%' />
            <img src={NYTBody5} width='100%' />
            <img src={NYTBody6} width='100%' />
            <img src={NYTFooter} width='100%' />
        </div>
    )
}

export default UnemployArticle;

