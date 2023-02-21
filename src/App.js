import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CovidArticle from './pages/CovidArticle';
import UnemployArticle from './pages/UnemployArticle';
import CPIArticle from './pages/CPIArticle';
import CPIArticle2 from './pages/CPIArticle2'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" component={CovidArticle} /> */}
        <Route path="/" element={<CPIArticle />} />
        <Route path="/prj-critical-data-reading" element={<CPIArticle2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
