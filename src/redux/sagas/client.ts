import { buffers, delay } from 'redux-saga';
import { all, call, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { SHARED_ACTION_ORIGIN_TAG } from '@albertli90/redux-openfin/channel';

import {
    CLIENT_SET_VALUE,
    applicationNewSnackbar,
} from '..';

export function* handleTakingClientSetValue(action) {
    const payload:any = action.payload;

    if (payload[SHARED_ACTION_ORIGIN_TAG] !== window[SHARED_ACTION_ORIGIN_TAG]){
        yield put(applicationNewSnackbar({
            message:`Received msg from ${payload[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'info'
        }))
    }else{
        yield put(applicationNewSnackbar({
            message:`Message sent at ${payload[SHARED_ACTION_ORIGIN_TAG]}`,
            variant:'success'
        }))
    }

}

export default function *() {
    yield takeEvery(CLIENT_SET_VALUE,handleTakingClientSetValue);
}