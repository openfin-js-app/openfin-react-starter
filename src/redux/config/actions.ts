import {createAction, ActionFunctionAny, Action} from 'redux-actions';

export const CONFIG_RESET:string = 'CONFIG_RESET';
export const CONFIG_UPDATE_ONE_FIELD:string = 'CONFIG_UPDATE_ONE_FIELD';

export const configReset = createAction(CONFIG_RESET, (option)=>(option));
export const configUpdateOneField = createAction(CONFIG_UPDATE_ONE_FIELD, (option)=>(option));

// optional actions depending on the config application values

export const CONFIG_UPDATE_NEW_WINDOW_POSITION:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION';
export const configUpdateNewWindowPosition = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION);