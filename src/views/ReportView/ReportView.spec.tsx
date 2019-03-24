import * as React from 'react';
import { Provider } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import configurestore from 'redux-mock-store';

import ReportView from './ReportView';

const mockStore = configurestore();
const initialState = {
    application:{
        username:'username',
        computerName:'computerName',
        deviceId:'deviceId',
        deviceUserId:'deviceUserId',
        openfinVersion:'openfinVersion',
        openfinHostSpec:{type:'openfinHostSpec sample obj'},
    }
};
const muiTheme = createMuiTheme({});
const store = mockStore(initialState);

describe('ReportView',()=>{

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
                <ThemeProvider theme={muiTheme}>
                    <ReportView/>
                </ThemeProvider>
            </Provider>
        );
        expect(wrapper).toBeTruthy();

    })
});