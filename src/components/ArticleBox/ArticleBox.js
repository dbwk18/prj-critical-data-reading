import React, {useState, useEffect} from 'react';
import ArticleSubBox from '../ArticleSubBox/ArticleSubBox';
import './ArticleBox.css'
import articleDB from '../../data/articleDB.json'

function ArticleBox( {setViewArticle, graphCateg} ) {

    const [articleIdx, setArticleIdx] = useState(null);

    return (
        <div className='articleBox'>
            <div className='articleBox-header'>
                <div className='title'> 
                    <div> MORE ARTICLES INCLUDING </div>
                    <div> <b>" {graphCateg} "</b> </div>
                </div>
                <div className='closeBtn' onClick={()=>{setViewArticle(false)}}> X </div>
            </div>
            <div className='articleBox-body'>
            { 
                articleIdx === null
                ? articleDB[graphCateg].map((item, idx) => {
                    return <ArticleSubBox data={item} idx={idx} setArticleIdx={setArticleIdx}/>
                })
                : (
                    <>
                        <div className='articleBox-list'>
                        {
                            articleDB[graphCateg].map((item, idx) => {
                                return <ArticleSubBox data={item} idx={idx} setArticleIdx={setArticleIdx}/>
                            })
                        }
                        </div>
                        <div className='articleBox-view'>
                            <div className='src'>{articleDB[graphCateg][articleIdx]["src"]}</div>
                            <div className='title'><b>{articleDB[graphCateg][articleIdx]["title"]}</b></div>
                            <div className='img'><img src={articleDB[graphCateg][articleIdx]["img"]} width="100%"/></div>
                            <div className='content'>{articleDB[graphCateg][articleIdx]["content"]}</div>

                        </div>
                    </>
                )
            }
      
            </div>
        </div>
    )

}

export default ArticleBox;