import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CovidArticle from './pages/CovidArticle';
import UnemployArticle from './pages/UnemployArticle';
import CPIArticle from './pages/CPIArticle';
import CPIArticle2 from './pages/CPIArticle2'
import EmissionArticle from './pages/EmissionArticle/EmissionArticle';

//pages
import UserLogin from './pages/UserLogin/';
import ArticleView from './pages/ArticleView/ArticleView';
import ArticleMid from './pages/ArticleMid/ArticleMid';
import ArticleEnd from './pages/ArticleEnd/ArticleEnd';

// article text for each article
import cpi_article from './data/cpi_article.json'
import emission_article from './data/emission_article.json'

// api request for each article 
import cpi_req from './data/article_extract_req_cpi.json'
import emission_req from './data/article_extract_req_emission.json'

// img for each article
import cpi_img from './images/vis/cpi-img1.png';
import emission_img from './images/vis/emission-img1.png';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" component={CovidArticle} /> */}
        {/* <Route path="/" element={<CPIArticle />} /> */}
        {/* <Route path="/nyt-emission-article" element={<EmissionArticle />} /> */}
        
        {/* user1 */}
        <Route path="/1" element={<UserLogin userid={1} text_req={cpi_req} articletitle={cpi_article.url}/>} />
        <Route path={`/${cpi_article.url}-1`} element={<ArticleView userid={1} pagenum={1} articledata={cpi_article} articlevis={[cpi_img]} text_req={cpi_req} />} />
        <Route path="/article-mid-1" element={<ArticleMid userid={1} text_req={emission_req} articletitle={emission_article.url}/>} />
        <Route path={`/${emission_article.url}-1`} element={<ArticleView userid={1} pagenum={2} articledata={emission_article} articlevis={[emission_img]} text_req={emission_req}  />} />

        {/* user2 */}
        <Route path="/2" element={<UserLogin userid={2} text_req={emission_req} articletitle={emission_article.url}/>} />
        <Route path={`/${emission_article.url}-2`} element={<ArticleView userid={2} pagenum={1} articledata={emission_article} articlevis={[emission_img]} text_req={emission_req}  />} />
        <Route path="/article-mid-2" element={<ArticleMid userid={2} text_req={cpi_req} articletitle={cpi_article.url}/>} />
        <Route path={`/${cpi_article.url}-2`} element={<ArticleView userid={2} pagenum={2} articledata={cpi_article} articlevis={[cpi_img]} text_req={cpi_req} />} />


        {/* common */}
        <Route path="/article-end" element={<ArticleEnd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
