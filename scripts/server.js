#!/usr/bin/env node

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');

const express = require('express');
const logger = require('morgan');
const http = require('http');
const paths = require('../config/paths');
const debug = require('debug')('openfin-react-starter:scripts/server');

const app = express();

app.use(logger('dev'));
app.use(express.static(paths.appBuild));

app.use((req,res,next)=>{
    if (req.accepts('html')){
        res.status(200);
        res.sendFile(paths.appBuild+'/index.html');
    }else{
        res.status(404);
        if(req.accepts('json')){
            res.send({error:'Not found'});
        }
        res.type('txt'),send('Not found');
    }
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

var server = http.createServer(app);

server.listen(port);
server.on('error',onError);
server.on('listening',onListening);


function normalizePort(val){
    var port = parseInt(val,10);

    if (isNaN(port)){
        return val;
    }

    if (port>=0){
        return port;
    }

    return false;
}


function onError(error){
    if (error.syscall!=='listen'){
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe' + port
        : 'Port' + port;

    switch (error.code){
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}