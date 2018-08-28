import { createAction, ActionFunctionAny, Action } from 'redux-actions';
import { ApplicationNewSnackbarOption, ApplicationSetSnackbarStatusOption, ApplicationCloseSnackbarOption } from './types';

export const APPLICATION_STARTED:string = 'APPLICATION_STARTED';
export const APPLICATION_READY:string = 'APPLICATION_READY';
export const APPLICATION_DRAWER_TOGGLE:string = 'APPLICATION_DRAWER_TOGGLE';
export const APPLICATION_TOGGLE_WINDOW_STATE:string = 'APPLICATION_TOGGLE_WINDOW_STATE';

export const applicationStarted:ActionFunctionAny<Action<any>> = createAction(APPLICATION_STARTED);
export const applicationReady:ActionFunctionAny<Action<any>> = createAction(APPLICATION_READY);
export const applicationDrawerToggle:ActionFunctionAny<Action<any>> = createAction(APPLICATION_DRAWER_TOGGLE);
export const applicationToogleWindowState:ActionFunctionAny<Action<any>> = createAction(APPLICATION_TOGGLE_WINDOW_STATE);

// snackbar

export const APPLICATION_NEW_SNACKBAR='APPLICATION_NEW_SNACKBAR';
export const APPLICATION_SET_SNACKBAR_STATUS='APPLICATION_SET_SNACKBAR_STATUS';
export const APPLICATION_PROCESS_SNACKBAR_QUEUE='APPLICATION_PROCESS_SNACKBAR_QUEUE';
export const APPLICATION_CLOSE_SNACKBAR='APPLICATION_CLOSE_SNACKBAR';

export const applicationNewSnackbar = createAction(APPLICATION_NEW_SNACKBAR, (option:ApplicationNewSnackbarOption)=>(option));
export const applicationSetSnackbarStatus = createAction(APPLICATION_SET_SNACKBAR_STATUS, (option:ApplicationSetSnackbarStatusOption)=>(option));
export const applicationProcessSnackbarQueue = createAction(APPLICATION_PROCESS_SNACKBAR_QUEUE);
export const applicationCloseSnackbar = createAction(APPLICATION_CLOSE_SNACKBAR, (option)=>(option));


// launch bar

export const APPLICATION_LAUNCH_BAR_TOGGLE = 'APPLICATION_LAUNCH_BAR_TOGGLE';
export const APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE = 'APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE';
export const APPLICATION_LAUNCH_NEW_WINDOW = 'APPLICATION_LAUNCH_NEW_WINDOW';
export const applicationLaunchBarToggle = createAction(APPLICATION_LAUNCH_BAR_TOGGLE,(option)=>(option));
export const applicationLaunchBarToggleCollapse = createAction(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,(option)=>(option));
export const applicationLaunchNewWindow = createAction(APPLICATION_LAUNCH_NEW_WINDOW,(option)=>(option));