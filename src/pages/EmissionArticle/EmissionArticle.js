import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from "react-router-dom";

// import toydata2 from '../../data/article_extract_text_results.json'
import emissionarticle from '../../data/emission_article.json'

import NYTHeader from '../../images/NYT-unemploy/NYTHeader.png';
import NYTGraph1 from '../../images/NYT_carbon/NYTGraph1.png';

import InteractiveChart from '../../component2/InteractiveChart/InteractiveChart';
import SearchTooltip from '../../component2/SearchTooltip/SearchTooltip';
import SearchBox from '../../component2/SearchBox/SearchBox';
import HighlightText from '../../component2/HighlightText/HighlightText';

import { getHighlight, getHighlightRef, getHighlightGPTRef, getHighlightColor, getHighlightData, getTimeFrameData } from '../../data/DataPreprocess.js';

import text_req from './../../data/article_extract_req_emission.json'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function EmissionArticle() {

    const location = useLocation();

    const [chartOpen, setChartOpen] = useState(false);

    const [mainData, setMainData] = useState(null);
    const [articleData, setArticleData] = useState(location.state.article)
    const [timeRange, setTimeRange] = useState(null);
    
    const [highlight, setHighlight] = useState(location.state.highlight);
    const [highlightRef, setHighlightRef] = useState(location.state.ref);
    const [highlightGPTRef, setHighlightGPTRef] = useState(location.state.gptref);
    const [highlightColor, setHighlightColor] = useState(location.state.color);
    const [highlightData, setHighlightData] = useState(location.state.data);
    const [timeFrameData, setTimeFrameData] = useState(location.state.timeframe)

    const [tooltipX, setTooltipX] = useState(null);
    const [tooltipY, setTooltipY] = useState(null);
    const [tooltip, setTooltip] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const [searchX, setSearchX] = useState(null);
    const [searchY, setSearchY] = useState(null);

    const [searchDefault, setSearchDefault] = useState(null);
    const [applyDefault, setApplyDefault] = useState(null);
    const [newrefSentence, setNewrefSentence] = useState(null); //sentence when making new reference

    const [offsetY, setOffsetY] = useState(null);
    const [currSentence, setCurrSentence] = useState(null); //sentence currently highlighted
    const [dataRefs, setDataRefs] = useState([]);
    const [gptRefs, setGPTRefs] = useState([]);
    const [datasetDrop, setDatasetDrop] = useState([]);
    const [listSelected, setListSelected] = useState([]);

    const [update, setUpdate] = useState(0);
    const [toastStatus, setToastStatus] = useState(null);

    const errorNotify = () => {toast.error("Failed to create a data reference");}
    const successNotify = (name) => toast.success(`Data reference "${name}" is created`);


    //process maindata & default time range
    useEffect(() => {
        const main_data = JSON.parse(window.sessionStorage.getItem("user-article")).main_data.dataName;
        setMainData(main_data);

        axios.get(`http://internal.kixlab.org:7887/query_data?dataset_id=${main_data.id}`, { headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }}).then( (response) => {
            const data =  response.data.observations.map((data) => {
                    return {
                        date: new Date(data.date),
                        measurement: parseFloat(data.value) ? parseFloat(data.value) : 0
                        } 
                    }, {withCredentials: true}) 

            // console.log(data[0]['date'], data[data.length-1]['date'])
            setTimeRange( [data[0]['date'], data[data.length-1]['date']] );
        })

    }, [])

    //update new reference if user create
    useEffect(()=> {

        text_req['user_email'] =  JSON.parse(window.sessionStorage.getItem("user-email"))["name"]

        //process article & process data => update when user creates ref 
        axios.post(`http://internal.kixlab.org:7887/process_article`, 
        text_req,
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log("ARTICLE", res);
            window.sessionStorage.setItem("user-article", JSON.stringify(res.data));
            window.sessionStorage.setItem("user-highlight", JSON.stringify(getHighlight(res.data)));
            window.sessionStorage.setItem("user-highlight-ref", JSON.stringify(getHighlightRef(res.data)));
            window.sessionStorage.setItem("user-highlight-gptref", JSON.stringify(getHighlightGPTRef(res.data)));
            window.sessionStorage.setItem("user-highlight-color", JSON.stringify(getHighlightColor(res.data)));
            window.sessionStorage.setItem("user-highlight-data", JSON.stringify(getHighlightData(res.data)));
            window.sessionStorage.setItem("user-timeframe-data", JSON.stringify(getTimeFrameData(res.data)));


            setHighlight(getHighlight(res.data));
            setHighlightRef(getHighlightRef(res.data));
            setHighlightGPTRef(getHighlightGPTRef(res.data));
            setHighlightColor(getHighlightColor(res.data));
            setHighlightData(getHighlightData(res.data));
            setTimeFrameData(getTimeFrameData(res.data));

        })  

        console.log("user-info", window.sessionStorage.getItem("user-email"), JSON.parse(window.sessionStorage.getItem("user-article")))


    }, [update])

    useEffect(() => {

        console.log("process", highlight, highlightRef, highlightColor, highlightData, timeFrameData)
        
        //update the dropdown
        if (currSentence !== null) {
            setDataRefs(highlightRef[currSentence])
            setGPTRefs(highlightGPTRef[currSentence])
            setDatasetDrop(highlightData[currSentence])
            highlightRef[currSentence].length == 1 
            ? setListSelected([highlightGPTRef[currSentence][highlightRef[currSentence].length-1]]) 
            : (highlightRef[currSentence].length == 2 
                ? setListSelected([highlightGPTRef[currSentence][highlightRef[currSentence].length-1], highlightGPTRef[currSentence][0]])
                : setListSelected([highlightGPTRef[currSentence][highlightRef[currSentence].length-1], highlightGPTRef[currSentence][1]])
            )
        }

    }, [window.sessionStorage.getItem("user-article")])


    useEffect(()=> {

        if (toastStatus != null) {
            if (toastStatus == 'fail') errorNotify();
            else successNotify(toastStatus);
        }

        setToastStatus(null);

    }, [toastStatus])


    document.addEventListener("dragstart", event => {
        // 투명도 초기화
        console.log("drag", event.target)
        // event.target.classList.remove("dragging");
      });


    //function for clicking highlighted sentence
    const clickhighlight = (e, sentence) => {
        setChartOpen(true);
        articleData.sentences.forEach( (item) => {
            if (item.sentence == sentence.trim()) {
                // setMainData(JSON.parse(window.sessionStorage.getItem("user-article")).main_data.dataName);
                // setTimeFrame(JSON.parse(window.sessionStorage.getItem("user-article")).sentences)
                setCurrSentence(sentence.trim())
                setDataRefs(highlightRef[sentence.trim()])
                setGPTRefs(highlightGPTRef[sentence.trim()])
                setDatasetDrop(highlightData[sentence.trim()])
                highlightRef[sentence.trim()].length == 1 ? setListSelected([highlightGPTRef[sentence.trim()][0]]) : setListSelected([highlightGPTRef[sentence.trim()][0], highlightGPTRef[sentence.trim()][1]])
                setOffsetY(e.nativeEvent.pageY);
                setNewrefSentence(sentence);
            }
        })
    }
    

    // select range of highlight
    function highlightSelect() {
        const xs = document.createRange();
        const s_offset = window.getSelection().getRangeAt(0).startOffset;
        const e_offset = window.getSelection().getRangeAt(0).endOffset;
        const s_container = window.getSelection().getRangeAt(0).startContainer;
        const e_container = window.getSelection().getRangeAt(0).endContainer;


        if (s_offset != e_offset) {
            setSearchDefault(window.getSelection().toString());
            xs.setStart(s_container, s_offset);
            xs.setEnd(e_container, e_offset);
        }
 
        return s_offset != e_offset ? xs : null;
    }
  

    // remove the previous highlight
    function removeHighlight() {
        if (document.getElementsByClassName('one').length > 0) {
            const rmhighlight = document.getElementsByClassName('one')[0]
            const addelement = rmhighlight.innerHTML
            rmhighlight.replaceWith(addelement)
        }
    }


    // add new highlight 
    function highlightText(range) {
        const newNode = document.createElement('div');
        newNode.setAttribute('style', 'background-color: #a3daff; display: inline;');
        newNode.setAttribute('class', 'one');
        range.surroundContents(newNode);
    }



    return (
    <div>
        <ToastContainer />

        {/* <img src={NYTHeader} width='100%' /> */}
        <div className='g-header'>
            <button className="btn btn-outline-primary btn-sm disabled">Go To Next Article</button>
        </div>
        <div className='g-name'>{emissionarticle["title"]}</div>
        <div className='g-details'>{emissionarticle["details"]}</div>
        
        <div className='g-body'>
            <img src={NYTGraph1} width='100%' />
        </div>

        <div>
            {dataRefs.length !== 0
             ? <InteractiveChart 
                    chartOpen={chartOpen}
                    setChartOpen={setChartOpen}
                    offsetY={offsetY} 
                    mainData={mainData} 
                    dataRefs={dataRefs} 
                    gptRefs={gptRefs}
                    datasetDrop={datasetDrop}
                    listSelected={listSelected}
                    setListSelected={setListSelected}
                    timeFrameData={timeFrameData[currSentence]}
                    highlightRef={highlightRef}
                    setHighlightRef={setHighlightRef}
                    highlightColor={highlightColor}
                    setHighlightColor={setHighlightColor}
                    currSentence={currSentence}
                    timeRange={timeRange}
                />
             : null 
            }
        </div>

        <div>
            {tooltip
                ? <SearchTooltip 
                        setSearchBox={setSearchBox} 
                        offsetX={tooltipX} 
                        offsetY={tooltipY} 
                        setSearchX={setSearchX}
                        setSearchY={setSearchY} 
                        searchDefault={searchDefault} 
                        setApplyDefault={setApplyDefault}
                    />
                : null 
            }
            {searchBox 
                ? <SearchBox 
                        offsetX={searchX}
                        offsetY={searchY} 
                        defaultInput={applyDefault} 
                        setSearchBox={setSearchBox} 
                        setTooltip={setTooltip}
                        newrefSentence={newrefSentence}
                        update={update}
                        setUpdate={setUpdate}
                        setToastStatus={setToastStatus}
                        removeHighlight={removeHighlight}
                        articleURL = {text_req.url}
                    /> 
                : null
            } 
        </div>
        
        <div onMouseUp={(e)=>{
            const range = highlightSelect();

            if (range) {
                removeHighlight();
                highlightText(range);
                setTooltipX(e.nativeEvent.pageX);
                setTooltipY(e.nativeEvent.pageY);
                setTooltip(true);
            }
            else {
                setTooltipX(null);
                setTooltipY(null);
                setTooltip(false);
                
            }
        }}>
            {
                emissionarticle.paragraphs.map((paragraph, idx) => {
                    return (
                        <div className="g-body">
                            {paragraph.map((sentence, idx) => {
                                // console.log(idx, sentence, highlightRef[sentence], highlightColor[sentence])
                                if (highlight.includes(sentence)) {
                                    return (
                                        HighlightText(sentence, highlight, highlightRef[sentence],highlightColor[sentence], clickhighlight, newrefSentence)
                                    )
                                }
                                else {
                                    return (
                                        `${sentence}&nbsp;`
                                    )
                                }
                                
                            })}
                        </div>
                    )
                })
            }

        </div>
        
    </div>
    )
}

export default EmissionArticle;
