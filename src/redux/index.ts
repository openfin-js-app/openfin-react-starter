import {combineReducers} from 'redux';

import application from './application/reducer';
import config from './config/reducer';

export * from './application/actions';
export * from './config/actions';

export default combineReducers({
    application,
    config,
});