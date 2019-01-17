#!/usr/bin/env node

process.env.REACT_APP_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');

const express = require('express');
const logger = require('morgan');
const http = require('http');
const paths = require('../config/paths');
const debug = require('debug')('openfin-react-starter:scripts/server');

const configApis = require('./routers/config');

const {
    normalizePort,onError,
} = require('./utils/serverUtils');

const app = express();

app.use(logger('dev'));
app.use(express.static(paths.appBuild));
app.use(configApis);

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

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}