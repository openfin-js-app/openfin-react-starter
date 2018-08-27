import { buffers, delay } from 'redux-saga';
import { all, call, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from '@albertli/redux-openfin';

import hist from '../../utils/history';

import { launchBarItems } from '../../layouts/LaunchBar/LaunchBarData';

const ENABLE_LOADING_VIEW=process.env['REACT_APP_ENABLE_LOADING_VIEW'].toLowerCase() === 'true';

const LOADING_BANNER_WIDTH = parseInt(process.env['REACT_APP_LOADING_BANNER_WIDTH']);
const LOADING_BANNER_HEIGHT = parseInt(process.env['REACT_APP_LOADING_BANNER_HEIGHT']);
const DEFAULT_WIDTH = parseInt(process.env['REACT_APP_DEFAULT_APP_WIDTH']);
const DEFAULT_HEIGHT = parseInt(process.env['REACT_APP_DEFAULT_APP_HEIGHT']);

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
} from '../application/actions';

import { configUpdateNewWindowPosition } from '../config/actions';

const getLaunchBarCollapse = state => state.application.launchBarCollapse;
const getWindowState = state => state.application.windowState;
const getNewWindowTop = state => state.config.application.newWinTop;
const getNewWindowLeft = state => state.config.application.newWinLeft;
const getNewWindowWidth = state => state.config.application.newWinWidth;
const getNewWindowHeight = state => state.config.application.newWinHeight;

function* applicationLoading() {

    const currentIsLoadingView =
        (new URL(window.location.href).pathname.indexOf('loading')>-1) ||
        (new URL(window.location.href).pathname.indexOf('index.html')>-1);

    let monitorInfoAction:any;
    let monitorRect;

    yield put.resolve(Window.actions.setAsForeground({}));

    if (ENABLE_LOADING_VIEW && currentIsLoadingView){
        yield put.resolve(System.actions.getMonitorInfo({}));
        monitorInfoAction = yield take(System.actions.GET_MONITOR_INFO_RES);
        monitorRect = monitorInfoAction.payload.primaryMonitor.monitorRect;

        yield  put.resolve(Window.actions.updateOptions({
            options:{resizable:false}
        }));

        yield put.resolve(Window.actions.setBounds({
            left:(monitorRect.right - monitorRect.left)/2 - LOADING_BANNER_WIDTH/2,
            top:(monitorRect.bottom - monitorRect.top)/2 - LOADING_BANNER_HEIGHT/2,
            width:LOADING_BANNER_WIDTH,
            height: LOADING_BANNER_HEIGHT,
        }));
    }

    yield all([
        put.resolve(System.actions.getDeviceId({})),
        take(System.actions.GET_DEVICE_ID_RES),
        put.resolve(System.actions.getDeviceUserId({})),
        take(System.actions.GET_DEVICE_USER_ID_RES),
        put.resolve(System.actions.getEnvironmentVariable({env:'username'})),
        take(System.actions.GET_ENVIRONMENT_VARIABLE_RES),
        put.resolve(System.actions.getEnvironmentVariable({env:'computername'})),
        take(System.actions.GET_ENVIRONMENT_VARIABLE_RES),
        put.resolve(System.actions.getVersion({})),
        take(System.actions.GET_VERSION_RES),
        put.resolve(System.actions.getHostSpecs({})),
        take(System.actions.GET_HOST_SPECS_RES),
        put.resolve(Window.actions.getState({})),
        take(Window.actions.GET_STATE_RES),
        // delay for loading view render, could be removed
        call(delay,5000),
    ]);

    yield put.resolve(applicationReady());

    if (ENABLE_LOADING_VIEW && currentIsLoadingView){
        // after the sagas loaded, redirect to default page/view
        if (process.env['REACT_APP_DEFAULT_VIEW_URL'] && process.env['REACT_APP_DEFAULT_VIEW_URL'].length > 0){
            hist.push(process.env['REACT_APP_DEFAULT_VIEW_URL']);
            yield put.resolve(Window.actions.updateOptions({
                options:{
                    resizable:true,
                }
            }));
            yield put.resolve(Window.actions.setBounds({
                left:(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2,
                top:(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2,
                width:DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT,
            }));
        }else{
            // switch to launchBar
            const launchBarCollapse = yield select(getLaunchBarCollapse);
            yield  put.resolve(Window.actions.updateOptions({
                options:{resizable:false}
            }));
            previousBaseWindow.url='/dashboard/view-one';
            previousBaseWindow.top=(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2;
            previousBaseWindow.left=(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2;
            previousBaseWindow.width=DEFAULT_WIDTH;
            previousBaseWindow.height=DEFAULT_HEIGHT;

            if(launchBarCollapse){
                yield put.resolve(Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2,
                    top:(monitorRect.bottom - monitorRect.top)/4,
                    width:88,
                    height:64,
                }));
            }else{
                yield put.resolve(Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2,
                    top:(monitorRect.bottom - monitorRect.top)/4,
                    width:launchBarItems.length<10?launchBarItems.length*64+88:664,
                    height:64,
                }));
            }

            hist.push('/launchBar');

        }

    }
}

function* applicationExit() {
    // -------------------------------start of app codes -----------------------------------------------

    // do something cleaning up before shutdonw~

    // ---------------------------------end of app codes -----------------------------------------------


    yield put.resolve(Window.actions.close({force:true}));
}

function* applicationAddNewSnackBar() {
    const state = yield select();
    if(state.snackBarOpen){
        yield put(applicationSetSnackbarStatus({open:false}));
    }else{
        yield put(applicationProcessSnackbarQueue());
    }
}

function* applicationCloseSnackBar(action) {
    const {event, reason} = action.payload;
    if(reason!=='clickaway'){
        return;
    }else{
        yield put(applicationSetSnackbarStatus({open:false}));
    }
}

function* toggleWindowState(){
    const windowState = yield select(getWindowState);
    if (windowState === 'maximized'){
        yield put(Window.actions.restore({}));
    }else if (windowState === 'normal'){
        yield put(Window.actions.maximize({}));
    }
}

function* applicationLaunchBarToggle(){
    const launchBarCollapse = yield select(getLaunchBarCollapse);

    yield put.resolve(Window.actions.getBounds({}));

    let getBoundsAction = yield take(Window.actions.GET_BOUNDS_RES);
    let getBoundsActionPayload = getBoundsAction.payload;

    if (window.location.href.toLowerCase().endsWith('launchbar')){
        //switch to main panel
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
        hist.push(previousBaseWindow.url);
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

        hist.push('/launchBar');

    }
}

function* applicationLaunchBarToggleCollapse() {
    const launchBarCollapse = yield select(getLaunchBarCollapse);

    yield put.resolve(Window.actions.getBounds({}));
    let getBoundsAction = yield take(Window.actions.GET_BOUNDS_RES);
    let getBoundsActionPayload = getBoundsAction.payload;

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

function* applicationLaucnhNewWindow(action) {
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
    yield takeLatest(APPLICATION_STARTED,applicationLoading);
    yield takeLatest(Event.actionDicts.windowEventDictByName['close-requested'].type,applicationExit);
    yield takeLatest(APPLICATION_TOGGLE_WINDOW_STATE,toggleWindowState);
    yield takeLatest(APPLICATION_NEW_SNACKBAR,applicationAddNewSnackBar);
    yield takeLatest(APPLICATION_CLOSE_SNACKBAR,applicationCloseSnackBar);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE,applicationLaunchBarToggle);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,applicationLaunchBarToggleCollapse);
    yield takeLatest(APPLICATION_LAUNCH_NEW_WINDOW,applicationLaucnhNewWindow);
}