import {createAction, ActionFunctionAny, Action} from 'redux-actions';

import {IConfigResetOption, IConfigUpdateOneFieldOption, IConfigUpdateGlobalFilterStrOption} from './types';

export const CONFIG_RESET:string = 'CONFIG_RESET';
export const CONFIG_UPDATE_ONE_FIELD:string = 'CONFIG_UPDATE_ONE_FIELD';
export const CONFIG_UPDATE_GLOBAL_FILTER_STR:string = 'CONFIG_UPDATE_GLOBAL_FILTER_STR';

export const configReset:ActionFunctionAny<Action<IConfigResetOption>>
    = createAction(CONFIG_RESET, (option)=>(option));
export const configUpdateOneField:ActionFunctionAny<Action<IConfigUpdateOneFieldOption>>
    = createAction(CONFIG_UPDATE_ONE_FIELD, (option)=>(option));
export const configUpdateGlobalFilterStr:ActionFunctionAny<Action<IConfigUpdateGlobalFilterStrOption>>
    = createAction(CONFIG_UPDATE_GLOBAL_FILTER_STR, (option)=>(option));

// optional actions depending on the config application values

export const CONFIG_UPDATE_NEW_WINDOW_POSITION:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION';
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA';
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP';
export const CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT:string = 'CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT';
export const configUpdateNewWindowPosition:ActionFunctionAny<Action<void>>
    = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION);
export const configUpdateNewWindowPositionAddDelta:ActionFunctionAny<Action<void>>
    = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION_ADD_DELTA);
export const configUpdateNewWindowPositionResetTop:ActionFunctionAny<Action<void>>
    = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_TOP);
export const configUpdateNewWindowPositionResetLeft:ActionFunctionAny<Action<void>>
    = createAction(CONFIG_UPDATE_NEW_WINDOW_POSITION_RESET_LEFT);