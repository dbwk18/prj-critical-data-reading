import React, {useState, useEffect, useRef} from "react";
import * as d3 from 'd3';
import axios from 'axios';

import LabelDropdown from '../LabelDropdown/LabelDropdown';
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import SearchBox from "../SearchBox/SearchBox";


function InteractiveChart ( {offsetY, mainData, dataRefs, datasetDrop, listDrop, setListDrop} ) {

    // var Fred = require('fred-api');
    
    const graphRef = useRef();
    const [listSelected, setListSelected] = useState([]);
    const [dataSelected, setDataSelected] = useState(null);
    // things to be revised
    // setlistdrop({...listdrop, datarefname: [dataname]})


    useEffect(() => {
        document.getElementById('graph-container').innerHTML=""
        drawall();
    }, [dataRefs])


    useEffect(()=> {
        console.log("change dropdown", listSelected)
        document.getElementById('graph-container').innerHTML=""
        updategraph();
    }, [listSelected])



    //function for drawing graph when sentece clicked
    const drawall = async () => {

        console.log("all", dataRefs, offsetY)
        console.log("listSelected", listSelected)
        const margin = { top: 30, right: 40, bottom: 30, left:40 },
            margin2 = { top: 30, right: 40, bottom: 30, left: 40},
            width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
            width2 = d3.select(graphRef.current).node().getBoundingClientRect().width - margin2.left - margin2.right,
            height = 300,
            height2 = 100;

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
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
            

        // const time_range = await axios.get(`/${mainData.data}`, { headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        // }}).then( (response) => {
        //     const data =  response.data.observations.map((data) => {
        //             return {
        //                 date: new Date(data.date),
        //                 measurement: parseFloat(data.value) ? parseFloat(data.value) : 0
        //                 } 
        //             }, {withCredentials: true}) 
        //     console.log(data[0]['date'], data[data.length-1]['date'])
        //     return [data[0]['date'], data[data.length-1]['date']];
        // })
    
        // const xmin = time_range[0]
        // const xmax = time_range[1]
        const xmin = '1999-03-11'
        const xmax = '2023-02-26'
        // console.log(time_range, xmin, xmax)
      
        if (dataRefs.length == 1) {
            console.log(dataRefs[0])
            setListDrop([dataRefs[0]])
            setListSelected([dataRefs[0]])
            drawone(mainData, svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, dataRefs[0]);
            drawone(dataRefs[0], svg, zoomsvg, "#a5d296", 1, xmin, xmax, mainData);
        }
        else if (dataRefs.length > 1) {
            // const listRef = []
            //item {refname:[]} dictionary로 수정 
            // dataRefs.forEach((item) => {
            //     console.log(item)
            //     listRef.push(item.dataReference)
            // })
            // setListDrop(listRef);
            // setListSelected([listRef[0], listRef[1]]);
            console.log("workgingngingigngign")
            setListDrop(dataRefs);
            setListSelected([dataRefs[0], dataRefs[1]]);
            drawone(dataRefs[0], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, dataRefs[1]);
            drawone(dataRefs[1], svg, zoomsvg, "#a5d296", 1, xmin, xmax, dataRefs[0]);
        }

    }

    const updategraph = async() => {
        const margin = { top: 30, right: 40, bottom: 30, left:40 },
        margin2 = { top: 30, right: 40, bottom: 30, left: 40},
        width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
        width2 = d3.select(graphRef.current).node().getBoundingClientRect().width - margin2.left - margin2.right,
        height = 300,
        height2 = 100;


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
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        
        const time_range = await axios.get(`/${mainData.data}`, {headers: {
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
        
        const xmin = time_range[0]
        const xmax = time_range[1]

        var dropidx1 = 0;
        var dropidx2 = 0;

        if (dataRefs.length == 1) {
            console.log(dataRefs[0])
            drawone(mainData, svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, dataRefs[0]);
            drawone(dataRefs[0], svg, zoomsvg, "#a5d296", 1, xmin, xmax, mainData);
        }

        else {
            dataRefs.forEach((item, idx) => {
                    if (item.dataReference == listSelected[0]) {
                        dropidx1 = idx
                        // drawone(dataRefs[idx], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax);
                        console.log("graph1", item.dataReference)
                    }
                })
            dataRefs.forEach((item, idx) => {
                if (item.dataReference == listSelected[1]) {
                    dropidx2 = idx
                    // drawone(dataRefs[idx], svg, zoomsvg, "#a5d296", width, xmin, xmax);
                    console.log("graph2", item.dataReference)
                }
            })
            drawone(dataRefs[dropidx1], svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, dataRefs[dropidx2]);
            drawone(dataRefs[dropidx2], svg, zoomsvg, "#a5d296", 1, xmin, xmax, dataRefs[dropidx1]);
        }
    }

    //function for overlaying line graph 
    const drawone = async (dataRef, svg, zoomsvg, color, p_yaxis, xmin, xmax, brushRef) => {
        console.log("one", dataRef, dataRef.xUnit.substring(0, 1), dataRef.data);
       
        var timeUnit = null;
        if (dataRef.xUnit == "Yearly") {
            timeUnit = "%Y";
        }
        else if (dataRef.xUnit == "Monthly") {
            timeUnit = "%Y %m";
        }
        else if (dataRef.xUnit == "Weekly") {
            timeUnit = "%Y %m %d";
        }
        const timeConv = d3.timeFormat(timeUnit)

        const newdata = await axios(`/${dataRef.data}`, {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}).then( (response) => {
            const data =  response.data.observations.map((data) => {
                // if (new Date(data.date)>= xmin && new Date(data.date)<= xmax) {
                    // console.log(new Date(data.date)>= xmin)
                    return {
                        date: new Date(data.date),
                        measurement: parseFloat(data.value) 
                        } 
                    // }
                    }, {withCredentials: true}) 
                return data;
        })

        console.log(newdata)
        

        const margin = { top: 30, right: 40, bottom: 30, left:40 },
            margin2 = { top: 30, right: 40, bottom: 30, left: 40},
            width = d3.select(graphRef.current).node().getBoundingClientRect().width - margin.left - margin.right,
            // width2 = d3.select(graphRef.current).node().getBoundingClientRect().width - margin2.left - margin2.right,
            height = 300,
            height2 = 100;

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


        xScale.domain([xmin, xmax])
        xScale2.domain([xmin, xmax])
        yScale.domain([d3.min(newdata, function(d){return d.measurement;}), d3.max(newdata, function(d){return d.measurement;})]).nice()
        yScale2.domain([d3.min(newdata, function(d){return d.measurement;}), d3.max(newdata, function(d){return d.measurement;})]).nice()


        //original chart
        const line = d3.line()
        .defined(function(d) { return !isNaN(d.measurement); })
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.measurement); })

        //sub chart
        const line2 = d3.line()
        .defined(function(d) { return !isNaN(d.measurement); })
        .x(function(d) { return xScale2(d.date); })
        .y(function(d) { return yScale2(d.measurement); })

        //brush function
        const myBrush = d3.brushX()
                        .extent([[xScale.range()[0], 0], [xScale.range()[1], height2]])
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
                .style("color", "#52616a")
                .attr("dy", "1em")
            
            zoomsvg.append("g")
                .attr("class", "x-axis2")
                .attr("transform", "translate(0," + height2 + ")")
                .call(xaxis)
                .selectAll("text")
                .style("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-family", "Sans-serif")
                .style("color", "#52616a")
                .attr("dy", "1em")
        }

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(" + (p_yaxis==0 ? 0 : width) + ", 0)")
            .call(yaxis)
            .selectAll("text")
            .attr("dx", "-0.1em")
            .style("font-size", "12px")
            .style("font-family", "Sans-serif")
            .style("color", "#52616a")

        svg.select(".y-axis path")
            .style("stroke", "#52616a")
    
        svg.select(".x-axis path")
            .style("stroke", "#52616a")

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
        
            if (p_yaxis == 0) {
                svg.select(".x-axis").call(d3.axisBottom()
                    .ticks(5)
                    .tickSize(0)
                    .tickFormat(d3.timeFormat(timeUnit))
                    .scale(xScale))
                    .selectAll("text")
                    .style("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("font-family", "Sans-serif")
                    .style("color", "#52616a")
                    .attr("dy", "1em");
            }
            
            console.log("brush line", svg.selectAll(`path.line`), zoomsvg.selectAll('path.line2'))
            const lines = svg.selectAll(`path.line`)

        
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
            <div style={{backgroundColor: "#f4f4f4", 
                        width: "28vw", 
                        position: "absolute", 
                        left: "68vw", 
                        top: offsetY - 30
                    }}>
                {dataRefs.length > 0 
                ? (
                    <>
                    <LabelDropdown listDrop={listDrop} datasetDrop={datasetDrop} listSelected={listSelected} setListSelected={setListSelected} dataSelected={dataSelected} setDataSelected={setDataSelected} /> 
                    </>
                )
                : null}
                {/* <>
                    <LabelDropdown listDrop={listDrop} datasetDrop={datasetDrop} listSelected={listSelected} setListSelected={setListSelected} dataSelected={dataSelected} setDataSelected={setDataSelected} /> 
                    <SearchDropdown dataDrop={["122", "222", "344"]} dataSelected={dataSelected} setDataSelected={setDataSelected} />
                </> */}
                <div ref={graphRef} 
                    id='graph-container'
                    className='GraphContainer' 
                />
                    
            </div>
        </React.Fragment>
    )
}

export default InteractiveChart;