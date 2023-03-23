import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

import './LabelDropdown.css'


function LabelDropdown({mainData, gptRefs, datasetDrop, listSelected, setListSelected, dataSelected, setDataSelected, datasetIdx, setDatasetIdx, currSentence}) {

    console.log("dropdown", mainData, datasetDrop, gptRefs, listSelected)

    const [viewExplain1, setViewExplain1] = useState(false);
    const [viewExplain2, setViewExplain2] = useState(false);

    useEffect(()=> {
        setViewExplain1(false);
        setViewExplain2(false);
    }, [gptRefs, listSelected, datasetIdx])
  

    return (
        <div>
            { gptRefs.length > 1 
            ? [gptRefs[0], gptRefs[1]].map((item, formidx) => {
                // console.log("wht?", item, datasetDrop, datasetDrop[item], datasetDrop[listSelected[formidx]])
                return (
                <div style={{
                    // height: "140px", 
                    padding: "10px 5px", 
                    margin: "5px 10px",
                    borderLeft: `7px solid ${formidx == 0 ? "#6AAFE6" : "#a5d296"}`, 
                    borderBottom: `1px solid ${formidx == 0 ? "#6AAFE6" : "#a5d296"}`,
                    borderTop: `1px solid ${formidx == 0 ? "#6AAFE6" : "#a5d296"}`,
                    borderRight:`1px solid ${formidx == 0 ? "#6AAFE6" : "#a5d296"}`,
                    borderRadius: "4px"
                }}>
                    <div>
                        <div style={{fontSize: "12px", paddingLeft: "5px", paddingTop: "3px"}}> GPT-3 generated data references </div>
                        <select style={{height: "40px", fontSize: "12px", whiteSpace: "pre-wrap"}}
                            class="form-select"
                            as="select"
                            value={listSelected[formidx]}
                            onChange={e => {
                                console.log("e.target.value", e.target.value);
                                if (formidx == 0) setListSelected([e.target.value, listSelected[1]]);
                                else if (formidx == 1) setListSelected([listSelected[0], e.target.value]);
                            }}
                        >
                            {gptRefs.map((listvar, idx) => {
                                return (
                                    <option selected={listvar == item ? true : false} key={idx}>{listvar}</option>
                            )})}
                        </select>
                        <div style={{fontSize: "12px", paddingLeft: "5px", paddingTop: "3px"}}> Corresponding datasets </div>
                        <SearchDropdown 
                            dataDrop={datasetDrop[listSelected[formidx]]} 
                            dataSelected={datasetDrop[listSelected[formidx]][datasetIdx[formidx]]} 
                            setDataSelected={setDataSelected} 
                            datasetIdx={datasetIdx} 
                            setDatasetIdx={setDatasetIdx} 
                            dropIdx={formidx}
                            currSentence={currSentence}
                        />
                        <button 
                            className='btn btn-link btn-sm py-0 view-btn' 
                            onClick={()=>{formidx == 0 ? setViewExplain1(!viewExplain1) : setViewExplain2(!viewExplain2)}}
                        >
                            {
                                formidx == 0
                                ? (
                                    viewExplain1
                                    ? "Close the dataset explanation"
                                    : "What does this data mean?"
                                )
                                : null
                            }
                            {
                                formidx == 1
                                ? (
                                    viewExplain2
                                    ? "Close the dataset explanation"
                                    : "What does this data mean?"
                                )
                                : null
                            }
                        </button>
                        {
                            formidx == 0
                            ? (
                                viewExplain1
                                ? (
                                    <div className="view-div">
                                        {datasetDrop[listSelected[formidx]][datasetIdx[formidx]]["notes"]}
                                    </div>
                                )
                                : null
                            )
                            : null
                        }
                        {
                            formidx == 1
                            ? (
                                viewExplain2
                                ?  (
                                    <div className="view-div"> 
                                        {datasetDrop[listSelected[formidx]][datasetIdx[formidx]]["notes"]}
                                    </div>
                                )
                                : null
                            )
                            : null
                        }
                    </div>
                </div>
            )})
            : (
                gptRefs.length > 0 
                ? 
                // <div style={{height: "40px",  fontSize: "12px"}}>
                //     <div class="form-control" style={{float: "left", height: "100%", fontSize: "12px", whiteSpace: "pre-wrap"}}>{gptRefs[0]}</div>
                //     <SearchDropdown dataDrop={datasetDrop[gptRefs[0]]}  dataSelected={datasetDrop[gptRefs[0]][datasetIdx[1]]} setDataSelected={setDataSelected} datasetIdx={datasetIdx} setDatasetIdx={setDatasetIdx} dropIdx={1}/>
                // </div> 
                
                <>
                    <div style={{
                        // height: "140px", 
                        padding: "10px 5px", 
                        margin: "5px 10px",
                        borderLeft: `7px solid #6AAFE6`, 
                        borderBottom: `1px solid #6AAFE6`,
                        borderTop: `1px solid #6AAFE6`,
                        borderRight:`1px solid #6AAFE6`,
                        borderRadius: "4px"
                    }}>
                        <div>
                            <div style={{fontSize: "12px", paddingLeft: "5px", paddingTop: "3px"}}> GPT-3 generated data references </div>
                            <select 
                                style={{height: "40px", fontSize: "12px", whiteSpace: "pre-wrap"}}
                                class="form-select"
                                as="select"
                                value={mainData["GPT3-result"]}
                                disabled
                            >
                                <option>{mainData["GPT3-result"]}</option>
                            </select>
                            <div style={{fontSize: "12px", paddingLeft: "5px", paddingTop: "3px"}}> Corresponding datasets </div>
                            <SearchDropdown 
                                dataDrop={ [JSON.parse(`{"name": "${mainData.title} ${mainData.frequency}", "id": "${mainData.id}", "frequency": "${mainData.frequency}", "units": "${mainData.units}" }`) ] }  
                                dataSelected={ JSON.parse(`{"name": "${mainData.title} ${mainData.frequency}", "id": "${mainData.id}", "frequency": "${mainData.frequency}", "units": "${mainData.units}" }`)  }  
                                setDataSelected={setDataSelected} 
                                datasetIdx={datasetIdx} 
                                setDatasetIdx={setDatasetIdx} 
                                dropIdx={0}
                                currSentence={currSentence}
                            />
                            <button 
                                className='btn btn-link btn-sm py-0 view-btn' 
                                onClick={()=>{setViewExplain1(!viewExplain1);}}
                            >
                                {
                                    viewExplain1
                                    ? "Close the dataset explanation"
                                    : "View more about dataset explanation"
                                }
                            </button>
                                {
                                    viewExplain1
                                    ?  (
                                        <div className="view-div">
                                            {mainData.notes}
                                        </div>
                                    )
                                    : null
                                }
                        </div>
                    </div>
                    <div style={{
                        // height: "140px", 
                        padding: "10px 5px", 
                        margin: "5px 10px",
                        borderLeft: `7px solid #a5d296`, 
                        borderBottom: `1px solid #a5d296`,
                        borderTop: `1px solid #a5d296`,
                        borderRight:`1px solid #a5d296`,
                        borderRadius: "4px"
                    }}>
                        <div>
                            <div style={{fontSize: "12px", paddingLeft: "5px", paddingTop: "3px"}}> GPT-3 generated data references </div>
                            <select style={{height: "40px", fontSize: "12px", whiteSpace: "pre-wrap"}}
                                class="form-select"
                                as="select"
                                value={listSelected[0]}
                                onChange={e => {
                                    console.log("e.target.value", e.target.value);
                                    setListSelected([listSelected[0], e.target.value]);
                                }}
                            >
                                <option>{gptRefs[0]}</option>
                            </select>
                            <div style={{fontSize: "12px", paddingLeft: "5px", paddingTop: "3px"}}> Corresponding datasets </div>
                            <SearchDropdown 
                                dataDrop={datasetDrop[gptRefs[0]]}  
                                dataSelected={datasetDrop[gptRefs[0]][datasetIdx[1]]} 
                                setDataSelected={setDataSelected} 
                                datasetIdx={datasetIdx} 
                                setDatasetIdx={setDatasetIdx} 
                                dropIdx={1}
                                currSentence={currSentence}
                            />
                            <button 
                                className='btn btn-link btn-sm py-0 view-btn' 
                                onClick={()=>{setViewExplain2(!viewExplain2);}}
                            >
                                {
                                    viewExplain2
                                    ? "Close the dataset explanation"
                                    : "View more about dataset explanation"
                                }
                            </button>
                                {
                                    viewExplain2
                                    ?  (
                                        <div className="view-div">
                                            {datasetDrop[gptRefs[0]][datasetIdx[1]]["notes"]}
                                        </div>
                                    )
                                    : null
                                }
                        </div>
                    </div>
                </>
                : <></>
            )
            
            }
        
        </div>
    
    );
}

export default LabelDropdown;

