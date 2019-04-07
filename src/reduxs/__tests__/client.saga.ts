import { testSaga } from 'redux-saga-test-plan';
import { all, call, delay, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from 'redux-openfin';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';
import {
    APPLICATION_AWAIT,
    APPLICATION_CHILD_AWAIT,
    APPLICATION_NOTIFICATION_AWAIT,
    APPLICATION_CUR_WIN_CLOSING,
    applicationNewSnackbar,
} from 'react-openfin/reduxs';

import {
    CLIENT_SET_VALUE,
} from '..';

import { handleTakingClientSetValue, handleStarting, handleAppClosing, default as clientSaga } from '../sagas/client';

describe('Client saga',()=>{

    describe('handleTakingClientSetValue saga',()=>{
        it('recieving a msg',()=>{
            const action = {};
            window[SHARED_ACTION_ORIGIN_TAG] = 'channelClientId';
            action[SHARED_ACTION_ORIGIN_TAG] = 'channelClientId';
            testSaga(handleTakingClientSetValue,action)
                .next()
                .put(applicationNewSnackbar({
                    message:`Message sent at ${action[SHARED_ACTION_ORIGIN_TAG]}`,
                    variant:'success'
                }))
                .next()
                .isDone();
        });

        it('sending a msg',()=>{
            const action = {};
            window[SHARED_ACTION_ORIGIN_TAG] = 'channelClientId';
            action[SHARED_ACTION_ORIGIN_TAG] = 'anotherChannelClientId';
            testSaga(handleTakingClientSetValue,action)
                .next()
                .put(applicationNewSnackbar({
                    message:`Received msg from ${action[SHARED_ACTION_ORIGIN_TAG]}`,
                    variant:'info'
                }))
                .next()
                .isDone();
        })
    });

    it('default function register all event',()=>{
        testSaga(clientSaga)
            .next()
            .takeEvery(CLIENT_SET_VALUE,handleTakingClientSetValue)
            .next()
            .takeLatest(APPLICATION_AWAIT,handleStarting)
            .next()
            .takeLatest(APPLICATION_CHILD_AWAIT,handleStarting)
            .next()
            .takeLatest(APPLICATION_NOTIFICATION_AWAIT,handleStarting)
            .next()
            .takeLatest(APPLICATION_CUR_WIN_CLOSING,handleAppClosing)
            .next()
            .isDone();
    })

});
