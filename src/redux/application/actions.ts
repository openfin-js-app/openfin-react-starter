import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import { IApplicationNewSnackbarOption, IApplicationSetSnackbarStatusOption, IApplicationCloseSnackBarOption } from './types';

export const APPLICATION_STARTED:string = 'APPLICATION_STARTED';
export const APPLICATION_READY:string = 'APPLICATION_READY';
export const APPLICATION_DRAWER_TOGGLE:string = 'APPLICATION_DRAWER_TOGGLE';
export const APPLICATION_TOGGLE_WINDOW_STATE:string = 'APPLICATION_TOGGLE_WINDOW_STATE';

export const applicationStarted:ActionFunctionAny<Action<void>> = createAction(APPLICATION_STARTED);
export const applicationReady:ActionFunctionAny<Action<void>> = createAction(APPLICATION_READY);
export const applicationDrawerToggle:ActionFunctionAny<Action<void>> = createAction(APPLICATION_DRAWER_TOGGLE);
export const applicationToogleWindowState:ActionFunctionAny<Action<void>> = createAction(APPLICATION_TOGGLE_WINDOW_STATE);

// snackbar

export const APPLICATION_NEW_SNACKBAR='APPLICATION_NEW_SNACKBAR';
export const APPLICATION_SET_SNACKBAR_STATUS='APPLICATION_SET_SNACKBAR_STATUS';
export const APPLICATION_PROCESS_SNACKBAR_QUEUE='APPLICATION_PROCESS_SNACKBAR_QUEUE';
export const APPLICATION_CLOSE_SNACKBAR='APPLICATION_CLOSE_SNACKBAR';

export const applicationNewSnackbar:ActionFunctionAny<Action<IApplicationNewSnackbarOption>>
    = createAction(APPLICATION_NEW_SNACKBAR, (option:IApplicationNewSnackbarOption)=>(option));
export const applicationSetSnackbarStatus:ActionFunctionAny<Action<IApplicationSetSnackbarStatusOption>>
    = createAction(APPLICATION_SET_SNACKBAR_STATUS, (option:IApplicationSetSnackbarStatusOption)=>(option));
export const applicationProcessSnackbarQueue:ActionFunctionAny<Action<void>>
    = createAction(APPLICATION_PROCESS_SNACKBAR_QUEUE);
export const applicationCloseSnackbar:ActionFunctionAny<Action<IApplicationCloseSnackBarOption>>
    = createAction(APPLICATION_CLOSE_SNACKBAR, (option)=>(option));


// launch bar

export const APPLICATION_LAUNCH_BAR_TOGGLE = 'APPLICATION_LAUNCH_BAR_TOGGLE';
export const APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE = 'APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE';
export const APPLICATION_LAUNCH_NEW_WINDOW = 'APPLICATION_LAUNCH_NEW_WINDOW';
export const applicationLaunchBarToggle:ActionFunctionAny<Action<void>> = createAction(APPLICATION_LAUNCH_BAR_TOGGLE);
export const applicationLaunchBarToggleCollapse:ActionFunctionAny<Action<void>> = createAction(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE);
export const applicationLaunchNewWindow:ActionFunctionAny<Action<any>>
    = createAction(APPLICATION_LAUNCH_NEW_WINDOW,(appJson:any)=>(appJson));