import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './assets/css/main.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './utils/configureStore';
import {applicationStarted} from "./redux";

declare const window:any;

const store = configureStore();
window.store=store;
store.dispatch(applicationStarted());

ReactDOM.render(
    <Provider store = {window.store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);

registerServiceWorker();
