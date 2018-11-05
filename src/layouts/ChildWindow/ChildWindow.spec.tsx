import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

import ChildWindow from './ChildWindow';
import ViewOne from '../../views/ViewOne/ViewOne';
import { Header } from '../../components';
import { rootDefaultState } from '../../redux'

const mockStore = configurestore();


const store = mockStore(rootDefaultState);

declare const window:any;

describe('ChildWindow layout',()=>{

    let shallow;
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });


    beforeEach(() => {
        shallow = createShallow();
    });

    it('render correctly on normal window state',()=>{
        let lastWindowState = 'normal';
        const currentWindow = {
            setAsForeground:jest.fn(),
            getState:jest.fn((cb)=>(cb(lastWindowState))),
            minimize:jest.fn(()=>{
                lastWindowState = 'minimized'
            }),
            restore:jest.fn(()=>{
                lastWindowState = 'normal'
            }),
            maximize:jest.fn(()=>{
                lastWindowState = 'maximized'
            }),
        };

        window.fin={
            desktop:{
                Window:{
                    getCurrent: ()=> currentWindow
                }
            }
        };

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/childWindow/view-one']}>
                    <ChildWindow store={store} location={{pathname:'/childWindow/view-one'}}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(ChildWindow)).toHaveLength(1);
        expect(wrapper.find(Header)).toHaveLength(1);
        wrapper.find(Header).props().onMaximize();
        expect(currentWindow.maximize).toHaveBeenCalled();
        expect(currentWindow.getState).toHaveBeenCalled();
    });

    it('could be minimized',()=>{
        let lastWindowState = 'normal';
        const currentWindow = {
            setAsForeground:jest.fn(),
            getState:jest.fn((cb)=>(cb(lastWindowState))),
            minimize:jest.fn(()=>{
                lastWindowState = 'minimized'
            }),
            restore:jest.fn(()=>{
                lastWindowState = 'normal'
            }),
            maximize:jest.fn(()=>{
                lastWindowState = 'maximized'
            }),
        };

        window.fin={
            desktop:{
                Window:{
                    getCurrent: ()=> currentWindow
                }
            }
        };

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/childWindow/view-one']}>
                    <ChildWindow store={store} location={{pathname:'/childWindow/view-one'}}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(ChildWindow)).toHaveLength(1);
        expect(wrapper.find(Header)).toHaveLength(1);
        wrapper.find(Header).props().onMinimize();
        expect(currentWindow.minimize).toHaveBeenCalled();
        expect(currentWindow.getState).toHaveBeenCalled();
    });

    it('could be closed',()=>{
        let lastWindowState = 'normal';
        const currentWindow = {
            setAsForeground:jest.fn(),
            getState:jest.fn((cb)=>(cb(lastWindowState))),
            minimize:jest.fn(()=>{
                lastWindowState = 'minimized'
            }),
            restore:jest.fn(()=>{
                lastWindowState = 'normal'
            }),
            maximize:jest.fn(()=>{
                lastWindowState = 'maximized'
            }),
            close:jest.fn(),
        };

        window.fin={
            desktop:{
                Window:{
                    getCurrent: ()=> currentWindow
                }
            }
        };

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/childWindow/view-one']}>
                    <ChildWindow store={store} location={{pathname:'/childWindow/view-one'}}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(ChildWindow)).toHaveLength(1);
        expect(wrapper.find(Header)).toHaveLength(1);
        wrapper.find(Header).props().onClose();
        expect(currentWindow.close).toHaveBeenCalled();
        expect(currentWindow.getState).toHaveBeenCalled();
    });

    it('render correctly on maximized window state',()=>{
        let lastWindowState = 'maximized';
        const currentWindow = {
            setAsForeground:jest.fn(),
            getState:jest.fn((cb)=>(cb(lastWindowState))),
            minimize:jest.fn(()=>{
                lastWindowState = 'minimized'
            }),
            restore:jest.fn(()=>{
                lastWindowState = 'normal'
            }),
            maximize:jest.fn(()=>{
                lastWindowState = 'maximized'
            }),
        };

        window.fin={
            desktop:{
                Window:{
                    getCurrent: ()=> currentWindow
                }
            }
        };

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/childWindow/view-one']}>
                    <ChildWindow store={store} location={{pathname:'/childWindow/view-one'}}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(ChildWindow)).toHaveLength(1);
        expect(wrapper.find(Header)).toHaveLength(1);
        wrapper.find(Header).props().onMaximize();
        expect(currentWindow.restore).toHaveBeenCalled();
        expect(currentWindow.getState).toHaveBeenCalled();
    });

});