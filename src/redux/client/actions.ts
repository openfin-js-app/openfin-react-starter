import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import { IClientState } from './types';

export const CLIENT_SET_VALUE:string = 'CLIENT_SET_VALUE';
export const clientSetValue:ActionFunctionAny<Action<Partial<IClientState>>> = createAction(CLIENT_SET_VALUE,
    (option:Partial<IClientState>)=>(option)
);