import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CovidArticle from './pages/CovidArticle';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={CovidArticle} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
