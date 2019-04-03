import { delay, put, putResolve, takeEvery, takeLatest } from 'redux-saga/effects';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';

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
} from 'react-openfin/reduxs';

import {
    CLIENT_SET_VALUE,
} from '..';

export function* handleTakingClientSetValue(action) {
    if (action[SHARED_ACTION_ORIGIN_TAG] !== window[SHARED_ACTION_ORIGIN_TAG]){
        yield put(applicationNewSnackbar({
            message:`Received msg from ${action[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'info'
        }))
    }else{
        yield put(applicationNewSnackbar({
            message:`Message sent at ${action[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'success'
        }))
    }
}

export function* handleStarting(action){
    console.log('client saga :: handlStarting',action);
    if (action.type === APPLICATION_AWAIT){
        yield delay(3000);
        yield putResolve(applicationReady({}));
    }else if(action.type === APPLICATION_NOTIFICATION_AWAIT){
        yield putResolve(applicationNotificationReady({}));
    }else if(action.type === APPLICATION_CHILD_AWAIT){
        yield putResolve(applicationChildReady({}));
    }
}

export function* handleAppClosing(action){
    console.log('client saga::handleAppClosing');
    yield putResolve(applicationCurWinReadyToClose());
}

export default function *() {
    yield takeEvery(CLIENT_SET_VALUE,handleTakingClientSetValue);
    yield takeLatest(APPLICATION_AWAIT, handleStarting);
    yield takeLatest(APPLICATION_CHILD_AWAIT, handleStarting);
    yield takeLatest(APPLICATION_NOTIFICATION_AWAIT, handleStarting);
    yield takeLatest(APPLICATION_CUR_WIN_CLOSING, handleAppClosing);
}