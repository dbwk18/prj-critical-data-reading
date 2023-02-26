import {highlightData} from '../../data/DataPreprocess.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

function LabelDropdown({dataRefs, datasetDrop, listSelected, setListSelected, dataSelected, setDataSelected}) {

    console.log("dropdown", datasetDrop, dataRefs, listSelected)

    return (
        <div>
            { dataRefs.length > 1 
            ? [dataRefs[0], dataRefs[1]].map((item, formidx) => {
                console.log("wht?", item, datasetDrop, datasetDrop[item], datasetDrop[listSelected[formidx]])
                return (
                <>
                    <select style={{float: "left", width: "35%"}}
                        class="form-select"
                        as="select"
                        value={listSelected[formidx]}
                        onChange={e => {
                            console.log("e.target.value", e.target.value);
                            if (formidx == 0) setListSelected([e.target.value, listSelected[1]]);
                            else if (formidx == 1) setListSelected([listSelected[0], e.target.value]);
                        }}
                    >
                        {dataRefs.map((listvar, idx) => {
                            return (
                                <option selected={listvar == item ? true : false} key={idx}>{listvar}</option>
                        )})}
                    </select>
                    <SearchDropdown dataDrop={datasetDrop[listSelected[formidx]]} dataSelected={datasetDrop[listSelected[formidx]][0]} setDataSelected={setDataSelected} />
            </>
            )})
            : (
                dataRefs.length > 0 
                ? 
                <>
                    <div class="form-control" style={{float: "left", width: "35%"}}>{dataRefs[0]}</div>
                    <SearchDropdown dataDrop={datasetDrop[dataRefs[0]]}  dataSelected={datasetDrop[dataRefs[0]][0]} setDataSelected={setDataSelected} />
                </> 
                : <></>
            )
            
            }
        
        </div>
    
    );
}

export default LabelDropdown;

