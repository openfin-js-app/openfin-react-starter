import { buffers, delay } from 'redux-saga';
import { all, call, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { Docking ,System, Event, Window } from '@albertli90/redux-openfin';

import hist from '../../utils/history';

import { launchBarItems } from '../../layouts/LaunchBar/LaunchBarData';

import {
    APPLICATION_STARTED,
    APPLICATION_CHILD_STARTED,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_CLOSE_SNACKBAR,
    applicationUpdateDockStatus,
    APPLICATION_TOGGLE_WINDOW_STATE,
    applicationNewSnackbar,
    applicationReady,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    APPLICATION_LAUNCH_BAR_TOGGLE,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
    APPLICATION_LAUNCH_NEW_WINDOW,
    configLoadFromDexie,
} from '..';

import { configUpdateNewWindowPosition } from '..';
import { GetGroupResPayload} from "@albertli90/redux-openfin/window/types";

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

export const getLaunchBarCollapse = state => state.application.launchBarCollapse;
export const getWindowsState = state => state.application.windowsState;
export const getNewWindowTop = state => state.config.application.newWinTop;
export const getNewWindowLeft = state => state.config.application.newWinLeft;
export const getNewWindowWidth = state => state.config.application.newWinWidth;
export const getNewWindowHeight = state => state.config.application.newWinHeight;

export function* handleRedirectToLoadingView(monitorRect) {

    const WINDOW_WIDTH  = monitorRect.right - monitorRect.left;
    const WINDOW_HEIGHT = monitorRect.bottom - monitorRect.top;
    const _LOADING_BANNER_WIDTH     = Math.min( LOADING_BANNER_WIDTH, WINDOW_WIDTH * 0.6387 );
    const _LOADING_BANNER_HEIGHT    = Math.min( LOADING_BANNER_HEIGHT, WINDOW_HEIGHT * 0.324074 );

    yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
        options:{resizable:false}
    }));

    yield call(Window.asyncs.setBounds,Window.actions.setBounds({
        left:(monitorRect.right - monitorRect.left)/2 - _LOADING_BANNER_WIDTH/2,
        top:(monitorRect.bottom - monitorRect.top)/2 - _LOADING_BANNER_HEIGHT/2,
        width:_LOADING_BANNER_WIDTH,
        height: _LOADING_BANNER_HEIGHT,
    }));
}

export function* handleRedirectFromLoadingView(monitorRect) {

    const WINDOW_WIDTH      = monitorRect.right - monitorRect.left;
    const WINDOW_HEIGHT     = monitorRect.bottom - monitorRect.top;
    const _DEFAULT_WIDTH    = Math.min( DEFAULT_WIDTH, WINDOW_WIDTH * 0.80 );
    const _DEFAULT_HEIGHT   = Math.min( DEFAULT_HEIGHT, WINDOW_HEIGHT * 0.648148 );

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
            left:(monitorRect.right - monitorRect.left)/2 - _DEFAULT_WIDTH/2,
            top:(monitorRect.bottom - monitorRect.top)/2 - _DEFAULT_HEIGHT/2,
            width:_DEFAULT_WIDTH,
            height: _DEFAULT_HEIGHT,
        }));

    }else{
        // switch to launchBar
        const launchBarCollapse = yield select(getLaunchBarCollapse);

        yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
            options:{resizable:false}
        }));

        previousBaseWindow.url='/dashboard/view-one';
        previousBaseWindow.top=(monitorRect.bottom - monitorRect.top)/2 - _DEFAULT_HEIGHT/2;
        previousBaseWindow.left=(monitorRect.right - monitorRect.left)/2 - _DEFAULT_WIDTH/2;
        previousBaseWindow.width=_DEFAULT_WIDTH;
        previousBaseWindow.height=_DEFAULT_HEIGHT;

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
        put.resolve(configLoadFromDexie()),
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

export function* handleApplicationChildLoading() {
    yield all([
        call(Window.asyncs.getBounds,Window.actions.getBounds({})),
        put.resolve(configLoadFromDexie()),
    ]);

    const groupedWindowsRes = yield call(Window.asyncs.getGroup,Window.actions.getGroup({}));
    const groupedWindows = (groupedWindowsRes.payload as GetGroupResPayload).windows;
    if(groupedWindows && groupedWindows.length > 0){
        yield put(applicationUpdateDockStatus(true));
    }else{
        yield put(applicationUpdateDockStatus(false));
    }

    yield put.resolve(applicationReady());
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
    const windowState = yield select(getWindowsState);
    if (windowState === 'maximized'){
        yield call(Window.asyncs.restore,Window.actions.restore({}));
    }else if (windowState === 'normal'){
        yield call(Window.asyncs.maximize,Window.actions.maximize({}));
    }
}

export function* handleApplicationLaunchBarToggle(){

    const launchBarCollapse = yield select(getLaunchBarCollapse);
    const getBoundsAction = yield call(Window.asyncs.getBounds,Window.actions.getBounds({}));
    const getBoundsActionPayload = getBoundsAction.payload;

    if (window.location.href.toLowerCase().endsWith('launchbar')){
        // switch to main panel
        yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
            options:{
                resizable:true,
            }
        }));
        yield call(Window.asyncs.setBounds,Window.actions.setBounds({
            left:previousBaseWindow.left?previousBaseWindow.left:parseInt(process.env.REACT_APP_NEW_WINDOW_LEFT,10),
            top:previousBaseWindow.top?previousBaseWindow.top:parseInt(process.env.REACT_APP_NEW_WINDOW_TOP,10),
            width:previousBaseWindow.width?previousBaseWindow.width:parseInt(process.env.REACT_APP_NEW_WINDOW_WIDTH,10),
            height:previousBaseWindow.height?previousBaseWindow.height:parseInt(process.env.REACT_APP_NEW_WINDOW_HEIGHT,10),
        }));
        if (process.env.NODE_ENV !== 'test'){
            hist.push(previousBaseWindow.url?previousBaseWindow.url:process.env.REACT_APP_DEFAULT_DASHBOARD_VIEW_URL);
        }
    }else{
        // switch to launchBar
        yield call(Window.asyncs.updateOptions,Window.actions.updateOptions({
            options:{
                resizable:false,
            }
        }));
        previousBaseWindow.url = (new URL(window.location.href)).pathname;
        previousBaseWindow.top = getBoundsActionPayload.top;
        previousBaseWindow.left = getBoundsActionPayload.left;
        previousBaseWindow.width = getBoundsActionPayload.width;
        previousBaseWindow.height = getBoundsActionPayload.height;

        if (launchBarCollapse){
            yield call(Window.asyncs.setBounds,Window.actions.setBounds({
                left:getBoundsActionPayload.left,
                top:getBoundsActionPayload.top,
                width:88,
                height:64,
            }));
        }else{
            yield call(Window.asyncs.setBounds,Window.actions.setBounds({
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

    const getBoundsAction = yield call(Window.asyncs.getBounds,Window.actions.getBounds({}));
    const getBoundsActionPayload = getBoundsAction.payload;

    if (launchBarCollapse){
        yield call(Window.asyncs.setBounds,Window.actions.setBounds({
            left:getBoundsActionPayload.left,
            top:getBoundsActionPayload.top,
            width:88,
            height:64,
        }));
    }else{
        yield call(Window.asyncs.setBounds,Window.actions.setBounds({
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

    yield call(Window.asyncs.newWindow,Window.actions.newWindow(appJson));

    yield put(configUpdateNewWindowPosition());

}

export function* handleGroupChanged(action){
    const {
        sourceWindowName, targetWindowName, memeberOf, reason
    } = action.payload;


    if (reason === Docking.types.GroupEventReason.JOIN){
        if(sourceWindowName === window.name){
            yield put(applicationNewSnackbar({
                message:'Joined group',
                variant:'primary'
            }))
        }else if (targetWindowName === window.name){
            yield put(applicationNewSnackbar({
                message:'Been joined',
                variant:'rose'
            }))
        }
    }else if (
        reason === Docking.types.GroupEventReason.LEAVE &&
        sourceWindowName === window.name
    ){
        yield put(applicationNewSnackbar({
            message:'Left group',
            variant:'primary'
        }))
    }else if (
        reason === Docking.types.GroupEventReason.DISBAND &&
        sourceWindowName === window.name
    ){
        yield put(applicationNewSnackbar({
            message:'Got disbanded',
            variant:'rose'
        }))
    }

}

export default function* (){
    yield takeLatest(APPLICATION_STARTED,handleApplicationLoading);
    yield takeLatest(APPLICATION_CHILD_STARTED,handleApplicationChildLoading);
    yield takeLatest(Event.actionDicts.windowEventDictByName['close-requested'].type,handleApplicationExit);
    yield takeLatest(APPLICATION_TOGGLE_WINDOW_STATE,handleToggleWindowState);
    yield takeLatest(APPLICATION_NEW_SNACKBAR,handleApplicationAddNewSnackBar);
    yield takeLatest(APPLICATION_CLOSE_SNACKBAR,handleApplicationCloseSnackBar);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE,handleApplicationLaunchBarToggle);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,handleApplicationLaunchBarToggleCollapse);
    yield takeLatest(APPLICATION_LAUNCH_NEW_WINDOW,handleApplicationLaunchNewWindow);
    yield takeEvery(Event.actionDicts.windowEventDictByName['group-changed'].type,handleGroupChanged);
}