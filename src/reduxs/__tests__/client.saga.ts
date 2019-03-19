import { testSaga } from 'redux-saga-test-plan';
import { all, call, delay, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from 'redux-openfin';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';

import {
    CLIENT_SET_VALUE,
    applicationNewSnackbar,
} from '..';

import { handleTakingClientSetValue, default as clientSaga } from '../sagas/client';

describe('Client saga',()=>{

    describe('handleTakingClientSetValue saga',()=>{
        it('recieving a msg',()=>{
            const payload = {};
            window[SHARED_ACTION_ORIGIN_TAG] = 'channelClientId';
            payload[SHARED_ACTION_ORIGIN_TAG] = 'channelClientId';
            testSaga(handleTakingClientSetValue,{payload})
                .next()
                .put(applicationNewSnackbar({
                    message:`Message sent at ${payload[SHARED_ACTION_ORIGIN_TAG]}`,
                    variant:'success'
                }))
                .next()
                .isDone();
        });

        it('sending a msg',()=>{
            const payload = {};
            window[SHARED_ACTION_ORIGIN_TAG] = 'channelClientId';
            payload[SHARED_ACTION_ORIGIN_TAG] = 'anotherChannelClientId';
            testSaga(handleTakingClientSetValue,{payload})
                .next()
                .put(applicationNewSnackbar({
                    message:`Received msg from ${payload[SHARED_ACTION_ORIGIN_TAG]}`,
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
            .isDone();
    })

});