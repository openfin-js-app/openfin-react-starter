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
    applicationStarted,
} from "./redux";

declare const window:any;

if(!window.fin){
    window.fin = new BrowserAdapter({silentMode:false});
}

if(window.store == null && window.opener == null){
    const store = configureStore();
    window.store=store;
    store.dispatch(applicationStarted());
}else{
    const store = configureStore(window.opener.store.getState());
    window.store=store;
}
setPlatformClass(document.body,window.navigator.platform);
ReactDOM.render(
    <Provider store = {window.opener?window.opener.store:window.store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
