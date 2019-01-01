process.env.REACT_APP_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');

const os = require('os');

const chalk = require('chalk');
const log = console.log;
const shell = require('shelljs');
const { exec } = require('pkg');

let platform = os.platform();

if (process.argv.length > 2 ){
    platform = process.argv[2];
}

if(platform==='darwin'){
    platform = 'macos';
}else if(platform === 'win32'){
    platform = 'win';
}else if (platform !== 'linux'){
    throw `Packaging on ${platform} not supported`;
}

const target = `node10-${platform}-${process.env.STANDALONE_TARGET_PLATFORM}`;
log(chalk.green('TARGET',target));
log(chalk.green('PWD',shell.pwd()));

shell.mkdir('package');
shell.cp('.env*','package');
shell.cp('-R','build','package');
shell.cp('package.json','package');

// pkg scripts/server.js --target node10-linux-x64 --output openfin_starter_server
const buildBinary = async (script,name)=>{
    await exec([ script, '--target', target, '--output', name])
};

const build = async() => {
    await buildBinary('scripts/server.js',`package/${process.env.STANDALONE_SERVER_NAME}`);
    await buildBinary('scripts/standalone.openfin.js',`package/${process.env.STANDALONE_NAME}`);
};

build();