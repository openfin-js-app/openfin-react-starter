const paths = require('../config/paths');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const chalk = require('chalk');

const openfinLauncher = require('openfin-launcher');
const openfinConfigPath = paths.appOpenfin + '/app.production.json';

async function startServer() {
    const {stdout} = await execFile('node',[paths.appScript+'/server.js']);
    console.log(stdout);
}

startServer();

setTimeout(()=>{
    console.log(chalk.cyan(`openfin config path ${openfinConfigPath}`));
    console.log(chalk.cyan('starting openfin'));
    openfinLauncher.launchOpenFin({configPath:openfinConfigPath})
        .then(()=>{process.exit()})
        .catch(err => console.log(err));
},1000);