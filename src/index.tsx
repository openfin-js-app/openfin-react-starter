import * as React from 'react';
import {Suspense} from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { InitializeReactOpenfin, ReactOpenfin } from 'react-openfin';
// !!!README!!!
// alternative sample color settings uncomment to set the result 1#
// import { InitalizaeReactOpenfinMatImpl } from 'react-openfin-mat-impl';
import { I18nextProvider } from 'react-i18next';

import CircularProgress from '@material-ui/core/CircularProgress';

import i18n from './i18n';
import hist from './utils/history';

import './assets/css/main.css';

import setPlatformClass from './utils/setPlatformClass';
import CtxProviders from './providers';
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
    configTabs,
    launchBarItems,
    config:{
        // !!!README!!!
        //
        // // default url to switch to
        // defaultViewUrl:'/someUrl',
        //
        // !!!README!!!
        // // protection fuse timeout specified over here
        // // onAppAwaitDelayTime is the fuse timout time to switch from loading view
        // onAppAwaitDelayTime: 4000,
        //
        // // onAppChildAwaitDelayTime is the fuse timout time to switch to target child url
        // onAppChildAwaitDelayTime: 200,
        //
        // // onAppNotificationAwaitDelayTime is the fuse timout time to switch to target notification url
        // onAppNotificationAwaitDelayTime: 200,
        //
        // // onAppClosingAwaitDelayTime is the fuse timout time to shutdown the whole application
        // onAppClosingAwaitDelayTime: 200,

    }
});

// !!!README!!!
// alternative sample color settings uncomment to set the result 2#
// InitalizaeReactOpenfinMatImpl({
//     primaryColor: '#d50000',
//     successColor:'#ab47bc',
//     infoColor:'#ff5722',
//     warningColor:'#cddc39',
//     dangerColor:'#ec407a',
// })

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
                <I18nextProvider i18n={i18n}>
                    <CtxProviders>
                        <App/>
                    </CtxProviders>
                </I18nextProvider>
            </Suspense>
        </Provider>
    </ReactOpenfin>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();