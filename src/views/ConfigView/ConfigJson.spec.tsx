import * as React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ReactJson from 'react-json-view';

import GlobalContext from '../../GlobalContext';
import { defaultState } from '../../reduxs/config/reducer';

import ConfigJson from './ConfigJson';

const theme = createMuiTheme({});
const mockStore = configurestore();
const initialState = {
    config:defaultState,
};

const store = mockStore(initialState);

describe('ConfigJson',()=>{

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
                <GlobalContext
                    config={defaultState}
                >
                    <ThemeProvider theme={theme}>
                        <ConfigJson/>
                    </ThemeProvider>
                </GlobalContext>
            </Provider>
        );
        expect(wrapper.find(ReactJson)).toHaveLength(1);
        expect(wrapper).toBeTruthy();
    });

});