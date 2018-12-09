import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserAdapter } from '@albertli90/openfin-browser-adapter';

import './assets/css/main.css';

import setPlatformClass from './utils/setPlatformClass';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './utils/configureStore';
import {
    CLIENT_SET_VALUE,
    applicationStarted,
    applicationChildStarted,
} from "./reduxs";

declare const window:any;

const sharedActions = [
    CLIENT_SET_VALUE
];

if(!window.fin){
    window.fin = new BrowserAdapter({
        finUuic:process.env.REACT_APP_FIN_UUID,
        silentMode:false,
    });
}

if(window.name === process.env.REACT_APP_FIN_UUID){
    const store = configureStore(
        sharedActions,
    );
    window.store=store;
    store.dispatch(applicationStarted());
}else{
    const store = configureStore(
        sharedActions,
        window.opener.store.getState()
    );
    window.store=store;
    store.dispatch(applicationChildStarted());
}
setPlatformClass(document.body,window.navigator.platform);
ReactDOM.render(
    <Provider store = {window.store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
