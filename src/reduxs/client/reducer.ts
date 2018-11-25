import { handleActions, Action } from 'redux-actions';

import { IClientState,  } from './types';

import {CLIENT_SET_VALUE} from './actions';

export const defaultState:Partial<IClientState>={
    count:0,
};


export default (parentWindowState?:Partial<IClientState>)=>{
    let initState:Partial<IClientState>;

    if (parentWindowState){
        initState={
            ...parentWindowState,
        }
    }else{
        initState = defaultState;
    }

    return handleActions({
        [CLIENT_SET_VALUE]:(state,action)=>{
            return {
                ...state,
                ...action.payload,
            }
        }
    },initState);

}