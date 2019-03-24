import * as React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import LaunchBar from './LaunchBar';

const muiTheme = createMuiTheme({});

const mockStore = configurestore();
const initialState = {
    application:{
        launchBarCollapse:false,
    }
};

describe('LaunchBar Layout',()=>{

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

    it('render correctly and launch all non-disabled windows',()=>{
        const store = mockStore(initialState);
        const wrapper = mount(
            <ThemeProvider theme={muiTheme}>
                <Provider store={store}>
                    <LaunchBar/>
                </Provider>
            </ThemeProvider>
        );
        wrapper.find(IconButton).forEach((iconBtn)=>{
            const props = iconBtn.props();
            if ( props.disabled === false && typeof props.onClick === 'function'){
                props.onClick();
            }
        });
        expect(store.getActions()).toMatchSnapshot();
    });

    it('trigger all control panel btns',()=>{
        const store = mockStore(initialState);
        const wrapper = mount(
            <ThemeProvider theme={muiTheme}>
                <Provider store={store}>
                    <LaunchBar/>
                </Provider>
            </ThemeProvider>
        );
        wrapper.find(Button).forEach((btn)=>{
            const props = btn.props();
            if ( typeof props.onClick === 'function'){
                props.onClick();
            }
        });
        expect(store.getActions()).toMatchSnapshot();
    });

    it('render collapsed button container',()=>{
        const store = mockStore({
            application:{
                launchBarCollapse:true,
            }
        });
        const wrapper = mount(
            <ThemeProvider theme={muiTheme}>
                <Provider store={store}>
                    <LaunchBar/>
                </Provider>
            </ThemeProvider>
        );
        expect(wrapper).toBeTruthy();
    });

});