import { all, takeEvery, select, fork } from 'redux-saga/effects';

import applicationSaga from './application';

export default function* rootSaga(){

    let sagas = [applicationSaga()];

    yield all(sagas);

}