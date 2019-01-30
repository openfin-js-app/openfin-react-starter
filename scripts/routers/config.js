const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const log = console.log;

const {
    normalizePort,
} = require('../utils/serverUtils');

const port = normalizePort(process.env.PORT || '3000');

router.get('/app.json',(req,res)=>{

    // hostname localhost
    // originalUrl /app.json

    let baseUrl = req.headers.host;

    if(!baseUrl){
        baseUrl = req.hostname;
        if (port !== 80){
            baseUrl+=':'+port;
        }
        baseUrl+=req.originalUrl.substr(0,req.originalUrl.indexOf('app.json'));
    }

    if (!baseUrl.endsWith('/')){
        baseUrl+='/';
    }

    if (!baseUrl.startsWith('http')){
        if (req.connection.secure){
            baseUrl = 'https://'+baseUrl;
        }else{
            baseUrl = 'http://'+baseUrl;
        }
    }

    // log(chalk.cyan('baseUrl',baseUrl));

    res.json({
            "startup_app":{
                "name":"Openfin starter",
                "url":`${baseUrl}index.html`,
                "uuid":process.env.REACT_APP_FIN_UUID,
                "applicationIcon":`${baseUrl}favicon.ico`,
                "autoShow":false,
                "saveWindowsSate":false,
                "resizable":true,
                "frame":false,
                "defaultWidth":728,
                "defaultHeight":450,
                "minWidth":420,
                "minHeight":300
            },
            "runtime":{
                "version":`${process.env.HADOUKEN_VERSION}`,
                "arguments":"--v=1 --remote-debugging-port=9090 --enable-crash-reporting"
            },
            "shortcut":{
                "company":"Albert Leigh Corp",
                "description":"Openfin starter of production profile",
                "icon":`${baseUrl}favicon.ico`,
                "name":"Openfin starter kit",
                "diagnostics-shortcut":true
            }
        }
    )
});

module.exports = router;