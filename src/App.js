import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CovidArticle from './pages/CovidArticle';
import UnemployArticle from './pages/UnemployArticle';
import CPIArticle from './pages/CPIArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" component={CovidArticle} /> */}
        <Route path="/prj-critical-data-reading" element={<CPIArticle />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
