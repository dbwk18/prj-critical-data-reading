import React, {useState, useEffect} from 'react';
import './ContextBox.css'

import ContextGraphBox from '../ContextGraphBox/ContextGraphBox';
import contextdata from '../../data/contextvarDB.json';


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
                            <ContextGraphBox categ='relevant' name={Object.keys(contextdata['relevant'])[0]} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} setViewCateg={setViewCateg}/>
                            <ContextGraphBox categ='relevant' name={Object.keys(contextdata['relevant'])[1]} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} setViewCateg={setViewCateg}/>
                            <div className='button'>
                                <button className='viewBtn' onClick={()=>{setViewMore(true); setViewCateg('relevant')}}> <b>View More</b> </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className='contextBox-sub'>
                        <div className='category'>
                            Comparisons
                            <div className='exp'> : comparable data along with graph </div>
                        </div>
                        <div className='graph'>
                            <ContextGraphBox categ='comparison' name={Object.keys(contextdata['comparison'])[0]} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} setViewCateg={setViewCateg}/>
                            <ContextGraphBox categ='comparison' name={Object.keys(contextdata['comparison'])[1]} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} setViewCateg={setViewCateg}/>
                            <div className='button'>
                                <button className='viewBtn' onClick={()=>{setViewMore(true); setViewCateg('comparison')}}> <b>View More</b> </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className='contextBox-sub'>
                        <div className='category'>
                            Breakdown
                            <div className='exp'> : breaking down the data with other terms</div>
                        </div>
                        <div className='graph'>
                            <ContextGraphBox categ='breakdown' name={Object.keys(contextdata['breakdown'])[0]} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} setViewCateg={setViewCateg}/>
                            <ContextGraphBox categ='breakdown' name={Object.keys(contextdata['breakdown'])[1]} setViewArticle={setViewArticle} setGraphCateg={setGraphCateg} setViewCateg={setViewCateg}/>
                            <div className='button'>
                                <button className='viewBtn' onClick={()=>{setViewMore(true); setViewCateg('breakdown')}}> <b>View More</b> </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    )

}

export default ContextBox;