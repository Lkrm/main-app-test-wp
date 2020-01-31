import React from 'react';
import {BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import { createBrowserHistory }  from 'history';
import About from "./About";
import Contacts from "./Contacts";
import Navigation from "./Navigation";
import Services from "../help-app-test-wp/Services";

const history = createBrowserHistory();

const RouterMain = () => (
           <Router history={history}>
               <Navigation />
               <Switch>
                   <Route path="/about" component={About}/>
                   <Route path="/contacts" component={Contacts}/>
                   <Route path="/services" component={Services}/>
                   <Route  component={About}/>
               </Switch>
           </Router>
);

export default RouterMain;
