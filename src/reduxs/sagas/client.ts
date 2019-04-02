import { delay, put, putResolve, takeEvery, takeLatest } from 'redux-saga/effects';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';

import {
    applicationNewSnackbar,
    APPLICATION_AWAIT,
    applicationReady,
    APPLICATION_CUR_WIN_CLOSING,
    applicationCurWinReadyToClose,
} from 'react-openfin/reduxs';

import {
    CLIENT_SET_VALUE,
} from '..';

export function* handleTakingClientSetValue(action) {
    const payload:any = action.payload;

    if (action[SHARED_ACTION_ORIGIN_TAG] !== window[SHARED_ACTION_ORIGIN_TAG]){
        yield put(applicationNewSnackbar({
            message:`Received msg from ${payload[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'info'
        }))
    }else{
        yield put(applicationNewSnackbar({
            message:`Message sent at ${action[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'success'
        }))
    }
}

export function* handleAppStarting(action){
    console.log('client saga :: handleAppStarting',action);
    yield putResolve(applicationReady({}));
}

export function* handleAppClosing(action){
    console.log('client saga::handleAppClosing');
    yield delay(500);
    yield putResolve(applicationCurWinReadyToClose());
}

export default function *() {
    yield takeEvery(CLIENT_SET_VALUE,handleTakingClientSetValue);
    yield takeLatest(APPLICATION_AWAIT, handleAppStarting);
    yield takeLatest(APPLICATION_CUR_WIN_CLOSING, handleAppClosing);
}