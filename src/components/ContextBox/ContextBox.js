import React, {useState, useEffect} from 'react';
import './ContextBox.css'

import ContextGraphBox from '../ContextGraphBox/ContextGraphBox';

function ContextBox( {setViewMore, setViewCateg, setViewArticle} ) {

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
                            <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
                            <ContextGraphBox name="Covid hospitalization" setViewArticle={setViewArticle}/>
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
                            <ContextGraphBox name="Canada" onClick={()=>{setViewArticle(true)}}/>
                            <ContextGraphBox name="Britain" onClick={()=>{setViewArticle(true)}}/>
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
                            <ContextGraphBox name="Covid hospitalization" onClick={()=>{setViewArticle(true)}}/>
                            <ContextGraphBox name="Covid hospitalization" onClick={()=>{setViewArticle(true)}}/>
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