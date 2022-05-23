import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CovidArticle from './pages/CovidArticle';
import UnemployArticle from './pages/UnemployArticle';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={CovidArticle} /> */}
        <Route path="/" component={UnemployArticle} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
