import './App.css';

import { Route } from 'react-router-dom'
import Landing from './components/Landing.jsx'
//import NavBar from './components/NavBar.jsx'
import MainDataHandler from './components/MainDataHandler.jsx'
import Detail from './components/Detail';
import CreateRecipe from './components/CreateRecipe';
import GlobalNotifications from './components/GlobalNotifications';


function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      <Route exact path={'/'} component={Landing} />
      <Route path={'/'} component={GlobalNotifications} />
      {/* <Route path={'/recipes'} component={NavBar} /> */}
      <Route path={'/recipes/main'} component={MainDataHandler} />
      <Route path={'/recipes/create'} component={CreateRecipe} />
      <Route path={'/detail/:id'} component={Detail} />
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