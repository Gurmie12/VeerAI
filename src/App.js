import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//Import all three components to be rendered
import AJAX from './components/AJAXButton';
import REST from './components/RESTAPI';
import Contact from './components/Contact';

function App() {

  //By using a Router to display multiple pages within the switch in the body of the page, we can navigate from one task to another
  //Without a full page reload.
  return (
    <div className="body">

    <Router>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-5">
        <a className="navbar-brand" href="#">Veer AI Assesment</a>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/contactPage">Contact Page</Link>
              <Link className="nav-item nav-link" to="/AJAX">AJAX Button API</Link>
              <Link className="nav-item nav-link" to="/REST">REST API</Link>
          </div>
      </div>
      </nav>
        <Switch>
          <Route path="/contactPage">
            <Contact />
          </Route>
          <Route path="/AJAX">
            <AJAX />
          </Route>
          <Route path="/REST">
            <REST />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
