import './App.css';
import Login from './Login';
import Home from './Home';
import { Router } from '@reach/router';

function App() {
  return (
      <div className="App">
        <Router>
          <Login path="/"/>
          <Home path="/home"/>
        </Router>
      </div>
  );
}

export default App;
