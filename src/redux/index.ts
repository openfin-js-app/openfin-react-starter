import {combineReducers} from 'redux';

import application from './application/reducer';

export * from './application/actions';

export default combineReducers({
    application,
});