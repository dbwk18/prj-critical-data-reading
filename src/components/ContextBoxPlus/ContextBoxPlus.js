import React, {useState, useEffect} from 'react';
import './ContextBoxPlus.css'

import ContextGraphBox from '../ContextGraphBox/ContextGraphBox';

function ContextBoxPlus( {setViewMore, viewCateg, setViewArticle} ) {

    return(
        <React.Fragment>
        <div className='contextBoxPlus' >
            <div className='contextBox-header' >
                Select chart to explore more!
            </div>
            <div className='contextBoxPlus-body'>
                <div className='category'>
                    {viewCateg === 'rel' ? 'Relevant' : (viewCateg === 'comp' ? 'Comparisons' : 'Breakdown')}
                    <div className='button'>
                        <button className='viewBtn' onClick={()=>{setViewMore(false); }}> <b>Back</b> </button>
                    </div>
                </div>
                <div className='exp'> <div className='blank'/> : same year range with given article </div>
                <div className='graphs'>
                    <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
                    <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
                    <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
                    <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
                    <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
                </div>
                
            </div>
        </div>
    </React.Fragment>
    )
}

export default ContextBoxPlus;