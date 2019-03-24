import * as React from 'react';
import { Provider } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ConfigView from './ConfigView';

import GlobalContext from '../../GlobalContext';

import { defaultState } from '../../reduxs/config/reducer';

const mockStore = configurestore();
const muiTheme = createMuiTheme({});
const initialState = {
    config:defaultState,
};

const store = mockStore(initialState);

describe('ConfigView',()=>{

    let shallow;
    let mount;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow();
    });

    afterEach(()=>{
        mount.cleanUp();
    });

    it('render correctly',()=>{
        const wrapper = mount(
            <Provider store={store}>
                <GlobalContext config={initialState.config}>
                    <ThemeProvider theme={muiTheme}>
                        <ConfigView/>
                    </ThemeProvider>
                </GlobalContext>
            </Provider>
        );
        expect(wrapper).toBeTruthy();
    });

});