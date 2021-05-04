import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import React from 'react';
import Hemnet41 from './images/Hemnet41.png';
import GetObject from './components/GetObject';
import PostObject from './components/PostObject';
import ChangeObject from './components/ChangeObject';
import DeleteObject from './components/DeleteObject';
import Login from './components/Login';
import Logout from './components/Logout';
import RegOfIntrest from "./components/RegOfIntrest";

function App() {
  

  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3" style={{backgroundColor: "#ecf9ff"}}>
          <div className="container">
            <Link className="navbar-brand" to="/"><img src={Hemnet41} alt="Logo"></img></Link>          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">                  
                  <Link className="nav-link" to="/getobject"><p>Se objekt</p></Link>                  
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/postobject"><p>Lägg till objekt</p></Link>
                </li>
                <li className="nav-item">                  
                  <Link className="nav-link" to="/regofintrest"><p>Intresseanmälningar</p></Link>                  
                </li>
                <li className="nav-item">
                  <Login />
                </li>
                <li className="nav-item">
                  <Logout />
                </li>
              </ul>
            </div>             
          </div>
        </nav>        
        <Switch>                          
          <Route exact path="/" component={GetObject} />
          <Route exact path="/getobject" component={GetObject}/>
          <Route exact path="/postobject" component={PostObject}/>
          <Route exact path="/regofintrest" component={RegOfIntrest}/>
          <Route exact path="/changeobject/:houseObjectId" component={ChangeObject}/>
          <Route exact path="/deleteobject/:houseObjectId" component={DeleteObject}/>
          <Redirect to="/" component={GetObject}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
