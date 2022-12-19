// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import {Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function LabelDropdown({listDrop, listSelected, setListSelected}) {

    console.log("dropdown", listDrop, listSelected)

    return (
        <div>
            { listDrop.length > 0
            ? [listDrop[0], listDrop[1]].map((item, formidx) => {
                return (
                //     <Form.Group controlId="formBasicSelect">
                //     {/* <Form.Label>Select Norm Type</Form.Label> */}
                    
                //   </Form.Group>
                <select style={{float: "left", width: "50%"}}
                    class="form-select"
                    as="select"
                    value={listSelected[formidx]}
                    onChange={e => {
                        console.log("e.target.value", e.target.value);
                        if (formidx == 0) setListSelected([e.target.value, listSelected[1]]);
                        else if (formidx == 1) setListSelected([listSelected[0], e.target.value]);
                    }}
                >
                    {listDrop.map((listvar, idx) => {
                        return (
                            <option selected={listvar == item ? true : false} key={idx}>{listvar}</option>
                    )})}
                </select>
                  
                
            )})
            : null }
        
        </div>
    
    );
}

export default LabelDropdown;

