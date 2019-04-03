import * as React from 'react';
import {Suspense} from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { InitializeReactOpenfin } from 'react-openfin/init';
import { ReactOpenfin } from 'react-openfin';

import CircularProgress from '@material-ui/core/CircularProgress';

import i18n from './i18n';
import hist from './utils/history';

import './assets/css/main.css';

import setPlatformClass from './utils/setPlatformClass';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './utils/configureStore';

import sharedActions from './reduxs/sharedActions'
import configTabs from './constants/configTabs';
import launchBarItems from './constants/launchBarItems';

declare const window:any;

InitializeReactOpenfin({
    fin:window.fin,
    finUuid: process.env.REACT_APP_FIN_UUID,
    sharedActions,
    i18n,
    hist,
    clientReduxStore:window.store,
    configTabs,
    launchBarItems,
});

if(window.name === process.env.REACT_APP_FIN_UUID){
    window.store=configureStore(
        sharedActions,
    );
}else{
    window.store=configureStore(
        sharedActions,
        window.opener.store.getState()
    );
}

setPlatformClass(document.body,window.navigator.platform);

ReactDOM.render(
    <ReactOpenfin>
        <Provider store = {window.store}>
            <Suspense fallback={<CircularProgress/>}>
                <App/>
            </Suspense>
        </Provider>
    </ReactOpenfin>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();