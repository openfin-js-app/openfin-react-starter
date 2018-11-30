// Do this as the first thing so that any code reading it knows the right env.
process.env.REACT_APP_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const paths = require('../config/paths');
const spawn = require('child_process').spawn;
const chalk = require('chalk');
const log = console.log;
const tcpPortUsed = require('tcp-port-used');

const openfinLauncher = require('openfin-launcher');
const openfinConfigPath = paths.appOpenfin + '/app.production.json';

require('../config/env');
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

async function startServer() {
    const expressServer = spawn('node',[paths.appScript+'/server.js']);
    expressServer.stdout.on('data',(data)=>{
        log(chalk.cyan(Buffer.from(data,'binary').toString()));
    });
    expressServer.stderr.on('data',(data)=>{
        log(chalk.red(Buffer.from(data,'binary').toString()));
    });
    expressServer.on('close',(data)=>{
        log(chalk.yellow(Buffer.from(data,'binary').toString()));
    });
}

startServer();

tcpPortUsed.waitUntilUsed(DEFAULT_PORT,1000,240000)
    .then(
        ()=>{
            log(chalk.green('starting openfin'));
            openfinLauncher.launchOpenFin({configPath:openfinConfigPath})
                .then(()=>{process.exit()})
                .catch(err => log(chalk.red(err)));
        },
        (err)=>{
            log(chalk.red(err));
        }
    );