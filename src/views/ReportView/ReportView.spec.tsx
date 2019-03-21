import * as React from 'react';
import { Provider } from 'react-redux';
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
                <ReportView/>
            </Provider>
        );
        expect(wrapper).toBeTruthy();

    })
});