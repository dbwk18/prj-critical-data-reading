import React, {useState, useEffect} from 'react';
import './ContextBoxPlus.css'

import ContextGraphBox from '../ContextGraphBox/ContextGraphBox';
import contextdata from '../../data/contextvarDB.json';


function ContextBoxPlus( {setViewMore, viewCateg, setViewArticle, setGraphCateg} ) {
    console.log(viewCateg, Object.keys(contextdata[viewCateg]))
    return(
        <React.Fragment>
        <div className='contextBoxPlus' >
            <div className='contextBox-header' >
                Select chart to explore more!
            </div>
            <div className='contextBoxPlus-body'>
                <div className='category'>
                    {viewCateg === 'relevant' ? 'Relevant' : (viewCateg === 'comparison' ? 'Comparisons' : 'Breakdown')}
                    <div className='button'>
                        <button className='viewBtn' onClick={()=>{setViewMore(false); }}> <b>Back</b> </button>
                    </div>
                </div>
                <div className='exp'> <div className='blank'/> : same year range with given article </div>
                <div className='graphs'>
                    {
                        Object.keys(contextdata[viewCateg]).map((item) => {
                            return <ContextGraphBox name={item} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                        })
                        
                    }
                    {/* <ContextGraphBox name="Middle Class Income" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                    <ContextGraphBox name="Union Membership" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                    <ContextGraphBox name="Top 10% Income" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                    <ContextGraphBox name="Bottom 60% Income" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                    <ContextGraphBox name="% Change in Productivity" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/> */}
                </div>
                
            </div>
        </div>
    </React.Fragment>
    )
}

export default ContextBoxPlus;