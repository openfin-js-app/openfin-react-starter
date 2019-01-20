// Do this as the first thing so that any code reading it knows the right env.
process.env.REACT_APP_ENV = 'development';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const paths = require('../config/paths');
const spawn = require('child_process').spawn;
const chalk = require('chalk');
const log = console.log;
const tcpPortUsed = require('tcp-port-used');

const { connect } = require('hadouken-js-adapter');

require('../config/env');
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

async function startWebpackDevServer() {
    const webDevServer = spawn('node',[paths.appScript+'/start.js']);
    webDevServer.stdout.on('data',(data)=>{
        log(chalk.cyan(Buffer.from(data,'binary').toString()));
    });
    webDevServer.stderr.on('data',(data)=>{
        log(chalk.magenta(Buffer.from(data,'binary').toString()));
    });
    webDevServer.on('close',(data)=>{
        log(chalk.yellow(Buffer.from(data,'binary').toString()));
    });
}

async function launchApp(){
    const fin = await connect({
        uuid:'openfin_react_ts_starter',
        runtime:{
            version: process.env.HADOUKEN_VERSION,
        }
    });
    const version = await fin.System.getVersion();
    log(chalk.green("Connected to Hadouken version", version));

    const app = await fin.Application.create({
        "name":"Openfin starter [dev]",
        "url":`http://localhost:${DEFAULT_PORT}/index.html`,
        "uuid":process.env.REACT_APP_FIN_UUID,
        "applicationIcon":`http://localhost:${DEFAULT_PORT}/favicon.ico`,
        "autoShow":true,
        "saveWindowsSate":false,
        "resizable":true,
        "frame":false,
        "defaultCentered":true,
        "defaultWidth":728,
        "defaultHeight":450,
        "minWidth":88,
        "minHeight":64
    });

    log(chalk.green(`connecting tot http://localhost:${DEFAULT_PORT}`));

    await app.run();
}


startWebpackDevServer();

tcpPortUsed.waitUntilUsed(DEFAULT_PORT,1000,240000)
    .then(
        ()=>{
            log(chalk.green('starting openfin'));
            launchApp().then(() => {
                log(chalk.green('starting openfin success'));
                console.log("success");
            }).catch((err) => {
                log(chalk.red("Error trying to connect,", err.message));
                log(chalk.red(err.stack));
            });

        },
        (err)=>{
            log(chalk.red(err));
        }
    );