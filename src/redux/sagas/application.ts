import { buffers, delay } from 'redux-saga';
import { all, call, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from '@albertli/redux-openfin';

import hist from '../../utils/history';

import {
    APPLICATION_STARTED,
    applicationReady,
} from '../application/actions';

function* applicationLoading() {
    yield put.resolve(applicationReady());
}

export default function* (){
    yield takeLatest(APPLICATION_STARTED,applicationLoading);
}