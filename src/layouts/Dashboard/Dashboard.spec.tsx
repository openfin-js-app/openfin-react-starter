import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';

import Dashboard from './Dashboard';
import ViewOne from '../../views/ViewOne/ViewOne';
import {Sidebar, Header, SnackbarContent } from '../../components';

const mockStore = configurestore();
const initialState = {
    application:{
        username:'',
        computerName:'',
        machineId:null,
        deviceUserId:null,
        loading:true,
        drawerOpen:true,
        launchBarCollapse:false,
        snackBarOpen:false,
        snackBarMsgInfo:{},
        snackBarMsgQueue:[],
        openfinVersion:'n/a',
        openfinHostSpec:{},
        windowsState:'normal',
    },
    client:{
        count:0,
    }
};

declare const window:any;

describe('Dashboard layout',()=>{

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

    it('render in normal state correctly by default',()=>{
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/view-one']}>
                    <Dashboard store={store} location={{pathname:'/dashboard/view-one'}}/>
                </MemoryRouter>
            </Provider>

        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(Dashboard)).toHaveLength(1);
        wrapper.find(Header).props().handleDrawerToggle();
        wrapper.find(Header).props().onSwitchToLaunchBar();
        wrapper.find(Header).props().onMinimize();
        wrapper.find(Header).props().onMaximize();
        wrapper.find(Header).props().onClose();
        // snackbar events
        expect(wrapper.find(Snackbar)).toHaveLength(1);
        wrapper.find(Snackbar).props().onClose();
        wrapper.find(Snackbar).props().onExited();

        expect(store.getActions()).toMatchSnapshot();
    })

    it('render SnackbarContent and could be closed correctly',()=>{
        const store = mockStore({
            application:{
                username:'',
                computerName:'',
                machineId:null,
                deviceUserId:null,
                loading:true,
                drawerOpen:true,
                launchBarCollapse:false,
                snackBarOpen:true,
                snackBarMsgInfo:{
                    variant:'primary',
                    message:'message',
                },
                snackBarMsgQueue:[],
                openfinVersion:'n/a',
                openfinHostSpec:{},
                windowsState:'normal',
            },
            client:{
                count:0,
            }
        });
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/view-one']}>
                    <Dashboard store={store} location={{pathname:'/dashboard/view-one'}}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(Dashboard)).toHaveLength(1);
        wrapper.find(Header).props().handleDrawerToggle();
        wrapper.find(Header).props().onSwitchToLaunchBar();
        wrapper.find(Header).props().onMinimize();
        wrapper.find(Header).props().onMaximize();
        wrapper.find(Header).props().onClose();
        // SnackbarContent events
        expect(wrapper.find(SnackbarContent)).toHaveLength(1);
        wrapper.find(SnackbarContent).props().onClose();

        expect(store.getActions()).toMatchSnapshot();
    })

});

