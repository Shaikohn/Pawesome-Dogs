import './App.css';
import {Route, Switch} from 'react-router-dom'
import Landing from './pages/Landing';
import Home from './pages/Home';
import Create from './pages/Create'
import Details from './pages/DogDetails';
import Error404 from './components/Errors/Error404';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path={'/'} component={Landing} />
        <Route exact path={'/dogs'} component={Home} />
        <Route exact path={'/dogs/create'} component={Create} />
        <Route exact path={'/dogs/:id'} component={Details} />
        <Route component={Error404} />
      </Switch> 
    </div>
    
  );
}

export default App;
