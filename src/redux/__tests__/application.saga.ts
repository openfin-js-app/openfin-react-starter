import { testSaga } from 'redux-saga-test-plan';
import { delay } from 'redux-saga';
import { all, call, put, take, takeLatest, takeEvery, fork, select, actionChannel } from 'redux-saga/effects';
import { System, Event, Window } from '@albertli90/redux-openfin';

import { launchBarItems } from '../../layouts/LaunchBar/LaunchBarData';

import {
    APPLICATION_STARTED,
    APPLICATION_NEW_SNACKBAR,
    APPLICATION_CLOSE_SNACKBAR,
    APPLICATION_TOGGLE_WINDOW_STATE,
    applicationReady,
    applicationSetSnackbarStatus,
    applicationProcessSnackbarQueue,
    APPLICATION_LAUNCH_BAR_TOGGLE,
    APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,
    APPLICATION_LAUNCH_NEW_WINDOW,
} from '..';

import { configUpdateNewWindowPosition } from '..';


import {
    // selectors
    getLaunchBarCollapse,
    getWindowState,
    getNewWindowTop,
    getNewWindowLeft,
    getNewWindowHeight,
    // sub sagas
    handleApplicationLoading,
    handleApplicationExit,
    handleToggleWindowState,
    handleApplicationAddNewSnackBar,
    handleApplicationCloseSnackBar,
    handleApplicationLaunchBarToggle,
    handleApplicationLaunchBarToggleCollapse,
    handleApplicationLaunchNewWindow, getNewWindowWidth,
} from '../sagas/application';

import applicationSaga from '../sagas/application';

const LOADING_BANNER_WIDTH = parseInt(process.env.REACT_APP_LOADING_BANNER_WIDTH, 10);
const LOADING_BANNER_HEIGHT = parseInt(process.env.REACT_APP_LOADING_BANNER_HEIGHT, 10);
const DEFAULT_WIDTH = parseInt(process.env.REACT_APP_DEFAULT_APP_WIDTH, 10);
const DEFAULT_HEIGHT = parseInt(process.env.REACT_APP_DEFAULT_APP_HEIGHT, 10);

const previousBaseWindow={
    url:null,
    top:null,
    left:null,
    width:null,
    height:null,
};

const loadingAllActions = [
    call(System.asyncs.getMachineId,System.actions.getMachineId({})),
    // getDeviceUserId might fail, thus use flux syntax........
    put.resolve(System.actions.getDeviceUserId({})),
    take(System.actions.GET_DEVICE_USER_ID_RES),
    call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'USERNAME'})),
    call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'computername'})),
    call(System.asyncs.getEnvironmentVariable,System.actions.getEnvironmentVariable({env:'HOSTNAME'})),
    call(System.asyncs.getVersion,System.actions.getVersion({})),
    call(System.asyncs.getHostSpecs,System.actions.getHostSpecs({})),
    call(Window.asyncs.getState,Window.actions.getState({})),
    // delay for loading view render, could be removed
    call(delay,5000),
];

declare const jsdom:any;

describe('Application saga',()=>{

    describe('handleApplicationLoading saga',()=>{

        it('current view is not loadingView',()=>{
            const monitorRect = { left:0, right:800, top:0, bottom:600 };

            jsdom.reconfigure({url:'http://localhost/some-other-url'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/some-other-url');

            testSaga(handleApplicationLoading)
                .next()
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{primaryMonitor:{monitorRect}}})
                .call(Window.asyncs.setAsForeground,Window.actions.setAsForeground({}))
                .next()
                .all(loadingAllActions)
                .next()
                .put.resolve(applicationReady())
                .next()
                .isDone();
        });

        it('current is loadingView and redirect to default view url',()=>{
            const monitorRect = { left:0, right:800, top:0, bottom:600 };

            jsdom.reconfigure({url:'http://localhost/loading'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/loading');

            process.env.REACT_APP_DEFAULT_VIEW_URL = 'something-url';
            expect(process.env.REACT_APP_DEFAULT_VIEW_URL && process.env.REACT_APP_DEFAULT_VIEW_URL.length > 0).toBeTruthy();

            testSaga(handleApplicationLoading)
                .next()
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{primaryMonitor:{monitorRect}}})
                .call(Window.asyncs.setAsForeground,Window.actions.setAsForeground({}))
                .next()
                .call(Window.asyncs.updateOptions,Window.actions.updateOptions({
                    options:{resizable:false}
                }))
                .next()
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2 - LOADING_BANNER_WIDTH/2,
                    top:(monitorRect.bottom - monitorRect.top)/2 - LOADING_BANNER_HEIGHT/2,
                    width:LOADING_BANNER_WIDTH,
                    height: LOADING_BANNER_HEIGHT,
                }))
                .next()
                .all(loadingAllActions)
                .next()
                .put.resolve(applicationReady())
                .next()
                .call(Window.asyncs.updateOptions,Window.actions.updateOptions({
                    options:{
                        resizable:true,
                    }
                }))
                .next()
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2,
                    top:(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2,
                    width:DEFAULT_WIDTH,
                    height: DEFAULT_HEIGHT,
                }))
                .next()
                .isDone();
        });

        it('current is loadingView and redirect to collapsed launchBar',()=>{
            const monitorRect = { left:0, right:800, top:0, bottom:600 };

            jsdom.reconfigure({url:'http://localhost/loading'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/loading');

            process.env.REACT_APP_DEFAULT_VIEW_URL = '';
            expect(process.env.REACT_APP_DEFAULT_VIEW_URL && process.env.REACT_APP_DEFAULT_VIEW_URL.length > 0).toBeFalsy();

            previousBaseWindow.url='/dashboard/view-one';
            previousBaseWindow.top=(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2;
            previousBaseWindow.left=(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2;
            previousBaseWindow.width=DEFAULT_WIDTH;
            previousBaseWindow.height=DEFAULT_HEIGHT;

            testSaga(handleApplicationLoading)
                .next()
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{primaryMonitor:{monitorRect}}})
                .call(Window.asyncs.setAsForeground,Window.actions.setAsForeground({}))
                .next()
                .call(Window.asyncs.updateOptions,Window.actions.updateOptions({
                    options:{resizable:false}
                }))
                .next()
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2 - LOADING_BANNER_WIDTH/2,
                    top:(monitorRect.bottom - monitorRect.top)/2 - LOADING_BANNER_HEIGHT/2,
                    width:LOADING_BANNER_WIDTH,
                    height: LOADING_BANNER_HEIGHT,
                }))
                .next()
                .all(loadingAllActions)
                .next()
                .put.resolve(applicationReady())
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .call(Window.asyncs.updateOptions,Window.actions.updateOptions({
                    options:{resizable:false}
                }))
                .next()
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2,
                    top:(monitorRect.bottom - monitorRect.top)/4,
                    width:88,
                    height:64,
                }))
                .next()
                .isDone();
        });

        it('current is loadingView and redirect to non-collapsed launchBar',()=>{
            const monitorRect = { left:0, right:800, top:0, bottom:600 };

            jsdom.reconfigure({url:'http://localhost/loading'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/loading');

            process.env.REACT_APP_DEFAULT_VIEW_URL = '';
            expect(process.env.REACT_APP_DEFAULT_VIEW_URL && process.env.REACT_APP_DEFAULT_VIEW_URL.length > 0).toBeFalsy();

            previousBaseWindow.url='/dashboard/view-one';
            previousBaseWindow.top=(monitorRect.bottom - monitorRect.top)/2 - DEFAULT_HEIGHT/2;
            previousBaseWindow.left=(monitorRect.right - monitorRect.left)/2 - DEFAULT_WIDTH/2;
            previousBaseWindow.width=DEFAULT_WIDTH;
            previousBaseWindow.height=DEFAULT_HEIGHT;

            testSaga(handleApplicationLoading)
                .next()
                .call(System.asyncs.getMonitorInfo,System.actions.getMonitorInfo({}))
                .next({payload:{primaryMonitor:{monitorRect}}})
                .call(Window.asyncs.setAsForeground,Window.actions.setAsForeground({}))
                .next()
                .call(Window.asyncs.updateOptions,Window.actions.updateOptions({
                    options:{resizable:false}
                }))
                .next()
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2 - LOADING_BANNER_WIDTH/2,
                    top:(monitorRect.bottom - monitorRect.top)/2 - LOADING_BANNER_HEIGHT/2,
                    width:LOADING_BANNER_WIDTH,
                    height: LOADING_BANNER_HEIGHT,
                }))
                .next()
                .all(loadingAllActions)
                .next()
                .put.resolve(applicationReady())
                .next()
                .select(getLaunchBarCollapse)
                .next(false)
                .call(Window.asyncs.updateOptions,Window.actions.updateOptions({
                    options:{resizable:false}
                }))
                .next()
                .call(Window.asyncs.setBounds,Window.actions.setBounds({
                    left:(monitorRect.right - monitorRect.left)/2,
                    top:(monitorRect.bottom - monitorRect.top)/4,
                    width:launchBarItems.length<10?launchBarItems.length*64+88:664,
                    height:64,
                }))
                .next()
                .isDone();
        });

    });

    describe('handleApplicationExit saga', ()=>{
        it('basically works',()=>{
            testSaga(handleApplicationExit)
                .next()
                .put.resolve(Window.actions.close({force:true}))
                .next()
                .isDone();
        })
    });

    describe('handleApplicationAddNewSnackBar saga', ()=>{

        it('snackBarOpen equals true',()=>{
            testSaga(handleApplicationAddNewSnackBar)
                .next()
                .select()
                .next({snackBarOpen:true})
                .put(applicationSetSnackbarStatus({open:false}))
                .next()
                .isDone();
        });

        it('snackBarOpen equals false',()=>{
            testSaga(handleApplicationAddNewSnackBar)
                .next()
                .select()
                .next({snackBarOpen:false})
                .put(applicationProcessSnackbarQueue())
                .next()
                .isDone();
        });

    });


    describe('handleApplicationCloseSnackBar saga', ()=>{

        it('reason equals clickaway',()=>{
            testSaga(handleApplicationCloseSnackBar,{payload:{
                reason:'clickaway',
                event:{},
            }})
                .next()
                .put(applicationSetSnackbarStatus({open:false}))
                .next()
                .isDone();
        });

        it('reason doesn\'t equal clickaway',()=>{
            testSaga(handleApplicationCloseSnackBar,{payload:{
                    reason:'not clickaway',
                    event:{},
                }})
                .next()
                .isDone();
        });

    });

    describe('handleToggleWindowState saga', ()=>{

        it('windowState equals maximized',()=>{
            testSaga(handleToggleWindowState)
                .next()
                .select(getWindowState)
                .next('maximized')
                .put(Window.actions.restore({}))
                .next()
                .isDone();
        });

        it('windowState equals normal',()=>{
            testSaga(handleToggleWindowState)
                .next()
                .select(getWindowState)
                .next('normal')
                .put(Window.actions.maximize({}))
                .next()
                .isDone();
        });

    });

    describe('handleApplicationLaunchBarToggle saga', ()=>{

        let getBoundsActionPayload;

        beforeAll(()=>{
            getBoundsActionPayload = {
                top:0, left:0, width:800, height:600,
            }
        });

        it('redirect back to previous url',()=>{
            jsdom.reconfigure({url:'http://localhost/launchbar'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/launchbar');
            testSaga(handleApplicationLaunchBarToggle)
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .put.resolve(Window.actions.getBounds({}))
                .next()
                .take(Window.actions.GET_BOUNDS_RES)
                .next({payload:getBoundsActionPayload})
                .put.resolve(Window.actions.updateOptions({
                    options:{
                        resizable:true
                    }
                }))
                .next()
                .put.resolve(Window.actions.setBounds({
                    left:previousBaseWindow.left,
                    top:previousBaseWindow.top,
                    width:previousBaseWindow.width,
                    height:previousBaseWindow.height,
                }))
                .next()
                .isDone();
        });

        it('redirect back to the collapsed launchbar layout',()=>{
            jsdom.reconfigure({url:'http://localhost/somewhere-else'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/somewhere-else');
            testSaga(handleApplicationLaunchBarToggle)
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .put.resolve(Window.actions.getBounds({}))
                .next()
                .take(Window.actions.GET_BOUNDS_RES)
                .next({payload:getBoundsActionPayload})
                .put.resolve(Window.actions.updateOptions({
                    options:{
                        resizable:false
                    }
                }))
                .next()
                .put.resolve(Window.actions.setBounds({
                    left:getBoundsActionPayload.left,
                    top:getBoundsActionPayload.top,
                    width:88,
                    height:64,
                }))
                .next()
                .isDone();
        });

        it('redirect back to the non-collapsed launchbar layout',()=>{
            jsdom.reconfigure({url:'http://localhost/somewhere-else'});
            expect(window.location.href.toLowerCase()).toBe('http://localhost/somewhere-else');
            testSaga(handleApplicationLaunchBarToggle)
                .next()
                .select(getLaunchBarCollapse)
                .next(false)
                .put.resolve(Window.actions.getBounds({}))
                .next()
                .take(Window.actions.GET_BOUNDS_RES)
                .next({payload:getBoundsActionPayload})
                .put.resolve(Window.actions.updateOptions({
                    options:{
                        resizable:false
                    }
                }))
                .next()
                .put.resolve(Window.actions.setBounds({
                    left:getBoundsActionPayload.left,
                    top:getBoundsActionPayload.top,
                    width:launchBarItems.length<10? launchBarItems.length*64+88:664,
                    height:64,
                }))
                .next()
                .isDone();
        })

    });

    describe('handleApplicationLaunchBarToggleCollapse saga', ()=>{

        let getBoundsActionPayload;

        beforeAll(()=>{
            getBoundsActionPayload = {
                top:0, left:0, width:800, height:600,
            }
        });

        it('toggle to non-collapsed',()=>{
            testSaga(handleApplicationLaunchBarToggleCollapse)
                .next()
                .select(getLaunchBarCollapse)
                .next(false)
                .put.resolve(Window.actions.getBounds({}))
                .next()
                .take(Window.actions.GET_BOUNDS_RES)
                .next({payload:getBoundsActionPayload})
                .put.resolve(Window.actions.setBounds({
                    left:getBoundsActionPayload.left,
                    top:getBoundsActionPayload.top,
                    width:launchBarItems.length<10? launchBarItems.length*64+88:664,
                    height:64,
                }))
                .next()
                .isDone();
        });

        it('toggle to collapsed',()=>{
            testSaga(handleApplicationLaunchBarToggleCollapse)
                .next()
                .select(getLaunchBarCollapse)
                .next(true)
                .put.resolve(Window.actions.getBounds({}))
                .next()
                .take(Window.actions.GET_BOUNDS_RES)
                .next({payload:getBoundsActionPayload})
                .put.resolve(Window.actions.setBounds({
                    left:getBoundsActionPayload.left,
                    top:getBoundsActionPayload.top,
                    width:88,
                    height:64,
                }))
                .next()
                .isDone();
        });

    });

    describe('handleApplicationLaunchNewWindow saga', ()=>{

        const defaultWidth = 1;
        const defaultHeight = 2;
        const defaultTop = 3;
        const defaultLeft = 4;

        it('use all default values',()=>{
            const appJson = {};
            testSaga(handleApplicationLaunchNewWindow,{payload:appJson})
                .next()
                .select(getNewWindowWidth)
                .next(defaultWidth)
                .select(getNewWindowHeight)
                .next(defaultHeight)
                .select(getNewWindowTop)
                .next(defaultTop)
                .select(getNewWindowLeft)
                .next(defaultLeft)
                .put.resolve(Window.actions.newWindow(appJson))
                .next()
                .put(configUpdateNewWindowPosition())
                .next()
                .isDone();
        });

        it('use none of the default values',()=>{
            const expectedAppJson = {
                defaultWidth, defaultHeight, defaultTop, defaultLeft,
            };
            testSaga(handleApplicationLaunchNewWindow,{payload:expectedAppJson})
                .next()
                .select(getNewWindowWidth)
                .next(defaultWidth)
                .select(getNewWindowHeight)
                .next(defaultHeight)
                .select(getNewWindowTop)
                .next(defaultTop)
                .select(getNewWindowLeft)
                .next(defaultLeft)
                .put.resolve(Window.actions.newWindow(expectedAppJson))
                .next()
                .put(configUpdateNewWindowPosition())
                .next()
                .isDone();
        })

    });

    it('default function register all event',()=>{
        testSaga(applicationSaga)
            .next()
            .takeLatestEffect(APPLICATION_STARTED,handleApplicationLoading)
            .next()
            .takeLatestEffect(Event.actionDicts.windowEventDictByName['close-requested'].type,handleApplicationExit)
            .next()
            .takeLatestEffect(APPLICATION_TOGGLE_WINDOW_STATE,handleToggleWindowState)
            .next()
            .takeLatestEffect(APPLICATION_NEW_SNACKBAR,handleApplicationAddNewSnackBar)
            .next()
            .takeLatestEffect(APPLICATION_CLOSE_SNACKBAR,handleApplicationCloseSnackBar)
            .next()
            .takeLatestEffect(APPLICATION_LAUNCH_BAR_TOGGLE,handleApplicationLaunchBarToggle)
            .next()
            .takeLatestEffect(APPLICATION_LAUNCH_BAR_TOGGLE_COLLAPSE,handleApplicationLaunchBarToggleCollapse)
            .next()
            .takeLatestEffect(APPLICATION_LAUNCH_NEW_WINDOW,handleApplicationLaunchNewWindow)
            .next()
            .isDone();
    })

});