import React, {useState, useEffect, useRef} from "react";
import * as d3 from 'd3';
import { textwrap } from 'd3-textwrap';
import axios from 'axios';

import LabelDropdown from '../LabelDropdown/LabelDropdown';
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import SearchBox from "../SearchBox/SearchBox";


function InteractiveChart ( {offsetY, mainData, dataRefs, gptRefs, datasetDrop, listSelected, setListSelected, timeFrameData, highlightRef, setHighlightRef, highlightColor, setHighlightColor, currSentence} ) {
    
    const graphRef = useRef();
    const [dataSelected, setDataSelected] = useState(null);
    const [datasetIdx, setDatasetIdx] = useState([0, 0]);


    useEffect(() => {
        document.getElementById('graph-container').innerHTML=""
        drawall();
    }, [dataRefs])


    useEffect(()=> {
        console.log("change dropdown", listSelected, timeFrameData)
        document.getElementById('graph-container').innerHTML=""
        updategraph();
    }, [listSelected, datasetIdx])



    //function for drawing graph when sentece clicked
    const drawall = async () => {

        console.log("all", dataRefs, offsetY)
        console.log("listSelected", listSelected)
        const margin = { top: 30, right: 50, bottom: 30, left:50 },
            margin2 = { top: 0, right: 50, bottom: 50, left: 50},
            width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
            width2 = d3.select(graphRef.current).node().getBoundingClientRect().width - margin2.left - margin2.right,
            height = 300,
            height2 = 40;

        var svg = d3.select(graphRef.current)
            .append("svg")
            .attr("id", "svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var zoomsvg = d3.select(graphRef.current)
            .append("svg")
            .attr("id", "zoom-svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height2 + margin2.top + margin2.bottom)
            .append("g")
            .attr("transform", `translate(${margin2.left}, ${margin2.top})`);
        

        const time_range = await axios.get(`http://internal.kixlab.org:7887/query_data?dataset_id=${mainData.id}`, { headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}).then( (response) => {
            const data =  response.data.observations.map((data) => {
                    return {
                        date: new Date(data.date),
                        measurement: parseFloat(data.value) ? parseFloat(data.value) : 0
                        } 
                    }, {withCredentials: true}) 
            console.log(data[0]['date'], data[data.length-1]['date'])
            return [data[0]['date'], data[data.length-1]['date']];
        })
    
        // const xmin = time_range[0]
        // const xmax = time_range[1]

        const xmin = new Date();
        const xmax = new Date();
        xmin.setFullYear(xmin.getFullYear()-10);
        console.log("MINMAX", xmin, xmax)
      
        if (dataRefs.length == 1) {
            console.log(dataRefs[0])
            drawone(mainData, svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, gptRefs[0]);
            drawone(datasetDrop[gptRefs[0]][0], svg, zoomsvg, "#a5d296", 1, xmin, xmax, mainData);
        }
        else if (dataRefs.length > 1) {
            console.log("WHY???", datasetDrop, dataRefs, gptRefs)
            drawone(datasetDrop[gptRefs[0]][0], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, gptRefs[1]);
            drawone(datasetDrop[gptRefs[1]][0], svg, zoomsvg, "#a5d296", 1, xmin, xmax, gptRefs[0]);
        }

    }

    const updategraph = async() => {
        const margin = { top: 30, right: 50, bottom: 30, left:50 },
        margin2 = { top: 0, right: 50, bottom: 20, left: 50},
        margin3 = { top: 10, right: 50, bottom: 50, left: 50},
        width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
        width2 = d3.select(graphRef.current).node().getBoundingClientRect().width - margin2.left - margin2.right,
        height = 300,
        height2 = 40,
        height3 = 20;


        var svg = d3.select(graphRef.current)
            .append("svg")
            .attr("id", "svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var zoomsvg = d3.select(graphRef.current)
            .append("svg")
            .attr("id", "zoom-svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height2 + margin2.top + margin2.bottom)
            .append("g")
            .attr("transform", `translate(${margin2.left}, ${margin2.top})`);

        var labelsvg = d3.select(graphRef.current)
            .append("svg")
            .attr("id", "label-svg")
            .attr("width", width + margin3.left + margin3.right)
            .attr("height", height3 + margin3.top + margin3.bottom)
            .append("g")
            .attr("transform", `translate(${margin3.left}, ${margin3.top})`);

        
        const time_range = await axios.get(`http://internal.kixlab.org:7887/query_data?dataset_id=${mainData.id}`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}).then( (response) => {
            const data =  response.data.observations.map((data) => {
                    return {
                        date: new Date(data.date),
                        measurement: parseFloat(data.value) ? parseFloat(data.value) : 0
                        } 
                    }, {withCredentials: true}) 
            console.log(data[0]['date'], data[data.length-1]['date'])
            return [data[0]['date'], data[data.length-1]['date']];
        })
        
        const xmin = new Date();
        const xmax = new Date();
        xmin.setFullYear(xmin.getFullYear()-10);

        var dropidx1 = 0;
        var dropidx2 = 0;

        if (dataRefs.length == 1) {
            drawone(mainData, svg, zoomsvg, labelsvg, "#6AAFE6", 0 , xmin, xmax, gptRefs[0]);
            drawone(datasetDrop[gptRefs[0]][datasetIdx[1]], svg, zoomsvg, labelsvg, "#a5d296", 1, xmin, xmax, mainData);
        }
        else {
            // gptRefs.forEach((item, idx) => {
            //         if (item == listSelected[0]) {
            //             dropidx1 = item
            //             // drawone(dataRefs[idx], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax);
            //             drawone(datasetDrop[item], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax);

            //             console.log("graph1", item)
            //         }
            //     })
            // gptRefs.forEach((item, idx) => {
            //     if (item == listSelected[1]) {
            //         dropidx2 = item
            //         // drawone(dataRefs[idx], svg, zoomsvg, "#a5d296", width, xmin, xmax);
            //         drawone(datasetDrop[item], svg, zoomsvg, "#a5d296", 0 , xmin, xmax);
            //         console.log("graph2", item)
            //     }
            // })
            console.log("update graph", datasetDrop[listSelected[0]], datasetIdx)
            drawone(datasetDrop[listSelected[0]][datasetIdx[0]], svg, zoomsvg, labelsvg, "#6AAFE6", 0 , xmin, xmax, gptRefs[1]);
            drawone(datasetDrop[listSelected[1]][datasetIdx[1]], svg, zoomsvg, labelsvg, "#a5d296", 1, xmin, xmax, gptRefs[0]);
            
            // drawone(datasetDrop[dropidx1], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, datasetDrop[dropidx2]);
            // drawone(datasetDrop[dropidx2], svg, zoomsvg, "#a5d296", 1, xmin, xmax, datasetDrop[dropidx1]);
        }
    }

    //function for overlaying line graph 
    const drawone = async (dataset, svg, zoomsvg, labelsvg, color, p_yaxis, xmin, xmax, brushRef) => {
        console.log("drawone", dataset);
       
        var timeUnit = null;
        if (dataset.frequency.includes("Annual")) {
            timeUnit = "%Y";
        }
        else if (dataset.frequency.includes("Semiannual")) {
            timeUnit = "%Y %m";
        }
        else if (dataset.frequency.includes("Monthly")) {
            timeUnit = "%Y %m";
        }
        else if (dataset.frequency.includes("Quarterly")) {
            timeUnit = "%Y %m";
        }
        else if (dataset.frequency.includes("Weekly")) {
            timeUnit = "%Y %m %d";
        }
        else if (dataset.frequency.includes("Daily")) {
            timeUnit = "%Y %m %d";
        }
        const timeConv = d3.timeFormat(timeUnit)
        
        const time_range = await axios.get(`http://internal.kixlab.org:7887/query_data?dataset_id=${mainData.id}`, { headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}).then( (response) => {
            const data =  response.data.observations.map((data) => {
                    return {
                        date: new Date(data.date),
                        measurement: parseFloat(data.value) ? parseFloat(data.value) : 0
                        } 
                    }, {withCredentials: true}) 
            console.log(data[0]['date'], data[data.length-1]['date'])
            return [data[0]['date'], data[data.length-1]['date']];
        })

        const newdata = await axios(`http://internal.kixlab.org:7887/query_data?dataset_id=${dataset.id}`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}).then( (response) => {
            const data = response.data.observations
                        // .filter((data)=> (new Date(data.date)>= xmin && new Date(data.date)<= xmax))
                        .map((data) => {return {
                            date: new Date(data.date),
                            measurement: parseFloat(data.value) 
                            } }, {withCredentials: true})
                return data;
        })

        console.log("NEWData", newdata)
        

        const margin = { top: 30, right: 50, bottom: 30, left:50 },
            margin2 = { top: 0, right: 50, bottom: 30, left: 50},
            width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
            // width2 = d3.select(graphRef.current).node().getBoundingClientRect().width - margin2.left - margin2.right,
            height = 300,
            height2 = 40;

        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);
        const xScale2 = d3.scaleTime().range([0, width]);
        const yScale2 = d3.scaleLinear().rangeRound([height2, 0]);

        const yaxis = p_yaxis == 0  
                    ? d3.axisLeft().ticks(6).scale(yScale).tickSize(0) 
                    : d3.axisRight().ticks(6).scale(yScale).tickSize(0)

        const xaxis = d3.axisBottom()
            .ticks(5)
            .tickSize(0)
            .tickFormat(d3.timeFormat(timeUnit))
            .scale(xScale);

        const xaxis2 = d3.axisBottom()
            .ticks(5)
            .tickSize(0)
            .tickFormat(d3.timeFormat(timeUnit))
            .scale(xScale2);


        xScale.domain([xmin, xmax])
        xScale2.domain([time_range[0], xmax])
        yScale.domain([d3.min(newdata, function(d){return d.measurement;}), d3.max(newdata, function(d){return d.measurement;})]).nice()
        yScale2.domain([d3.min(newdata, function(d){return d.measurement;}), d3.max(newdata, function(d){return d.measurement;})]).nice()


        //original chart
        const line = d3.line()
        .defined(function(d) { return !isNaN(d.measurement) && d.date >= xmin && d.date <= xmax })
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.measurement); })

        //sub chart
        const line2 = d3.line()
        .defined(function(d) { return !isNaN(d.measurement) && d.date >= time_range[0] && d.date <= xmax })
        .x(function(d) { return xScale2(d.date); })
        .y(function(d) { return yScale2(d.measurement); })

        //brush function
        const myBrush = d3.brushX()
                        .extent([[xScale2.range()[0], 0], [xScale2.range()[1], height2]])
                        .on("brush", (event)=>brushed(event, newdata))


        //draw xaxis only once
        if (p_yaxis == 0) {
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xaxis)
                .selectAll("text")
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-family", "Sans-serif")
                .style("color", "#8b8687")
                .attr("dy", "1em")
            
            zoomsvg.append("g")
                .attr("class", "x-axis2")
                .attr("transform", "translate(0," + height2 + ")")
                .call(xaxis2)
                .selectAll("text")
                .style("text-anchor", "middle")
                .style("font-size", "10px")
                .style("font-family", "Sans-serif")
                .style("color", "#8b8687")
                .attr("dy", "1em")
            
            timeFrameData.forEach((timeframe, idx)=> {
                if (timeframe.time_start != null && timeframe.time_end != null) {
                    var startdate = new Date(timeframe.time_start);
                    var enddate = new Date(timeframe.time_end); //one more day (in case: time_start == time_end)
                    enddate.setDate(enddate.getDate() + 3);
                    var left = xScale(startdate);
                    var right = xScale(enddate); 
                    var brushleft = xScale2(startdate);
                    var brushright = xScale2(enddate);
                    var wid = right - left;
                    var brushwid = brushright - brushleft;
    
                    svg.append("rect")
                        .attr("x", left)
                        .attr("width", wid)
                        .attr("height", height)
                        .attr("class", `timeframe-${idx}`)
                        .style("stroke", "#eb9f9f")
                        .style("fill", "#eb9f9f")
                        .on("mouseover", function(d) {
                            const newHighlightRef = highlightRef
                            newHighlightRef[currSentence].push(timeframe.sentence_part)
                            setHighlightRef(newHighlightRef)
    
                            const newHighlightColor = highlightColor
                            newHighlightColor[currSentence][timeframe.sentence_part] = 'timeref'
                            setHighlightColor(newHighlightColor)
                            console.log("HIGHLIGHTHOVER", newHighlightRef[currSentence], newHighlightColor[currSentence])
                            })                  
                            .on("mouseout", function(d) {
                            setHighlightRef(JSON.parse(window.sessionStorage.getItem("user-highlight-ref")))
                            setHighlightColor(JSON.parse(window.sessionStorage.getItem("user-highlight-color")))
                            });
    
                    zoomsvg.append("rect")
                        .attr("x", brushleft)
                        .attr("width", brushwid)
                        .attr("height", height2)
                        .style("stroke", "#eb9f9f")
                        .style("fill", "#eb9f9f")
    
                    console.log("TIMEFRAMERANGE", timeframe.time_start, new Date(timeframe.time_start))
                        
    
                }
            })
        
        }
          
        const wrap = textwrap()
                .bounds({height: 15, width: 320}) //pixels
                .method('tspans');
      

        var size = 10
        if (p_yaxis == 0) {
            labelsvg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", size)
                .attr("height", size)
                .style("fill", color)
            labelsvg.append("text")
                .attr("x", 0 + size*1.2)
                .attr("y", 0 + size/1.3)
                .style("fill", color)
                .style("font-size", "10px")
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
                .style("vertical-align", "middle")
                .text(dataset.name ? dataset.name : dataset.title)
                .call(wrap);
        }
        else {
            labelsvg.append("rect")
                .attr("x", 0)
                .attr("y", size*2)
                .attr("width", size)
                .attr("height", size)
                .style("fill", color)
            labelsvg.append("text")
                .attr("x", 0 + size*1.2)
                .attr("y", size*2 + size/1.3)
                .style("fill", color)
                .style("font-size", "10px")
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
                .style("vertical-align", "middle")
                .text(dataset.name ? dataset.name : dataset.title)
                .call(wrap);
        }

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + (p_yaxis==0 ? 0 : width) + ", 0)")
            .call(yaxis)
            .selectAll("text")
            .attr("dx", "-0.1em")
            .style("font-size", "12px")
            .style("font-family", "Sans-serif")
            .style("color", color)

        svg.selectAll(".y-axis path")
            .attr("stroke", "#8b8687")
    
        svg.selectAll(".x-axis path")
            .attr("stroke", "#8b8687")

        zoomsvg.selectAll(".x-axis2 path")
            .attr("stroke", "#8b8687")

        svg.append("path")
            .style("fill", "none")
            .style("stroke", color)
            .style("stroke-width", 3)
            .datum(newdata)
            .attr("class", `line ${p_yaxis == 0 ? "main" : "sub"}`)
            .attr("d", line)

        zoomsvg.append("path")
            .style("fill", "none")
            .style("stroke", color)
            .style("stroke-width", 3)
            .datum(newdata)
            .attr("class", "line2")
            .attr("d", line2)
            
        zoomsvg.call(myBrush)
               .call(myBrush.move, [xmin, xmax].map(xScale2)) //default range svg(xmin, xmax)

                
        // ${dataRef.dataReference.replace(/\s/gi, "")}
        // zoomsvg.append("g")
        //     .attr("class", "x-brush")
        //     .call(myBrush)
       
        // zoomsvg.call(myBrush)

        // zoomsvg.append("g")
        //       .attr("class", "x-brush")
        //       .call(myBrush)
            //   .call(myBrush.move, xScale.range())
            //   .selectAll("rect")
            //   .attr("y", -7)
            //   .attr("height", height2 + 7);
        


        function brushed(event) {
            var s = event.selection;
            console.log("brush", newdata, xScale2.invert(s[0]), xScale2.invert(s[1]))
   
            xScale.domain(event.selection === null ? xScale.domain() : [xScale2.invert(s[0]), xScale2.invert(s[1])]);
            // yScale.domain([d3.min(newdata, function(d){return d.measurement;}), d3.max(newdata, function(d){return d.measurement;})]).nice()
        
            // if (p_yaxis == 0) {
            svg.select(".x-axis").call(d3.axisBottom()
                .ticks(5)
                .tickSize(0)
                .tickFormat(d3.timeFormat(timeUnit))
                .scale(xScale))
                .selectAll("text")
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-family", "Sans-serif")
                .style("color", "#8b8687")
                .attr("dy", "1em");
            // }
            
            console.log("brush line", svg.selectAll(`path.line`), zoomsvg.selectAll('path.line2'))
            const lines = svg.selectAll(`path.line`)
            const timeline = svg.selectAll(`rect`)
        
            const brushyScale0 = d3.scaleLinear().rangeRound([height, 0]);
            const brushyScale1 = d3.scaleLinear().rangeRound([height, 0]);

            lines.each((data, idx) => {
                console.log(data, idx)
                if (p_yaxis == 0) {
                    if (data == newdata) {
                        brushyScale0.domain([d3.min(data, function(d){return d.measurement;}), d3.max(data, function(d){return d.measurement;})]).nice()
                    }
                    else {
                        brushyScale1.domain([d3.min(data, function(d){return d.measurement;}), d3.max(data, function(d){return d.measurement;})]).nice()
                    }
                }
                else {
                    if (data != newdata) {
                        brushyScale0.domain([d3.min(data, function(d){return d.measurement;}), d3.max(data, function(d){return d.measurement;})]).nice()
                    }
                    else {
                        brushyScale1.domain([d3.min(data, function(d){return d.measurement;}), d3.max(data, function(d){return d.measurement;})]).nice()
                    }
                }
            })

            timeline.each((data, idx) => {
                console.log("TIMETIMETIME", data, idx)
            })
            
            timeFrameData.forEach((timeframe, idx)=> {
                if (timeframe.time_start != null && timeframe.time_end != null) {
                    var startdate = new Date(timeframe.time_start);
                    var enddate = new Date(timeframe.time_end); //one more day (in case: time_start == time_end)
                    enddate.setDate(enddate.getDate() + 5);
                    var left = xScale(startdate);
                    var right = xScale(enddate); 
                    var wid = right - left;

                    if (startdate > xScale2.invert(s[0]) && enddate < xScale2.invert(s[1])) {
                        svg.select(`.timeframe-${idx}`)
                            .attr("visibility", "visible")
                            .attr("x", left)
                            .attr("width", wid)
                            .attr("height", height)
                            .style("stroke", "#eb9f9f")
                            .style("fill", "#eb9f9f")
                            .on("mouseover", function(d) {
                                const newHighlightRef = highlightRef
                                newHighlightRef[currSentence].push(timeframe.sentence_part)
                                setHighlightRef(newHighlightRef)
        
                                const newHighlightColor = highlightColor
                                newHighlightColor[currSentence][timeframe.sentence_part] = 'timeref'
                                setHighlightColor(newHighlightColor)
                                console.log("HIGHLIGHTHOVER", newHighlightRef[currSentence], newHighlightColor[currSentence])
                                })                  
                                .on("mouseout", function(d) {
                                setHighlightRef(JSON.parse(window.sessionStorage.getItem("user-highlight-ref")))
                                setHighlightColor(JSON.parse(window.sessionStorage.getItem("user-highlight-color")))
                                });
                    }
                    else {
                        svg.select(`.timeframe-${idx}`)
                            .attr("visibility", "hidden")
                    }
                }
            })
            svg.select(`path.line.main`).attr("d", d3.line()
                .defined(function(d) { return !isNaN(d.measurement) && d.date >= xScale2.invert(s[0]) && d.date <= xScale2.invert(s[1]) })
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return  brushyScale0(d.measurement)}))

            svg.select(`path.line.sub`).attr("d", d3.line()
                .defined(function(d) { return !isNaN(d.measurement) && d.date >= xScale2.invert(s[0]) && d.date <= xScale2.invert(s[1]) })
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return  brushyScale1(d.measurement)}))


        }
            
    }

    return (
        <React.Fragment>
            <div style={{backgroundColor: "#f9f9f9", 
                        width: "29vw", 
                        position: "absolute", 
                        left: "58vw", 
                        top: offsetY - 30,
                        borderRadius: "8px",
                        padding: "10px 0"
                    }}>
                {dataRefs.length > 0 
                ? (
                    <>
                    <LabelDropdown gptRefs={gptRefs} datasetDrop={datasetDrop} listSelected={listSelected} setListSelected={setListSelected} dataSelected={dataSelected} setDataSelected={setDataSelected} datasetIdx={datasetIdx} setDatasetIdx={setDatasetIdx}/> 
                    </>
                )
                : null}
                {/* <>
                    <SearchDropdown dataDrop={["122", "222", "344"]} dataSelected={dataSelected} setDataSelected={setDataSelected} />
                </> */}
                <div ref={graphRef} 
                    id='graph-container'
                    className='GraphContainer' 
                    style={{textAlign: "center"}}
                />
                    
            </div>
        </React.Fragment>
    )
}

export default InteractiveChart;