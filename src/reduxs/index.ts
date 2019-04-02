import {combineReducers} from 'redux';
import {IClientState} from './client/types';

import client from './client/reducer';
import { defaultState as clientDefaultState } from './client/reducer';

export * from './client/actions';
export * from './client/types';

export interface IRootState {
    client:IClientState,
}

export const rootDefaultState = {
    client:clientDefaultState,
}

export default (parentWindowState?:IRootState)=>{
    if (parentWindowState){
        return combineReducers({
            client:client(parentWindowState.client),
        });

    }else{
        return combineReducers({
            client:client(),
        });
    }
}
