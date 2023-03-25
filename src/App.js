import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CPIArticle from './pages/CPIArticle';
import CPIArticle2 from './pages/CPIArticle2'
import EmissionArticle from './pages/EmissionArticle/EmissionArticle';

//pages
import UserLogin from './pages/UserLogin/';
import DefaultView from './pages/DefaultView/DefaultView';
import ArticleView from './pages/ArticleView/ArticleView';
import ArticleMid from './pages/ArticleMid/ArticleMid';
import ArticleEnd from './pages/ArticleEnd/ArticleEnd';

// article text for each article
import cpi_article from './data/cpi_article.json'
import emission_article from './data/emission_article.json'
import article1 from './data/article1-text.json'
import article2 from './data/article2-text.json'
import demoarticle from './data/demo.json'

// api request for each article 
import cpi_req from './data/article_extract_req_cpi.json'
import emission_req from './data/article_extract_req_emission.json'
import article1_req from './data/article1-req.json'
import article2_req from './data/article2-req.json'
import demo_req from './data/demo-req.json'

// img for each article
import cpi_img from './images/vis/cpi-img1.png';
import emission_img from './images/vis/emission-img1.png';
import article1_img1 from './images/vis/article1-img1.png';
import article1_img2 from './images/vis/article1-img2.png';
import article1_img3 from './images/vis/article1-img3.png';
import article2_img1 from './images/vis/article2-img1.png';
import article2_img2 from './images/vis/article2-img2.png';
import demo_img from './images/vis/demo-img.png'


function App() {

  const article1_vis = [article1_img3, article1_img2, article1_img1]
  const article2_vis = [article2_img1, article2_img2]
  const demo_vis = [demo_img]
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<CPIArticle />} /> */}
        {/* <Route path="/1" element={<UserLogin userid={1} text_req={cpi_req} articletitle={cpi_article.url}/>} />
        <Route path={`/${cpi_article.url}-1`} element={<ArticleView userid={1} pagenum={1} articledata={cpi_article} articlevis={[cpi_img]} text_req={cpi_req} />} />
        <Route path="/article-mid-1" element={<ArticleMid userid={1} text_req={emission_req} articletitle={emission_article.url}/>} />
        <Route path={`/${emission_article.url}-1`} element={<ArticleView userid={1} pagenum={2} articledata={emission_article} articlevis={[emission_img]} text_req={emission_req}  />} /> */}
        
        {/* flow1 */}
        <Route path="/1" element={<UserLogin userid={1} condition={"baseline"} articletitle={article1.url} next_req={article1_req}/>} />
        <Route path={`/${article1.url}-1`} element={<DefaultView userid={1} condition={"baseline"} nextcondition={"demo"} articledata={article1} articlevis={article1_vis} text_req={article1_req} />} />
        <Route path="/info-demo-1" element={<ArticleMid userid={1} condition={"demo"} next_req={demo_req} articletitle={demoarticle.url}/>} />
        <Route path={`/${demoarticle.url}-1`} element={<ArticleView userid={1} condition={"demo"} nextcondition={"system"} articledata={demoarticle} articlevis={demo_vis} text_req={demo_req}  />} />
        <Route path="/info-task-1" element={<ArticleMid userid={1} condition={"system"} next_req={article2_req} articletitle={article2.url}/>} />
        <Route path={`/${article2.url}-1`} element={<ArticleView userid={1} condition={"system"} nextcondition={"end"} articledata={article2} articlevis={article2_vis} text_req={article2_req}  />} />

        {/* flow2 */}
        <Route path="/2" element={<UserLogin userid={2} condition={"system"} articletitle={null} next_req={null}/>} />
        <Route path="/info-demo-2" element={<ArticleMid userid={2} condition={"demo"} next_req={demo_req} articletitle={demoarticle.url}/>} />
        <Route path={`/${demoarticle.url}-2`} element={<ArticleView userid={2} condition={"demo"} nextcondition={"system"} articledata={demoarticle} articlevis={demo_vis} text_req={demo_req}  />} />
        <Route path="/info-task-2" element={<ArticleMid userid={2} condition={"system"} next_req={article1_req} articletitle={article1.url}/>} />
        <Route path={`/${article1.url}-2`} element={<ArticleView userid={2} condition={"system"} nextcondition={"baseline"} articledata={article1} articlevis={article1_vis} text_req={article1_req} />} />
        <Route path="/info-base-2" element={<ArticleMid userid={2} condition={"baseline"} next_req={article2_req} articletitle={article2.url}/>} />
        <Route path={`/${article2.url}-2`} element={<DefaultView userid={2} condition={"baseline"} nextcondition={"end"} articledata={article2} articlevis={article2_vis} text_req={article2_req}  />} />

        {/* flow3 */}
        <Route path="/3" element={<UserLogin userid={3} condition={"baseline"} articletitle={article2.url} next_req={article2_req}/>} />
        <Route path={`/${article2.url}-3`} element={<DefaultView userid={3} condition={"baseline"} nextcondition={"demo"} articledata={article2} articlevis={article2_vis} text_req={article2_req} />} />
        <Route path="/info-demo-3" element={<ArticleMid userid={3} condition={"demo"} next_req={demo_req} articletitle={demoarticle.url}/>} />
        <Route path={`/${demoarticle.url}-3`} element={<ArticleView userid={3} condition={"demo"} nextcondition={"system"} articledata={demoarticle} articlevis={demo_vis} text_req={demo_req}  />} />
        <Route path="/info-task-3" element={<ArticleMid userid={3} condition={"system"} next_req={article1_req} articletitle={article1.url}/>} />
        <Route path={`/${article1.url}-3`} element={<ArticleView userid={3} condition={"system"} nextcondition={"end"} articledata={article1} articlevis={article1_vis} text_req={article1_req}  />} />

        {/* flow4 */}
        <Route path="/4" element={<UserLogin userid={4} condition={"system"} articletitle={null} next_req={null}/>} />
        <Route path="/info-demo-4" element={<ArticleMid userid={4} condition={"demo"} next_req={demo_req} articletitle={demoarticle.url}/>} />
        <Route path={`/${demoarticle.url}-4`} element={<ArticleView userid={4} condition={"demo"} nextcondition={"system"} articledata={demoarticle} articlevis={demo_vis} text_req={demo_req}  />} />
        <Route path="/info-task-4" element={<ArticleMid userid={4} condition={"system"} next_req={article2_req} articletitle={article2.url}/>} />
        <Route path={`/${article2.url}-4`} element={<ArticleView userid={4} condition={"system"} nextcondition={"baseline"} articledata={article2} articlevis={article2_vis} text_req={article2_req} />} />
        <Route path="/info-base-4" element={<ArticleMid userid={4} condition={"baseline"} next_req={article1_req} articletitle={article1.url}/>} />
        <Route path={`/${article1.url}-4`} element={<DefaultView userid={4} condition={"baseline"} nextcondition={"end"} articledata={article1} articlevis={article1_vis} text_req={article1_req}  />} />

        {/* common */}
        <Route path="/article-end" element={<ArticleEnd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
