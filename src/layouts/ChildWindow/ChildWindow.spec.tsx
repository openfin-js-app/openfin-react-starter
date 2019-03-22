import * as React from 'react';
import { Provider } from 'react-redux';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

import ChildWindow from './ChildWindow';
import GlobalContext from '../../GlobalContext';
import ViewOne from '../../views/ViewOne/ViewOne';
import {Header, SnackbarContent} from '../../components';
import { rootDefaultState } from '../../reduxs'
import Snackbar from "@material-ui/core/Snackbar";

const mockStore = configurestore();

const store = mockStore(rootDefaultState);

declare const window:any;

describe('ChildWindow layout',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it ('render in normal state correctly by default',()=>{
        const store = mockStore(rootDefaultState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/childWindow/view-one']}>
                    <GlobalContext config={rootDefaultState.config}>
                        <ChildWindow location={{pathname:'/childWindow/view-one'}}/>
                    </GlobalContext>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(ChildWindow)).toHaveLength(1);
        wrapper.find(Header).props().onMinimize();
        wrapper.find(Header).props().onMaximize();
        wrapper.find(Header).props().onClose();
        expect(wrapper.find(Snackbar)).toHaveLength(1);
        wrapper.find(Snackbar).props().onClose();
        wrapper.find(Snackbar).props().onExited();

        expect(store.getActions()).toMatchSnapshot();
    })

    it('render SnackbarContent and could be closed correctly',()=>{
        const initState = {
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
            config:rootDefaultState.config,
        }
        const store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/childWindow/view-one']}>
                    <GlobalContext config={rootDefaultState.config}>
                        <ChildWindow location={{pathname:'/childWindow/view-one'}}/>
                    </GlobalContext>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(ViewOne)).toHaveLength(1);
        expect(wrapper.find(ChildWindow)).toHaveLength(1);
        wrapper.find(Header).props().onMinimize();
        wrapper.find(Header).props().onMaximize();
        wrapper.find(Header).props().onClose();
        // SnackbarContent events
        expect(wrapper.find(SnackbarContent)).toHaveLength(1);
        wrapper.find(SnackbarContent).props().onClose();

        expect(store.getActions()).toMatchSnapshot();
    })

});