import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CovidArticle from './pages/CovidArticle';
import UnemployArticle from './pages/UnemployArticle';
import CPIArticle from './pages/CPIArticle';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={CovidArticle} /> */}
        <Route path="/" component={CPIArticle} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
