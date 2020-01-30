const buildConfig = require('./invoice-build-config');
const exec = require('child_process').exec;


const getListOfRepository = (configs) => {
    const buildModules = configs.modules;
    const listEntryPointsModules = [];

    (Object.keys(buildModules) || []).forEach(key=> listEntryPointsModules.push({ moduleName: key, repository: buildModules[key]['repository']}));
    return listEntryPointsModules;
};

module.exports = {
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.beforeCompile.tap('Loading modules', (compilation) => {
                    console.log(getListOfRepository(buildConfig))
                    exec('rm -rf ./help-app-test-wp && svn export https://github.com/Lkrm/help-app-test-wp.git/trunk/src  help-app-test-wp', (err, stdout, stderr) => {
                        if (stdout) {
                            console.table('\n \n \n \n----- * Ended loading remote module * ------- \n \n \n \n')
                            process.stdout.write(stdout);
                        }
                        if (stderr) {
                            process.stderr.write(stderr);
                        }
                    });
                });
            }
        }
    ],
};
