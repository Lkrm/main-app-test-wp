const fs = require('fs');

const templateRoutComponentStr = (children, importsComponents) => (`
import React from 'react';
import {BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import { createBrowserHistory }  from 'history';

import Navigation from "./Navigation";
${importsComponents}

const history = createBrowserHistory();

const RouterMain = () => (
           <Router history={history}>
               <Navigation />
               <Switch>
                   ${children}
               </Switch>
           </Router>
);

export default RouterMain;`);


const getReactRouter = (routsObj, moduleName) => {
    let routsListStr = '';
    let importComponentsStr = '';

    const listOfRouts = Object.keys(routsObj);
    listOfRouts.forEach((key) => {
        const { routePath, componentName, componentPath } =  routsObj[key];
        const importPath = moduleName ? `../${moduleName}/${componentPath}` : `./${componentName}`;
        const routePathSet = routePath ? `path="/${routePath}"` : '';
        if(componentPath) importComponentsStr+= `import ${componentName} from "${importPath}";\n`;
        routsListStr += `<Route ${routePathSet} component={${componentName}}/> \n`;
    });

    return { routs: routsListStr, components: importComponentsStr };
};

const generatorRoutsFile = (config, callback) => {
    let listOfRouts = '';
    let importComponents = '';
    config.forEach(({ appendMainRouter, moduleName }) => {
        const { routs, components } =  getReactRouter(appendMainRouter, moduleName);
        listOfRouts+=routs;
        importComponents+=components;
    });
    fs.writeFileSync('./src/RouterMain.js', templateRoutComponentStr(listOfRouts, importComponents));
    callback();
};

module.exports = generatorRoutsFile;
