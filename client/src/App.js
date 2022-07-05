
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home'
import CreateBreed from './components/CreateBreed';
import DogDetails from './components/DogDetails'
import './App.css';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/dogs/:id' component={DogDetails}/>
      <Route path='/create' component={CreateBreed}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
