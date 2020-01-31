
import React from 'react';
import {BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import { createBrowserHistory }  from 'history';

import Navigation from "./Navigation";
import Service1 from "../help-app-test-wp/Service1";
import Service2 from "../help-app-test-wp/Service2";
import About from "./About";
import Contacts from "./Contacts";


const history = createBrowserHistory();

const RouterMain = () => (
           <Router history={history}>
               <Navigation />
               <Switch>
                   <Route path="/service1" component={Service1}/> 
<Route path="/service2" component={Service2}/> 
<Route path="/about" component={About}/> 
<Route path="/contacts" component={Contacts}/> 
<Route  component={Contacts}/> 

               </Switch>
           </Router>
);

export default RouterMain;