import {put, select, take, takeLatest,} from 'redux-saga/effects';

import {
    CONFIG_UPDATE_NEW_WINDOW_POSITION,
    configUpdateNewWindowPositionAddDelta,
    configUpdateNewWindowPositionResetLeft,
    configUpdateNewWindowPositionResetTop,
} from '..';
import {System, Window} from "@albertli90/redux-openfin";

export const getNewWindowTop = state => state.config.application.newWinTop;
export const getNewWindowLeft = state => state.config.application.newWinLeft;
export const getNewWindowWidth = state => state.config.application.newWinWidth;
export const getNewWindowHeight = state => state.config.application.newWinHeight;

export function* handleConfigUpdateNewWindowPosition() {
    const newWinWidth = yield select(getNewWindowWidth);
    const newWinHeight = yield select(getNewWindowHeight);
    const newWinTop = yield select(getNewWindowTop);
    const newWinLeft = yield select(getNewWindowLeft);

    yield put.resolve(System.actions.getMonitorInfo({}));
    const monitorInfoAction = yield take(System.actions.GET_MONITOR_INFO_RES);
    const virtualScreen = monitorInfoAction.payload.virtualScreen;

    // console.log("configUpdateNewWindowPosition",monitorInfoAction,virtualScreen);

    if (
        ((newWinLeft+newWinWidth)<virtualScreen.right) &&
        ((newWinTop+newWinHeight)<virtualScreen.bottom)
    ){
        yield put.resolve(configUpdateNewWindowPositionAddDelta());
    }else{
        if ((newWinLeft+newWinWidth)>=virtualScreen.right){
            yield put.resolve(configUpdateNewWindowPositionResetLeft());
        }
        if ((newWinTop+newWinHeight)>=virtualScreen.bottom){
            yield put.resolve(configUpdateNewWindowPositionResetTop());
        }
    }

}

export default function* () {
    yield takeLatest(CONFIG_UPDATE_NEW_WINDOW_POSITION,handleConfigUpdateNewWindowPosition);
}