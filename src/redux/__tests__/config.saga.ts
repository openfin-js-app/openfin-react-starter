import { testSaga } from 'redux-saga-test-plan';
import {call, put, select, take, takeEvery, takeLatest,} from 'redux-saga/effects';

import {
    CONFIG_UPDATE_NEW_WINDOW_POSITION,
    configUpdateNewWindowPositionAddDelta,
    configUpdateNewWindowPositionResetLeft,
    configUpdateNewWindowPositionResetTop,
} from '..';
import {System, Window} from "@albertli90/redux-openfin";

import {
    // selectors
    getNewWindowTop,
    getNewWindowLeft,
    getNewWindowWidth,
    getNewWindowHeight,
    // sub sagas
    handleConfigUpdateNewWindowPosition,
    handleConfigLoadFromDexie,
    handleConfigUpdateOneField,
    handleConfigUpdateOneFieldInDexie
} from '../sagas/config';

import configSaga from '../sagas/config';
import {CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, CONFIG_LOAD_FROM_DEXIE, CONFIG_UPDATE_ONE_FIELD} from "..";

jest.mock('../../dexie/db');

describe('Config saga',()=>{

    describe('handleConfigUpdateNewWindowPosition saga',()=>{
        it('add delta to new win pos',()=>{
            const newWinWidth = 400;
            const newWinHeight = 300;
            const newWinTop = 10;
            const newWinLeft = 10;
            const virtualScreen = {
                top:0, left:0, right:800, bottom:600,
            };
            testSaga(handleConfigUpdateNewWindowPosition)
                .next()
                .select(getNewWindowWidth)
                .next(newWinWidth)
                .select(getNewWindowHeight)
                .next(newWinHeight)
                .select(getNewWindowTop)
                .next(newWinTop)
                .select(getNewWindowLeft)
                .next(newWinLeft)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{ virtualScreen }})
                .put.resolve(configUpdateNewWindowPositionAddDelta())
                .next()
                .isDone();
        });
        it('reset left of the new win pos',()=>{
            const newWinWidth = 400;
            const newWinHeight = 300;
            const newWinTop = 10;
            const newWinLeft = 410;
            const virtualScreen = {
                top:0, left:0, right:800, bottom:600,
            };
            testSaga(handleConfigUpdateNewWindowPosition)
                .next()
                .select(getNewWindowWidth)
                .next(newWinWidth)
                .select(getNewWindowHeight)
                .next(newWinHeight)
                .select(getNewWindowTop)
                .next(newWinTop)
                .select(getNewWindowLeft)
                .next(newWinLeft)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{ virtualScreen }})
                .put.resolve(configUpdateNewWindowPositionResetLeft())
                .next()
                .isDone();
        });
        it('reset top of the new win pos',()=>{
            const newWinWidth = 400;
            const newWinHeight = 300;
            const newWinTop = 310;
            const newWinLeft = 10;
            const virtualScreen = {
                top:0, left:0, right:800, bottom:600,
            };
            testSaga(handleConfigUpdateNewWindowPosition)
                .next()
                .select(getNewWindowWidth)
                .next(newWinWidth)
                .select(getNewWindowHeight)
                .next(newWinHeight)
                .select(getNewWindowTop)
                .next(newWinTop)
                .select(getNewWindowLeft)
                .next(newWinLeft)
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{ virtualScreen }})
                .put.resolve(configUpdateNewWindowPositionResetTop())
                .next()
                .isDone();
        });
    });

    it('default function register all event',()=>{
        testSaga(configSaga)
            .next()
            .takeEveryEffect(CONFIG_LOAD_FROM_DEXIE, handleConfigLoadFromDexie)
            .next()
            .takeEveryEffect(CONFIG_UPDATE_ONE_FIELD, handleConfigUpdateOneField)
            .next()
            .takeLatestEffect(CONFIG_DO_UPDATE_ONE_FIELD_IN_DEXIE, handleConfigUpdateOneFieldInDexie)
            .next()
            .takeLatestEffect(CONFIG_UPDATE_NEW_WINDOW_POSITION,handleConfigUpdateNewWindowPosition)
            .next()
            .isDone();
    })
});