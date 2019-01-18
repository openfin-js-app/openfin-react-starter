import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './i18n';
import { Provider } from 'react-redux';
import { BrowserAdapter } from '@albertli90/openfin-browser-adapter';

import './assets/css/main.css';

import setPlatformClass from './utils/setPlatformClass';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './utils/configureStore';
import {
    applicationStarted,
    applicationChildStarted,
    applicationNetworkOnline,
    applicationNetworkOffline,
} from "./reduxs";

import sharedActions from './reduxs/sharedActions'

declare const window:any;

if(!window.fin){
    window.fin = new BrowserAdapter({
        finUuid:process.env.REACT_APP_FIN_UUID,
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


window.addEventListener('online',()=>{
    window.store.dispatch(applicationNetworkOnline());
})
window.addEventListener('offline',()=>{
    window.store.dispatch(applicationNetworkOffline());
})