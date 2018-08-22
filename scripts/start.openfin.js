const paths = require('../config/paths');
const util = require('util');
const exeFile = util.promisify(require('child_process').execFile);
const chalk = require('chalk');

const openfinLauncher = require('openfin-launcher');
const openfinConfigPath = paths.appOpenfin+'/app.development.json';

async function startWebpackDevServer() {
    const { stdout } = await exeFile('node',[paths.appScript+'/start.js']);
    console.log(stdout);
}
startWebpackDevServer();

setTimeout(()=>{
    console.log(chalk.cyan(`openfin config path ${openfinConfigPath}`));
    console.log(chalk.cyan('starting openfin'));
    openfinLauncher.launchOpenFin({configPath:openfinConfigPath})
        .then(()=>{process.exit()})
        .catch(err => console.log(err));
},1000);