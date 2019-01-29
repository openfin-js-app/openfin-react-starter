import {combineReducers} from 'redux';
import {IApplicationState} from './application/types';
import {IClientState} from './client/types';
import {IConfigState} from './config/types';

import application from './application/reducer';
import { defaultState as applicationDefaultState } from './application/reducer';
import client from './client/reducer';
import { defaultState as clientDefaultState } from './client/reducer';
import config from './config/reducer';
import { defaultState as configDefaultState } from './config/reducer';

export * from './application/actions';
export * from './application/types';
export * from './client/actions';
export * from './client/types';
export * from './config/actions';
export * from './config/context';
export * from './config/types';

export interface IRootState {
    application:IApplicationState,
    client:IClientState,
    config:IConfigState,
}

export const rootDefaultState = {
    application:applicationDefaultState,
    client:clientDefaultState,
    config:configDefaultState,
}

export default (parentWindowState?:IRootState)=>{
    if (parentWindowState){
        return combineReducers({
            application:application(parentWindowState.application),
            client:client(parentWindowState.client),
            config:config(parentWindowState.config),
        });

    }else{
        return combineReducers({
            application:application(),
            client:client(),
            config:config(),
        });
    }
}
