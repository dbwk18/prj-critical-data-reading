import * as d3 from 'd3';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import toydata from '../../data/toydata.json';
import Highlighter from 'react-highlight-words';
import NYTHeader from '../../images/NYT-unemploy/NYTHeader.png';
import NYTGraph1 from '../../images/NYT_cpi/NYTGraph1.png';
import LabelDropdown from '../../components/LabelDropdown/LabelDropdown';

import './CPIArticle.css';

function InteractiveChart ( {offsetY, mainData, dataRefs, listDrop, setListDrop} ) {

    const graphRef = useRef();
    const [listSelected, setListSelected] = useState([]);
    


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
            

        const time_range = await axios.get(`/stlouisfed/${mainData.data}`).then( (response) => {
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
        // console.log(time_range, xmin, xmax)
        
      
        if (dataRefs.length == 1) {
            console.log(dataRefs[0])
            drawone(mainData, svg, zoomsvg, "#6AAFE6", 0 , xmin, xmax, dataRefs[0]);
            drawone(dataRefs[0], svg, zoomsvg, "#a5d296", 1, xmin, xmax, mainData);
        }
        else if (dataRefs.length > 1) {
            const listRef = []
            dataRefs.forEach((item) => {
                console.log(item)
                listRef.push(item.dataReference)
            })
            setListDrop(listRef);
            setListSelected([listRef[0], listRef[1]]);
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

        
        const time_range = await axios.get(`/stlouisfed/${mainData.data}`).then( (response) => {
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

        const newdata = await axios.get(`/stlouisfed/${dataRef.data}`).then( (response) => {
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
                        // .on("end", (event)=>brushed(event, newdata));

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
                        width: "28%", 
                        position: "absolute", 
                        left: "70%", 
                        top: offsetY - 30
                        // transform: "translateX(-50%)"
                    }}>
                {dataRefs.length > 1 ? <LabelDropdown listDrop={listDrop} listSelected={listSelected} setListSelected={setListSelected}/> : null}
                <div ref={graphRef} 
                    id='graph-container'
                    className='GraphContainer' 
                />
                    
            </div>
        </React.Fragment>
    )
}

function CPIArticle() {
    
    const highlight = []
    const [offsetY, setOffsetY] = useState(null);
    const [mainData, setMainData] = useState()
    const [dataRefs, setDataRefs] = useState([]);
    const [listDrop, setListDrop] = useState([]);
    
    //add list for reference sentences
    toydata.references.forEach((item) => highlight.push(item.sentence))
    console.log(highlight, mainData)
    console.log(dataRefs)

    // useEffect(() => {
    //     // dataFilter();
    //     // console.log(filterRef)
    // }, [dataRef])

    //function for clicking highlighted sentence
    const clickhighlight = (e, sentence) => {
        toydata.references.forEach( (item) => {
            if (item.sentence == sentence.trim()) {
                setDataRefs(item.dataReferences);
                setMainData(toydata.mainData)
                setOffsetY(e.nativeEvent.pageY);
            }
        })
    }

    

    //function for preprocessing data in clicked sentence
    // const dataFilter = (dataRef) => {
    //     const newRef = []

    //     if (dataRef.length > 0) {
    //         dataRef.forEach(async (item) => {
    //             const newdata = {}
    //             // const fetch_data = axios.get(item.data).then(response => response.data)
    //             // const filter_data = axios.get(item.data).then(response => {
    //             //     const data = response.data.observations.map((data) => {
    //             //         return {
    //             //             date: data.date,
    //             //             measurement: data.value
    //             //             }
    //             //         }) 
    //             //     return data;
    //             // })
    //             // console.log(filter_data)

    //             // const fetch_data = async () => {
    //             //     const data = await filter_data;
    //             //     return data;
    //             // }

    //             newdata.dataReference = item.dataReference
    //             newdata.dataName = item.dataName
    //             newdata.xUnit = item.xUnit
    //             newdata.yUnit = item.yUnit
    //             newdata.data = await axios.get(item.data).then( (response) => {
    //                 const data =  response.data.observations.map((data) => {
    //                     return {
    //                         date: data.date,
    //                         measurement: data.value
    //                         }
    //                     }) 
    //                 return data;
    //             })
    //             newRef.push(newdata)  
    //         })
            
    //     }
    //     console.log(newRef)
    //     return newRef;
        

    // }


    return (
    <div>
        <img src={NYTHeader} width='100%' />
        <div className='g-name'>Consumer Prices Are Still Climbing Rapidly</div>
        <div className='g-details'>Inflation data showed a slowdown in annual price increases in April, but a closely watched monthly price measure continues to rise at an uncomfortably brisk rate. </div>
        
        <img src={NYTGraph1} width='100%' />
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The pressures that have kept inflation elevated for months remain strong, fresh data released Wednesday showed, a challenge for households that are trying to shoulder rising expenses and for the White House and Federal Reserve as they try to put the economy on a steadier path."
            />
        </div>

        <div>
            {dataRefs.length !== 0
             ? <InteractiveChart offsetY={offsetY} mainData={mainData} dataRefs={dataRefs} listDrop={listDrop} setListDrop={setListDrop}/>
             : null 
            }
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Annual inflation moderated for the first time in months in April, but the Consumer Price Index still increased 8.3 percent, an uncomfortably rapid pace. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="At the same time, a closely watched measure that subtracts food and fuel costs actually accelerated."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Core inflation — which excludes costs for groceries and gas — picked up 0.6 percent in April from the prior month, faster than its 0.3 percent increase in March. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="That measure is particularly important for policymakers, who use it as a gauge to help determine where inflation is headed."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="While the letup in annual inflation may have given President Biden and the Fed a dose of comfort, the overall picture remains worrying. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="Policymakers have a long way to go to bring price increases down to more normal and stable levels, and the newest data is likely to keep them focused on trying to slow an inflation rate that remains near its fastest pace in 40 years. "
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“Inflation is too high — they need to bring it down,” said Laura Rosner-Warburton, senior economist at MacroPolicy Perspectives. “The re-acceleration in core inflation is unwelcome."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The report renewed fears among investors that the Fed could speed up plans to raise interest rates, which would further take steam out of the stock market. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="The S&P 500 fell 1.6 percent, extending a five-week slide that has taken it to the cusp of a so-called bear market — a drop of more than 20 percent from a recent peak. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="At the close of trading, the index was 18 percent below its January record high. The tech-heavy Nasdaq composite, which has been in a bear market for months, fell 3.2 percent."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Annual inflation may have now peaked, having climbed by an even-quicker 8.5 percent in March. "
                onClick={(e)=>clickhighlight(e, "Annual inflation may have now peaked, having climbed by an even-quicker 8.5 percent in March. ")}
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="It slowed down in April partly because gas prices dropped lower, and partly because of a statistical quirk that will continue through the months ahead. "
                onClick={(e)=>{
                    clickhighlight(e, "It slowed down in April partly because gas prices dropped lower, and partly because of a statistical quirk that will continue through the months ahead. ")
                }}
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="Yearly price changes are now being measured against elevated price readings from last spring, when inflation started to take off. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="The higher base makes annual increases look less severe."
            />
        </div>

        <div></div>

        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Still, even the White House greeted the new report with concern. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="“While it is heartening to see that annual inflation moderated in April, the fact remains that inflation is unacceptably high,” Mr. Biden said in a statement. “Inflation is a challenge for families across the country, and bringing it down is my top economic priority.”"
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Economists do expect price increases to continue to ebb somewhat this year, because they think that consumer demand will taper off and that supply chain stresses will ease. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="The crucial question is how much and how quickly that moderation might happen."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Many analysts have been predicting a slowdown in price increases or even outright price cuts on many goods, but those forecasts look increasingly uncertain. "
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="Lockdowns in China and the war in Ukraine threaten to exacerbate supply shortages for semiconductor chips, commodities and other important products."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="There are persistent issues in supply chains,” said Matthew Luzzetti, chief U.S. economist at Deutsche Bank. “And the most recent developments have not been positive."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The path ahead for the car market, for instance, remains unclear. Supply shortfalls for used vehicles show some signs of easing, but shortfalls persist in computer chips, which are crucial to automobile production. As a result, companies are still struggling to complete vehicles."
            />
        </div> 
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Prices for used cars and trucks declined in April from the prior month, though the drop was smaller than the one in March. While car parts had become cheaper in March, they resumed their monthly increase in April. New car prices also accelerated after a lull, climbing 1.7 percent from the prior month."
            />
        </div>
        
        <div></div>
        
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="And services prices are now increasing quickly, as rents climb and as worker shortfalls lead to higher wages and steeper prices for restaurant meals and other labor-intensive purchases. "
                onClick={(e)=>clickhighlight(e, "And services prices are now increasing quickly, as rents climb and as worker shortfalls lead to higher wages and steeper prices for restaurant meals and other labor-intensive purchases. ")}
            />
            <Highlighter
                searchWords={highlight}
                textToHighlight="If that continues, it could keep inflation elevated even as supply problems are resolved."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Rents picked up by 0.6 percent in April from March, and a measure of housing costs that uses rents to estimate the cost of owned housing climbed 0.5 percent, up from 0.4 percent the prior month. The pickup in housing costs is particularly important, because they make up about a third of the overall inflation index."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“Domestically generated inflationary pressures remain strong,” Andrew Hunter, senior U.S. economist at Capital Economics, wrote after the report was released."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Part of the increase in core inflation in April owed to trends that should not last, most notably a big pop in airfares as travel demand surges after the latest wave of the coronavirus. Even so, Ms. Rosner-Warburton said she expected annual C.P.I. inflation to remain 5.1 percent at the end of the year, far above levels that prevailed before the pandemic."
            />
        </div>
       
        <div></div>
    
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The Fed aims for 2 percent annual inflation on average, though it defines that goal using a related but different measure that tends to run slightly lower and comes out with more of a delay. That inflation index picked up by 6.6 percent over the year through March, and April figures will be released later this month."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The fact that high inflation is lasting so long is a problem for the central bank. After a full year of unusually swift increases, household and investor expectations for future price changes have been creeping higher, which could perpetuate inflation if households and businesses adjust their behavior, asking for bigger raises and charging more for goods and services."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="As such risks have mounted, the Fed has begun to lift interest rates to try to keep price increases from galloping out of control in a more lasting way. In March, Fed policymakers lifted their main policy interest rate for the first time since 2018, then followed that up with the biggest increase since 2000 at their meeting last week."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="By making it more expensive to borrow money, officials hope to weaken spending and hiring, which could help supply to catch up with demand. As the economy returns to balance, inflation should come down."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Central bankers are hoping that their policies will temper economic growth without pushing unemployment up or plunging America into a recession — engineering what they often call a “soft landing.”"
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“I really want us to have that be the outcome, but I recognize that it’s not going to be easy to do,” Raphael Bostic, the president of the Federal Reserve Bank of Atlanta, said in an interview on Monday."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="Officials have roundly acknowledged that letting the economy down gently will be difficult, and some have suggested that they would be willing to inflict economic pain if that was what it took to tackle high inflation."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="If the economy gets to a point where unemployment begins climbing but inflation remains “unacceptably high,” Mr. Bostic said, price increases will be “the threat that we have to take on board.”"
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="One challenge for policymakers — and even more for families — is that price increases are surfacing in essentials. Food costs rose 0.9 percent in April from the previous month, the 17th consecutive monthly increase, Wednesday’s report showed."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="The increase was driven by dairy, nonalcoholic beverages and a 10.3 percent monthly increase in the cost of eggs, as avian flu decimated poultry flocks. Such inflation tends to especially hit the poor, who spend a bigger chunk of their budgets on needs like groceries and gas."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="But as Americans see strong job gains and strong wage growth — albeit not strong enough to fully counteract inflation — many are managing to shoulder the rising costs for now, keeping overall demand strong."
            />
        </div>
        <div className="g-body">
            <Highlighter
                searchWords={highlight}
                textToHighlight="“Consumers appear willing to accept the higher menu prices, particularly as inflation is broad,” George Holm, chief executive officer at the food distributor and restaurant supplier Performance Food Group, said on an earnings call Wednesday. “Still, this is something to closely monitor across the next few months and quarters.”"
            />
        </div>
        
       
        {/* <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">The pressures that have kept inflation elevated for months remain strong, fresh data released Wednesday showed, a challenge for households that are trying to shoulder rising expenses and for the White House and Federal Reserve as they try to put the economy on a steadier path.</p><p class="css-at9mc1 evys1bk0">Annual inflation moderated for the first time in months in April, but the Consumer Price Index still increased 8.3 percent, an uncomfortably rapid pace. At the same time, a closely watched measure that subtracts food and fuel costs actually accelerated.</p><p class="css-at9mc1 evys1bk0">Core inflation — which excludes costs for groceries and gas — picked up 0.6 percent in April from the prior month, faster than its 0.3 percent increase in March. That measure is particularly important for policymakers, who use it as a gauge to help determine where inflation is headed.</p><p class="css-at9mc1 evys1bk0">While the letup in annual inflation may have given President Biden and the Fed a dose of comfort, the overall picture remains worrying. Policymakers have a long way to go to bring price increases down to more normal and stable levels, and the newest data is likely to keep them focused on trying to slow an inflation rate that remains near its fastest pace in 40 years.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">“Inflation is too high — they need to bring it down,” said Laura Rosner-Warburton, senior economist at MacroPolicy Perspectives. “The re-acceleration in core inflation is unwelcome.”</p><p class="css-at9mc1 evys1bk0">The report renewed fears among investors that the Fed could speed up plans to raise interest rates, which would further take steam out of the stock market. The S&amp;P 500 fell 1.6 percent, extending a five-week slide that has taken it to the cusp of a so-called bear market — a drop of more than 20 percent from a recent peak. At the close of trading, the index was 18 percent below its January record high. The tech-heavy Nasdaq composite, which has been in a bear market for months, fell 3.2 percent.</p><p class="css-at9mc1 evys1bk0">Annual inflation may have now peaked, having climbed by an even-quicker 8.5 percent in March. It slowed down in April partly because gas prices dropped lower, and partly because of a statistical quirk that will continue through the months ahead. Yearly price changes are now being measured against elevated price readings from last spring, when inflation started to take off. The higher base makes annual increases look less severe.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">Still, even the White House greeted the new report with concern.</p><p class="css-at9mc1 evys1bk0">“While it is heartening to see that annual inflation moderated in April, the fact remains that inflation is unacceptably high,” Mr. Biden said in a statement. “Inflation is a challenge for families across the country, and bringing it down is my top economic priority.”</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">Economists do expect price increases to continue to ebb somewhat this year, because they think that consumer demand will taper off and that supply chain stresses will ease. The crucial question is how much and how quickly that moderation might happen.</p><div><div></div></div><p class="css-at9mc1 evys1bk0">Many analysts have been predicting a slowdown in price increases or even outright price cuts on many goods, but those forecasts look increasingly uncertain. Lockdowns in China and the war in Ukraine threaten to exacerbate supply shortages for semiconductor chips, commodities and other important products.</p><p class="css-at9mc1 evys1bk0">“There are persistent issues in supply chains,” said Matthew Luzzetti, chief U.S. economist at Deutsche Bank. “And the most recent developments have not been positive.”</p><p class="css-at9mc1 evys1bk0">The path ahead for the car market, for instance, remains unclear. Supply shortfalls for used vehicles show some signs of easing, but shortfalls persist in computer chips, which are crucial to automobile production. As a result, companies are still struggling to complete vehicles.</p><p class="css-at9mc1 evys1bk0">Prices for used cars and trucks declined in April from the prior month, though the drop was smaller than the one in March. While car parts had become cheaper in March, they resumed their monthly increase in April. New car prices also accelerated after a lull, climbing 1.7 percent from the prior month.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div>
        <div class="css-s99gbd StoryBodyCompanionColumn"><div class="css-53u6y8"><p class="css-at9mc1 evys1bk0">And services prices are now increasing quickly, as rents climb and as worker shortfalls lead to higher wages and steeper prices for restaurant meals and other labor-intensive purchases. If that continues, it could keep inflation elevated even as supply problems are resolved.</p></div><aside class="css-ew4tgv" aria-label="companion column"></aside></div> */}
        
    </div>
    )
}

export default CPIArticle;
