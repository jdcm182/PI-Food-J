import './App.css';

import { Route } from 'react-router-dom'
import Landing from './components/Landing.jsx'
import NavBar from './components/NavBar.jsx'
import Main from './components/Main.jsx'


function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      <Route exact path={'/'} component={Landing} />
      <Route path={'/recipes'} component={NavBar} />
      <Route path={'/recipes/main'} component={Main} />
    </div>
  );
}

export default App;
/*
     _                
    / \   _ __  _ __  
   / _ \ | '_ \| '_ \ 
  / ___ \| |_) | |_) |
 /_/   \_\ .__/| .__/ 
         |_|   |_|    
*/