import { delay, put, putResolve, takeEvery, takeLatest } from 'redux-saga/effects';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';

// !!!README!!!
// use the redux for advanced features
import {
    applicationNewSnackbar,
    APPLICATION_AWAIT,
    APPLICATION_CHILD_AWAIT,
    APPLICATION_NOTIFICATION_AWAIT,
    applicationReady,
    applicationChildReady,
    applicationNotificationReady,
    APPLICATION_CUR_WIN_CLOSING,
    applicationCurWinReadyToClose,
    APPLICATION_LAUNCH_BAR_TOGGLED,
    // types
    APPLICATION_LAUNCH_BAR_STATUS,
} from 'react-openfin/reduxs';

import {
    CLIENT_SET_VALUE,
} from '..';

export function* handleTakingClientSetValue(action) {
    if (action[SHARED_ACTION_ORIGIN_TAG] !== window[SHARED_ACTION_ORIGIN_TAG]){
        // !!!README!!!
        // use the redux for advanced features
        // once createReactOpenfinMiddleware is imported, redux-openfin&react-openfin's certain actions can be directly
        // triggered via client redux
        yield put(applicationNewSnackbar({
            message:`Received msg from ${action[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'info'
        }))
    }else{
        // !!!README!!!
        // use the redux for advanced features
        // once createReactOpenfinMiddleware is imported, redux-openfin&react-openfin's certain actions can be directly
        // triggered via client redux
        yield put(applicationNewSnackbar({
            message:`Message sent at ${action[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'success'
        }))
    }
}

// !!!README!!!
// trigger client side initialization over here if needed
export function* handleStarting(action){
    console.log('client saga :: handlStarting',action);
    if (action.type === APPLICATION_AWAIT){
        // APPLICATION_AWAIT will be sent once application started
        // client side initialization effects can be triggered over here
        yield delay(3000);
        // once done, client could send applicationReady action to let react-openfin to switch to
        // the targetUrl specified int the payload from loading view before fuse timeout
        yield putResolve(applicationReady({
            // optional sample targetUrl
            // targetUrl:'/login'
        }));
    }else if(action.type === APPLICATION_NOTIFICATION_AWAIT){
        // APPLICATION_NOTIFICATION_AWAIT will be sent once a notification started
        // once done, client could send applicationNotificationReady action to let react-openfin to switch to
        // the a certain targetUrl specified int the payload from original url before fuse timeout
        yield putResolve(applicationNotificationReady({
            // optional sample targetUrl
            // targetUrl:'/sampleUrl'
        }));
    }else if(action.type === APPLICATION_CHILD_AWAIT){
        // APPLICATION_CHILD_AWAIT will be sent once a child window started
        // once done, client could send applicationChildReady action to let react-openfin to switch to
        // the a certain targetUrl specified int the payload from original url before fuse timeout
        yield putResolve(applicationChildReady({
            // optional sample targetUrl
            // targetUrl:'/sampleUrl'
        }));
    }
}

export function* handleAppClosing(action){
    console.log('client saga::handleAppClosing');
    yield putResolve(applicationCurWinReadyToClose());
}

export function* handleLaunchbarToggled(action) {
    const { status } = action.payload;

    if (status === APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_MAIN_WIN){
        yield put(applicationNewSnackbar({
            message:`Switch to Main Window`,
            variant:'primary'
        }))
    }

}

export default function *() {
    yield takeEvery(CLIENT_SET_VALUE,handleTakingClientSetValue);

    // !!!README!!!
    // trigger client side initialization over here if needed
    yield takeLatest(APPLICATION_AWAIT, handleStarting);
    yield takeLatest(APPLICATION_CHILD_AWAIT, handleStarting);
    yield takeLatest(APPLICATION_NOTIFICATION_AWAIT, handleStarting);
    yield takeLatest(APPLICATION_CUR_WIN_CLOSING, handleAppClosing);
    yield takeLatest(APPLICATION_LAUNCH_BAR_TOGGLED, handleLaunchbarToggled);
}