import { buffers, delay } from 'redux-saga';
import { all, call, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from '@albertli90/redux-openfin';

import hist from '../../utils/history';

import { launchBarItems } from '../../layouts/LaunchBar/LaunchBarData';

const ENABLE_LOADING_VIEW=process.env.REACT_APP_ENABLE_LOADING_VIEW.toLowerCase() === 'true';

const LOADING_BANNER_WIDTH = parseInt(process.env.REACT_APP_LOADING_BANNER_WIDTH, 10);
const LOADING_BANNER_HEIGHT = parseInt(process.env.REACT_APP_LOADING_BANNER_HEIGHT, 10);
const DEFAULT_WIDTH = parseInt(process.env.REACT_APP_DEFAULT_APP_WIDTH, 10);
const DEFAULT_HEIGHT = parseInt(process.env.REACT_APP_DEFAULT_APP_HEIGHT, 10);

const previousBaseWindow={
    url:null,
    top:null,
    left:null,
    width:null,
    height:null,
};

import {
    APPLICATION_STARTED,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_CLOSE_SNACKBAR,
    APPLICATION_TOGGLE_WINDOW_STATE,
    applicationReady,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    APPLICATION_LAUNCH_BAR_TOGGLE,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
    APPLICATION_LAUNCH_NEW_WINDOW,
} from '..';

import { configUpdateNewWindowPosition } from '..';

export const getLaunchBarCollapse = state => state.application.launchBarCollapse;
export const getWindowState = state => state.application.windowState;
export const getNewWindowTop = state => state.config.application.newWinTop;
export const getNewWindowLeft = state => state.config.application.newWinLeft;
export const getNewWindowWidth = state => state.config.application.newWinWidth;
export const getNewWindowHeight = state => state.config.application.newWinHeight;

export function* handleRedirectToLoadingView(monitorRect) {
    yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
        options:{resizable:false}
    }));

    yield call(Window.asyncs.setBounds,Window.actions.setBounds({
        left:(monitorRect.right - monitorRect.left)/2 - LOADING_BANNER_WIDTH/2,
        top:(monitorRect.bottom - monitorRect.top)/2 - LOADING_BANNER_HEIGHT/2,
        width:LOADING_BANNER_WIDTH,
        height: LOADING_BANNER_HEIGHT,
    }));
}

export function* handleRedirectFromLoadingView(monitorRect) {
    // after the sagas loaded, redirect to default page/view
    if (process.env.REACT_APP_DEFAULT_VIEW_URL && process.env.REACT_APP_DEFAULT_VIEW_URL.length > 0){
        if (process.env.NODE_ENV !== 'test'){
            hist.push(process.env.REACT_APP_DEFAULT_VIEW_URL);
        }
        yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
            options:{
                resizable:true,
            }
        }));

        yield call(Window.asyncs.setBounds,Window.actions.setBounds({
            left:(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2,
            top:(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2,
            width:DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
        }));

    }else{
        // switch to launchBar
        const launchBarCollapse = yield select(getLaunchBarCollapse);

        yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
            options:{resizable:false}
        }));

        previousBaseWindow.url='/dashboard/view-one';
        previousBaseWindow.top=(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2;
        previousBaseWindow.left=(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2;
        previousBaseWindow.width=DEFAULT_WIDTH;
        previousBaseWindow.height=DEFAULT_HEIGHT;

        if(launchBarCollapse){
            yield call(Window.asyncs.setBounds,Window.actions.setBounds({
                left:(monitorRect.right - monitorRect.left)/2,
                top:(monitorRect.bottom - monitorRect.top)/4,
                width:88,
                height:64,
            }));
        }else{
            yield call(Window.asyncs.setBounds,Window.actions.setBounds({
                left:(monitorRect.right - monitorRect.left)/2,
                top:(monitorRect.bottom - monitorRect.top)/4,
                width:launchBarItems.length<10?launchBarItems.length*64+88:664,
                height:64,
            }));
        }
        if (process.env.NODE_ENV !== 'test'){
            hist.push('/launchBar');
        }

    }
}

export function* handleApplicationLoading() {

    const currentIsLoadingView =
        (new URL(window.location.href).pathname.indexOf('loading')>-1) ||
        (new URL(window.location.href).pathname.indexOf('index.html')>-1);


    const monitorInfoAction = yield call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}));
    const monitorRect = monitorInfoAction.payload.primaryMonitor.monitorRect;

    yield call(Window.asyncs.setAsForeground,Window.actions.setAsForeground({}));

    if (ENABLE_LOADING_VIEW && currentIsLoadingView){
        yield* handleRedirectToLoadingView(monitorRect) as any;
    }

    yield all([
        call(System.asyncs.getMachineId,System.actions.getMachineId({})),
        // getDeviceUserId might fail, thus use flux syntax........
        put.resolve(System.actions.getDeviceUserId({})),
        take(System.actions.GET_DEVICE_USER_ID_RES),
        call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'USERNAME'})),
        call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'computername'})),
        call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'HOSTNAME'})),
        call(System.asyncs.getVersion,System.actions.getVersion({})),
        call(System.asyncs.getHostSpecs,System.actions.getHostSpecs({})),
        call(Window.asyncs.getState,Window.actions.getState({})),
        // delay for loading view render, could be removed
        call(delay,5000),
    ]);

    yield put.resolve(applicationReady());

    if (ENABLE_LOADING_VIEW && currentIsLoadingView){
        yield* handleRedirectFromLoadingView(monitorRect) as any;
    }
}

export function* handleApplicationExit() {
    // -------------------------------start of app codes -----------------------------------------------

    // do something cleaning up before shutdonw~

    // ---------------------------------end of app codes -----------------------------------------------


    yield put.resolve(Window.actions.close({force:true}));
}

export function* handleApplicationAddNewSnackBar() {
    const state = yield select();
    if(state.snackBarOpen){
        yield put(applicationSetSnackbarStatus({open:false}));
    }else{
        yield put(applicationProcessSnackbarQueue());
    }
}

export function* handleApplicationCloseSnackBar(action) {
    const {event, reason} = action.payload;
    if(reason!=='clickaway'){
        return;
    }else{
        yield put(applicationSetSnackbarStatus({open:false}));
    }
}

export function* handleToggleWindowState(){
    const windowState = yield select(getWindowState);
    if (windowState === 'maximized'){
        yield put(Window.actions.restore({}));
    }else if (windowState === 'normal'){
        yield put(Window.actions.maximize({}));
    }
}

export function* handleApplicationLaunchBarToggle(){
    const launchBarCollapse = yield select(getLaunchBarCollapse);

    yield put.resolve(Window.actions.getBounds({}));

    const getBoundsAction = yield take(Window.actions.GET_BOUNDS_RES);
    const getBoundsActionPayload = getBoundsAction.payload;

    if (window.location.href.toLowerCase().endsWith('launchbar')){
        // switch to main panel
        yield put.resolve(Window.actions.updateOptions({
            options:{
                resizable:true
            }
        }));
        yield put.resolve(Window.actions.setBounds({
            left:previousBaseWindow.left,
            top:previousBaseWindow.top,
            width:previousBaseWindow.width,
            height:previousBaseWindow.height,
        }));
        if (process.env.NODE_ENV !== 'test'){
            hist.push(previousBaseWindow.url);
        }
    }else{
        // switch to launchBar
        yield put.resolve(Window.actions.updateOptions({
            options:{
                resizable:false
            }
        }));
        previousBaseWindow.url = (new URL(window.location.href)).pathname;
        previousBaseWindow.top = getBoundsActionPayload.top;
        previousBaseWindow.left = getBoundsActionPayload.left;
        previousBaseWindow.width = getBoundsActionPayload.width;
        previousBaseWindow.height = getBoundsActionPayload.height;

        if (launchBarCollapse){
            yield put.resolve(Window.actions.setBounds({
                left:getBoundsActionPayload.left,
                top:getBoundsActionPayload.top,
                width:88,
                height:64,
            }));
        }else{
            yield put.resolve(Window.actions.setBounds({
                left:getBoundsActionPayload.left,
                top:getBoundsActionPayload.top,
                width:launchBarItems.length<10? launchBarItems.length*64+88:664,
                height:64,
            }));
        }
        if (process.env.NODE_ENV !== 'test'){
            hist.push('/launchBar');
        }

    }
}

export function* handleApplicationLaunchBarToggleCollapse() {
    const launchBarCollapse = yield select(getLaunchBarCollapse);

    yield put.resolve(Window.actions.getBounds({}));
    const getBoundsAction = yield take(Window.actions.GET_BOUNDS_RES);
    const getBoundsActionPayload = getBoundsAction.payload;

    if (launchBarCollapse){
        yield put.resolve(Window.actions.setBounds({
            left:getBoundsActionPayload.left,
            top:getBoundsActionPayload.top,
            width:88,
            height:64,
        }));
    }else{
        yield put.resolve(Window.actions.setBounds({
            left:getBoundsActionPayload.left,
            top:getBoundsActionPayload.top,
            width:launchBarItems.length<10? launchBarItems.length*64+88:664,
            height:64,
        }));
    }

}

export function* handleApplicationLaunchNewWindow(action) {
    const appJson = action.payload;
    const defaultWidth = yield select(getNewWindowWidth);
    const defaultHeight = yield select(getNewWindowHeight);
    const defaultTop = yield select(getNewWindowTop);
    const defaultLeft = yield select(getNewWindowLeft);

    if(!appJson.defaultWidth){ appJson.defaultWidth = defaultWidth}
    if(!appJson.defaultHeight){ appJson.defaultHeight = defaultHeight}
    if(!appJson.defaultTop){ appJson.defaultTop = defaultTop}
    if(!appJson.defaultLeft){ appJson.defaultLeft = defaultLeft}

    yield put.resolve(Window.actions.newWindow(appJson));

    yield put(configUpdateNewWindowPosition());

}

export default function* (){
    yield takeLatest(APPLICATION_STARTED,handleApplicationLoading);
    yield takeLatest(Event.actionDicts.windowEventDictByName['close-requested'].type,handleApplicationExit);
    yield takeLatest(APPLICATION_TOGGLE_WINDOW_STATE,handleToggleWindowState);
    yield takeLatest(APPLICATION_NEW_SNACKBAR,handleApplicationAddNewSnackBar);
    yield takeLatest(APPLICATION_CLOSE_SNACKBAR,handleApplicationCloseSnackBar);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE,handleApplicationLaunchBarToggle);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,handleApplicationLaunchBarToggleCollapse);
    yield takeLatest(APPLICATION_LAUNCH_NEW_WINDOW,handleApplicationLaunchNewWindow);
}