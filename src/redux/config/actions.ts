import {createAction, ActionFunctionAny, Action} from 'redux-actions';

export const CONFIG_RESET:string = 'CONFIG_RESET';
export const CONFIG_UPDATE_ONE_FIELD:string = 'CONFIG_UPDATE_ONE_FIELD';
export const CONFIG_UPDATE_GLOBAL_FILTER_STR:string = 'CONFIG_UPDATE_GLOBAL_FILTER_STR';

export const configReset = createAction(CONFIG_RESET, (option)=>(option));
export const configUpdateOneField = createAction(CONFIG_UPDATE_ONE_FIELD, (option)=>(option));
export const configUpdateGlobalFilterStr = createAction(CONFIG_UPDATE_GLOBAL_FILTER_STR, (option)=>(option));

// optional actions depending on the config application values

export const CONFIG_UPDATE_NEW_WINDOW_POSITION:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION';
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA';
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP';
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT';
export const configUpdateNewWindowPosition = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION);
export const configUpdateNewWindowPositionAddDelta = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA);
export const configUpdateNewWindowPositionResetTop = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP);
export const configUpdateNewWindowPositionResetLeft = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT);