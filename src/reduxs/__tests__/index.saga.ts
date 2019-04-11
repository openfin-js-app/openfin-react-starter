import { testSaga } from 'redux-saga-test-plan';
import {all, put, select, take, takeLatest,} from 'redux-saga/effects';

import clientSaga from '../sagas/client';

import rootSaga from '../sagas';
import { watchAndLogSaga, handleLogAllActions } from '../sagas';

describe('Root saga',()=>{

    it('Default watchAll',()=>{
        process.env.REACT_APP_LOG_ACTION = 'false';
        expect(process.env.REACT_APP_LOG_ACTION === 'true').toBeFalsy();

        const watchAll = rootSaga();
        const effect = watchAll.next().value;

        expect(effect).toEqual(
            all([
                clientSaga(),
            ])
        );
    });

    describe('Log actions',()=>{

        it('Log actions enabled',()=>{
            process.env.REACT_APP_LOG_ACTION = 'true';
            expect(process.env.REACT_APP_LOG_ACTION === 'true').toBeTruthy();

            const watchAll = rootSaga();
            const effect = watchAll.next().value;

            expect(effect.payload).toHaveLength(2);
        });

        it ('watchAndLogSaga',()=>{
            testSaga(watchAndLogSaga)
                .next()
                .takeEvery('*',handleLogAllActions)
                .next()
                .isDone();
        });

        it ('handleLogAllActions',()=>{
            testSaga(handleLogAllActions,{type:'SAMPLE_ACTION_TYPE'})
                .next()
                .select()
                .next({})
                .isDone();
        });

    })

});
