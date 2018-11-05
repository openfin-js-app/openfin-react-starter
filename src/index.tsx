import * as React from 'react';
import * as shortid from 'shortid';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserAdapter } from '@albertli90/openfin-browser-adapter';
import { ChannelType } from '@albertli90/redux-openfin/init';

import './assets/css/main.css';

import setPlatformClass from './utils/setPlatformClass';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './utils/configureStore';
import {
    CLIENT_SET_VALUE,
    applicationStarted,
} from "./redux";

declare const window:any;

const sharedActions = [
    CLIENT_SET_VALUE
];

if(!window.fin){
    window.fin = new BrowserAdapter({silentMode:false});
}

if(window.store == null && window.opener == null){
    const store = configureStore(
        ChannelType.PROVIDER,
        "app-name-main-window",
        sharedActions,
    );
    window.store=store;
    store.dispatch(applicationStarted());
}else{
    const pathName = new URL(window.location.href).pathname;
    const childWindowIndex = pathName.indexOf('childWindow');
    let channelClientId = shortid.generate();
    if (childWindowIndex > -1){
        channelClientId = `app-name-${pathName.substring(childWindowIndex).replace('/','-')}`
    }
    const store = configureStore(
        ChannelType.CLIENT,
        channelClientId,
        sharedActions,
        window.opener.store.getState()
    );
    window.store=store;
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
