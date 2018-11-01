import * as React from 'react';
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
    let mount;

    beforeAll(() => {
        mount = createMount();
    });

    afterAll(() => {
        mount.cleanUp();
    });

    it('render correctly',()=>{
        const wrapper = mount(<ReportView store={store}/>);
        expect(wrapper).toBeTruthy();

    })
});