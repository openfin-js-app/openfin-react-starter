import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';

import Dashboard from './Dashboard';
import GlobalContext from '../../GlobalContext';
import ViewOne from '../../views/ViewOne/ViewOne';
import {Sidebar, Header, SnackbarContent } from '../../components';
import {MuiTheme} from "../../reduxs";

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
    },
    config:{
        application:{
            theme:MuiTheme.LIGHT,
        }
    }
};

declare const window:any;

describe('Dashboard layout',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render in normal state correctly by default',()=>{
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/view-one']}>
                    <GlobalContext
                        config={initialState.config}
                    >
                        <Dashboard location={{pathname:'/dashboard/view-one'}}/>
                    </GlobalContext>
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
        const initialState = {
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
            },
            config:{
                application:{
                    theme:MuiTheme.DARK,
                }
            }
        };

        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard/view-one']}>
                    <GlobalContext
                        config={initialState.config}
                    >
                        <Dashboard location={{pathname:'/dashboard/view-one'}}/>
                    </GlobalContext>
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

