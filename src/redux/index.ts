import {combineReducers} from 'redux';
import {IApplicationState} from './application/types';
import {IConfigState} from './config/types';

import application from './application/reducer';
import { defaultState as applicationDefaultState } from './application/reducer';
import config from './config/reducer';
import { defaultState as configDefaultState } from './config/reducer';

export * from './application/actions';
export * from './application/types';
export * from './config/actions';
export * from './config/types';

export interface IRootState {
    application:IApplicationState,
    config:IConfigState,
}

export const rootDefaultState = {
    application:applicationDefaultState,
    config:configDefaultState,
}

export default combineReducers({
    application,
    config,
});