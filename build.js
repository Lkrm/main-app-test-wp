const exec = require('child_process').exec;
const fs = require('fs');

const routsGenerator = require('./routs-generator');
const buildConfig = require('./invoice-build-config');
const mainConfig = require('./src/config.json');

let configAccum = [];


const getListOfRepository = (configs) => {
    const buildModules = configs.modules;
    const listEntryPointsModules = [];

    (Object.keys(buildModules) || []).forEach(key=> listEntryPointsModules.push({ moduleName: key, repository: buildModules[key]['repository']}));
    return listEntryPointsModules;
};

const listOfRepositories = getListOfRepository(buildConfig);

listOfRepositories.forEach(({ moduleName, repository }, index) => {
    exec(`rm -rf ./${moduleName}`, (err, stdout, stderr) => {
        if (err)  throw new Error(`\nDelete old module '${moduleName} -- ERROR' .......`);
        console.log(`\nDelete old module '${moduleName}' .......`)
    });
    exec(`svn export ${repository}/trunk/src  ${moduleName}`, (err, stdout, stderr) => {
        if (err)  throw new Error(`Ended loading remote module '${moduleName} -- ERROR' ....... \n`);
        console.log(`Ended loading remote module ${moduleName} ....... \n`);
        fs.readFile(`./${moduleName}/config.json`, (error, data) => {
            configAccum.push({...JSON.parse(data), moduleName });
            if (index === listOfRepositories.length - 1) {
                configAccum.push(mainConfig);
                routsGenerator(configAccum, () => {
                    exec(`webpack --mode production`, (err, stdout, stderr) => {
                        if (err)  throw new Error(`\nRun WebPack for build app has error.`)
                        console.log(`\nEnded build app ......`)
                    });
                } )
            }
        });
    });
});
