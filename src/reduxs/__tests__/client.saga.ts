import { testSaga } from 'redux-saga-test-plan';
import { all, call, delay, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from 'redux-openfin';
import { SHARED_ACTION_ORIGIN_TAG } from 'redux-openfin/channel';
import {
    APPLICATION_AWAIT,
    applicationReady,
    APPLICATION_CHILD_AWAIT,
    applicationChildReady,
    APPLICATION_NOTIFICATION_AWAIT,
    applicationNotificationReady,
    APPLICATION_CUR_WIN_CLOSING,
    applicationCurWinReadyToClose,
    applicationNewSnackbar,
    APPLICATION_LAUNCH_BAR_TOGGLED,
    APPLICATION_LAUNCH_BAR_STATUS,
} from 'react-openfin/reduxs';

import {
    CLIENT_SET_VALUE,
} from '..';

import {
    handleTakingClientSetValue, handleStarting, handleAppClosing, handleLaunchbarToggled,
    default as clientSaga
} from '../sagas/client';

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

    describe('handleStarting saga',()=>{

        it('onAppAwait',()=>{
            const action = { type: APPLICATION_AWAIT };
            testSaga(handleStarting,action)
                .next()
                // @ts-ignore
                .delay(3000)
                .next()
                .putResolve(applicationReady({}))
                .next()
                .isDone();
        })

        it('onNotificationAwait',()=>{
            const action = { type: APPLICATION_NOTIFICATION_AWAIT };
            testSaga(handleStarting,action)
                .next()
                // @ts-ignore
                .putResolve(applicationNotificationReady({}))
                .next()
                .isDone();
        })

        it('onChildAwait',()=>{
            const action = { type: APPLICATION_CHILD_AWAIT };
            testSaga(handleStarting,action)
                .next()
                // @ts-ignore
                .putResolve(applicationChildReady({}))
                .next()
                .isDone();
        })

    })

    describe('handleAppClosing saga',()=>{

        it('onClosing',()=>{
            testSaga(handleAppClosing,{})
                .next()
                // @ts-ignore
                .putResolve(applicationCurWinReadyToClose({}))
                .next()
                .isDone();
        })

    })

    describe('handleLaunchbarToggled saga',()=>{

        it('on SWITCH_TO_MAIN_WIN',()=>{
            const action = {payload:{status:APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_MAIN_WIN}}
            testSaga(handleLaunchbarToggled,action)
                .next()
                .put(applicationNewSnackbar({
                    message:`Switch to Main Window`,
                    variant:'primary'
                }))
                .next()
                .isDone();
        })

        it('on SWITCH_TO_LAUNCHBAR',()=>{
            const action = {payload:{status:APPLICATION_LAUNCH_BAR_STATUS.SWITCH_TO_LAUNCHBAR}}
            testSaga(handleLaunchbarToggled,action)
                .next()
                .isDone();
        })

    })

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
            .takeLatest(APPLICATION_LAUNCH_BAR_TOGGLED,handleLaunchbarToggled)
            .next()
            .isDone();
    })

});
