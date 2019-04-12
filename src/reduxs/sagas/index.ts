import { all, takeEvery, select } from 'redux-saga/effects';

import clientSaga from './client';

export function* handleLogAllActions(action) {
    const state = yield select();
    console.log(`${action.type}`,action,'state after',state);
}

export function* watchAndLogSaga(){
    yield takeEvery('*',handleLogAllActions)
}

export default function* rootSaga(){

    const sagas = [ clientSaga() ];

    if(process.env.REACT_APP_LOG_ACTION === 'true'){
        sagas.unshift(watchAndLogSaga());
    }

    yield all(sagas);

}