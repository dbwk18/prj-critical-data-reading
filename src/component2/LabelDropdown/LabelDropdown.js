import { useEffect } from 'react';

import {highlightData} from '../../data/DataPreprocess.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';


function LabelDropdown({gptRefs, datasetDrop, listSelected, setListSelected, dataSelected, setDataSelected, datasetIdx, setDatasetIdx}) {

    // console.log("dropdown", datasetDrop, gptRefs, listSelected)

    return (
        <div>
            { gptRefs.length > 1 
            ? [gptRefs[0], gptRefs[1]].map((item, formidx) => {
                // console.log("wht?", item, datasetDrop, datasetDrop[item], datasetDrop[listSelected[formidx]])
                return (
                <div style={{height: "60px"}}>
                    <select style={{float: "left", width: "30%", height: "100%", fontSize: "12px", whiteSpace: "pre-wrap"}}
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
                    <SearchDropdown dataDrop={datasetDrop[listSelected[formidx]]} dataSelected={datasetDrop[listSelected[formidx]][datasetIdx[formidx]]} setDataSelected={setDataSelected} datasetIdx={datasetIdx} setDatasetIdx={setDatasetIdx} dropIdx={formidx}/>
                </div>
            )})
            : (
                gptRefs.length > 0 
                ? 
                <div style={{height: "60px",  fontSize: "11px"}}>
                    <div class="form-control" style={{float: "left", width: "30%", height: "100%", fontSize: "12px", whiteSpace: "pre-wrap"}}>{gptRefs[0]}</div>
                    <SearchDropdown dataDrop={datasetDrop[gptRefs[0]]}  dataSelected={datasetDrop[gptRefs[0]][datasetIdx[1]]} setDataSelected={setDataSelected} datasetIdx={datasetIdx} setDatasetIdx={setDatasetIdx} dropIdx={1}/>
                </div> 
                : <></>
            )
            
            }
        
        </div>
    
    );
}

export default LabelDropdown;

