import { all, takeEvery, select, fork } from 'redux-saga/effects';

import applicationSaga from './application';

function* watchAndLog(){
    yield takeEvery('*',function* logger(action) {
        const state = yield select();
        console.log(`${action.type}`,action,'state after',state);
    })
}

export default function* rootSaga(){

    let sagas = [applicationSaga(),];

    if(process.env['REACT_APP_LOG_ACTION']=='true'){
        sagas.unshift(watchAndLog());
    }

    yield all(sagas);

}