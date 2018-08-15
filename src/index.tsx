import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './assets/css/main.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

registerServiceWorker();
