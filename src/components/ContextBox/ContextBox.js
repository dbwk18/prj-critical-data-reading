import React, {useState, useEffect} from 'react';
import './ContextBox.css'

import ContextGraphBox from '../ContextGraphBox/ContextGraphBox';

function ContextBox( {setViewMore, setViewCateg, setViewArticle, setGraphCateg} ) {

    return (
        <React.Fragment>
            <div className='contextBox' >
                <div className='contextBox-header' >
                    Select chart to explore more!
                </div>
                <div className='contextBox-body'>
                    <div className='contextBox-sub'>
                        <div className='category'>
                            Relevant 
                            <div className='exp'> : relevant data with topic </div>
                        </div>
                        <div className='graph'>
                            <ContextGraphBox name="Middle Class Income" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} />
                            <ContextGraphBox name="Top 10% Income" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                            <div className='button'>
                                <button className='viewBtn' onClick={()=>{setViewMore(true); setViewCateg('rel')}}> <b>View More</b> </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className='contextBox-sub'>
                        <div className='category'>
                            Comparisons
                            <div className='exp'> : comparable data along with graph </div>
                        </div>
                        <div className='graph'>
                            <ContextGraphBox name="Canada" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} />
                            <ContextGraphBox name="Britain" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} />
                            <div className='button'>
                                <button className='viewBtn' onClick={()=>{setViewMore(true); setViewCateg('comp')}}> <b>View More</b> </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className='contextBox-sub'>
                        <div className='category'>
                            Breakdown
                            <div className='exp'> : breaking down the data with other terms</div>
                        </div>
                        <div className='graph'>
                            <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                            <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle} setGraphCateg={setGraphCateg}/>
                            <div className='button'>
                                <button className='viewBtn' onClick={()=>{setViewMore(true); setViewCateg('bre')}}> <b>View More</b> </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    )

}

export default ContextBox;